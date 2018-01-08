import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {

  render() {
    return (
      <section>
        <header>
          <ul>
            <li><NavLink exact className="home-link" to="/">Home</NavLink></li>
            <li>&nbsp;&nbsp;&nbsp;&nbsp;</li>
            <li><NavLink activeClassName="selected-navlink" to="/array">Array</NavLink></li>
            <li>•</li>
            <li><NavLink activeClassName="selected-navlink" to="/trie">Trie</NavLink></li>
            <li>•</li>
            <li><NavLink activeClassName="selected-navlink" to="/compressed-trie">Compressed Trie</NavLink></li>
            <li>•</li>
            <li><NavLink activeClassName="selected-navlink" to="/hashmap">Hashmap</NavLink></li>
            <li>•</li>
            <li><NavLink activeClassName="selected-navlink" to="/lru-cache">LRU Cache</NavLink></li>
          </ul>
        </header>
        <footer>
        <ul>
          <li><a href="http://www.ommish.com" target="_blank">Portfolio</a></li>
          <li>•</li>
          <li><a href="https://github.com/ommish" target="_blank">Github</a></li>
          <li>•</li>
          <li><a href="https://www.linkedin.com/in/ommish" target="_blank">LinkedIn</a></li>
        </ul>
        </footer>
      </section>
    );
  }
}

export default Header;
