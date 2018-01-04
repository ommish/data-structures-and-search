import React from 'react';
import { Link } from 'react-router-dom';

class SearchSelector extends React.Component {

  render() {
    return (
      <section>
      <h2>Select a method for searching the dictionary:</h2>
      <ul>
        <li><Link to="/binary">Array Binary Search</Link></li>
        <li><Link to="/trie">Trie</Link></li>
        <li><Link to="/compressed-trie">Compressed Trie</Link></li>
        <li><Link to="/hashmap">Hashmap</Link></li>
      </ul>
      </section>
    );
  }
}

export default SearchSelector;
