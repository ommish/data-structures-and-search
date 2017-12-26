import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import LandingPage from './components/landing_page';

const App = ({store}) => {
  return (
    <HashRouter>
      <Provider store={store}>
        <Route path="/" component={LandingPage} />
      </Provider>
    </HashRouter>
  );
}

export default App;
