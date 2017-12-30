import React from 'react';
import SearchSelector from './search_selector_container';
import Binary from './binary_container';
import { Route } from 'react-router-dom';
import Trie from './trie_container';
import Hashmap from './hashmap_container';

const LandingPage = (props) => {
  return (
    <main>
      <Route exact path="/" component={SearchSelector} />
      <Route exact path="/binary" component={Binary} />
      <Route exact path="/trie" component={Trie} />
      <Route exact path="/hashmap" component={Hashmap} />
    </main>
  );
};

export default LandingPage;
