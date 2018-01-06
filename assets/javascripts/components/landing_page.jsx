import React from 'react';
import SearchSelector from './search_selector';
import Binary from './binary';
import { Route } from 'react-router-dom';
import CompressedTrie from './compressed_trie';
import Trie from './trie';
import Hashmap from './hashmap';
import LRUCache from './lru_cache';

const LandingPage = (props) => {
  return (
    <main>
      <Route path="/" component={SearchSelector} />
      <Route exact path="/array" component={Binary} />
      <Route exact path="/trie" component={Trie} />
      <Route exact path="/compressed-trie" component={CompressedTrie} />
      <Route exact path="/hashmap" component={Hashmap} />
      <Route exact path="/lru-cache" component={LRUCache} />
    </main>
  );
};

export default LandingPage;
