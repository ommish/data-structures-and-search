import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import LandingPage from './components/landing_page';

const App = () => {
  return (
    <HashRouter>
        <Route path="/" component={LandingPage} />
    </HashRouter>
  );
}

export default App;
