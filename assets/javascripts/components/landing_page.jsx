import React from 'react';
import Header from './header';
import Binary from './binary';
import { Route } from 'react-router-dom';
import CompressedTrie from './compressed_trie';
import Trie from './trie';
import Hashmap from './hashmap';
import LRUCache from './lru_cache';

const LandingPage = (props) => {
  return (
    <div>
      <Route path="/" component={Header} />
      <Route exact path="/array" component={Binary} />
      <Route exact path="/trie" component={Trie} />
      <Route exact path="/compressed-trie" component={CompressedTrie} />
      <Route exact path="/hashmap" component={Hashmap} />
      <Route exact path="/lru-cache" component={LRUCache} />
    </div>
  );
};

export default LandingPage;
