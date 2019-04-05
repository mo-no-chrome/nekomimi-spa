import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import React, { useCallback } from 'react';
import ReactLoading from 'react-loading';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styles from './SearchList.module.css';

interface Props extends RouteComponentProps {
  isLoading: boolean;
  isError: boolean;
  query: string;
  list: gapi.client.youtube.SearchResult[];
}

const SearchList = (props: Props) => {
  const { isLoading, isError, query, list, history } = props;
  const createHandleClick = useCallback((videoId: string) => {
    return () => history.push(`/watch/${videoId}`);
  }, []);
  if (isError) {
    return (
      <div className={styles.content}>
        <ErrorIcon fontSize="large" />
        <Typography variant="body1">動画リストの取得に失敗しました</Typography>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className={styles.content}>
        <ReactLoading type="bubbles" color="#999" />
      </div>
    );
  }
  if (list.length === 0) {
    return (
      <div className={styles.content}>
        <ErrorIcon fontSize="large" />
        <Typography variant="body1">動画が見つかりませんでした</Typography>
      </div>
    );
  }
  return (
    <List
      subheader={<ListSubheader>{`${query}の検索結果`}</ListSubheader>}
      dense
    >
      {list.map(item => {
        const { id, etag, snippet } = item;
        // APIの型定義は全てT | undefinedであるため、
        // !をつけて存在チェックを省略している
        return (
          <ListItem
            key={etag!}
            onClick={createHandleClick(id!.videoId!)}
            button
            divider
          >
            <img
              className={`lazyload ${styles.thumbnail}`}
              data-src={snippet!.thumbnails!.default!.url!}
              alt={snippet!.title}
            />
            <ListItemText primary={snippet!.title} />
          </ListItem>
        );
      })}
    </List>
  );
};

// withRouter()関数でラップすることで、
// historyオブジェクトが自動的にPropsに渡される
export default withRouter(SearchList);
