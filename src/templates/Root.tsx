import debounce from 'lodash.debounce';
import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from '../App';
import SearchBar from '../organisms/SearchBar';
import SearchList from '../organisms/SearchList';
import ApiClient from '../utils/ApiClient';
import styles from './Root.module.css';

const RootTemplate = () => {
  // AppContextにアクセスする
  const { searchResult, setSearchResult } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // 最後に呼び出されてから500msec以上経った場合に実行される
  const searchList = useCallback(
    debounce(async (q: string) => {
      try {
        setIsError(false);
        if (q.trim() === '') {
          // テキストが空だった場合はローディングを表示しない
          setSearchResult({ query: '', items: [] });
          return;
        }
        setIsLoading(true);
        const { items } = await ApiClient.search(q);
        setSearchResult({ query: q, items: items! });
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );
  return (
    <>
      <SearchBar defaultValue={searchResult.query} onChange={searchList} />
      <div className={styles.content}>
        <SearchList
          isLoading={isLoading}
          isError={isError}
          query={searchResult.query}
          list={searchResult.items}
        />
      </div>
    </>
  );
};

export default RootTemplate;
