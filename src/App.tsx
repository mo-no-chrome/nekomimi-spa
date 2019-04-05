import 'lazysizes';
import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

interface SearchResult {
  query: string;
  items: gapi.client.youtube.SearchResult[];
}

// 初期値をnullとしたいため、anyにキャストしている（実際はnullとなることはない）
export const AppContext: React.Context<{
  searchResult: SearchResult;
  setSearchResult: React.Dispatch<React.SetStateAction<SearchResult>>;
}> = React.createContext<any>(null);

const LazyRootPage = lazy(() => import('./pages/Root'));
const LazyWatchPage = lazy(() => import('./pages/Watch'));
const LazyNoMatchPage = lazy(() => import('./pages/NoMatch'));

const App = () => {
  const [searchResult, setSearchResult] = useState<SearchResult>({
    query: '',
    items: []
  });
  return (
    <BrowserRouter>
      {/* <AppContext>の子孫コンポーネントはどこからでもアクセスできる */}
      <AppContext.Provider value={{ searchResult, setSearchResult }}>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route exact path="/" component={LazyRootPage} />
            <Route path="/watch/:id" component={LazyWatchPage} />
            <Route component={LazyNoMatchPage} />
          </Switch>
        </Suspense>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
