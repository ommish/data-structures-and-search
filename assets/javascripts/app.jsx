import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import SearchSelector from './components/search_selector_container';
import Binary from './components/binary_container';

const App = ({store}) => {
  return (
    <HashRouter>
      <Provider store={store}>
        <Route exact path="/" component={SearchSelector} />
        <Route exact path="/binary" component={Binary} />
      </Provider>
    </HashRouter>
  );
}

export default App;
