import React from 'react';
import { NavLink } from 'react-router-dom';

class SearchSelector extends React.Component {

  render() {
    return (
      <section>
      <h2>Select a data structure:</h2>
      <ul>
        <li><NavLink to="/array">Array</NavLink></li>
        <li><NavLink to="/trie">Trie</NavLink></li>
        <li><NavLink to="/compressed-trie">Compressed Trie</NavLink></li>
        <li><NavLink to="/hashmap">Hashmap</NavLink></li>
        <li><NavLink to="/lru-cache">LRU Cache</NavLink></li>
      </ul>
      <ul>
        <li><a href="http://www.ommish.com">Portfolio</a></li>
        <li><a href="https://www.linkedin.com/in/ommish">LinkedIn</a></li>
        <li><a href="https://github.com/ommish/data-structures-and-search">Github</a></li>
      </ul>
      </section>
    );
  }
}

export default SearchSelector;
