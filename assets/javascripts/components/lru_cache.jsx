import React from 'react';
import { Link } from 'react-router-dom';
import LRUCacheStructure from '../util/lru_cache';
import { merge } from 'lodash';

class LRUCache extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      disabled: false,
      lruCache: new LRUCacheStructure(5, this.fetchGif),
    }

  }

  handleInput(e) {
    this.setState({searchQuery: e.target.value});
  }

  handleSubmit() {
    const newState = merge({}, this.state);
    newState.searchQuery = "";
    this.setState({newState})
    newState.lruCache.getVal(this.state.searchQuery).then(() => {
      this.setState(newState);
    });
  }

  fetchGif(searchQuery) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=tkxUdipmguigc6JvjgXNaNHs2u3dYIcx&limit=1&q=${searchQuery}`
    return $.ajax({
      url,
      method: 'get',
    });
  }

  renderCache() {
    const cachedGifs = [];
    this.state.lruCache.store.eachNode((node) => {
      cachedGifs.unshift(
        [<div className="cache-gif-container" key={node.key}><h4>Search Query: {node.key}</h4>
          <img className="cache-gif" src={node.val} /></div>]
      )
    });
    return cachedGifs;
  }

  renderHashmap() {
      let allWords = [];
      this.state.lruCache.hashmap.eachList((list, i) => {
        const listWords = [];
        let j = 0;
        if (list.isEmpty()) {
          listWords.push(<li className="word empty" key={i}>empty</li>);
          allWords.push(<ul key={i}>{listWords}</ul>);
        }
        list.eachNode((node) => {
          j++;
          listWords.push(<li className="word" key={node.key}>{node.key}</li>);
          if (j === list.numNodes()) {
            allWords.push(<ul key={node.key}>{listWords}</ul>)
          }
        });
      });
      return allWords;
  }

  render() {
    return (
      <main>
        <h3>LRU Cache</h3>
        <p>This LRU cache is built using a hashmap and doubly linked list. The max size of the cache is set to 5 elements.
        Search terms are stored as keys in the hashmap with values pointing to nodes in the doubly linked list, which store gif data.</p>
        <p>Searching for an uncached search term will result in a query with the GIPHY Api, whereas searching for a cached term will
        result in retrieval of the corresponding cached value in the store. This retrieval and subsequent rearrangement of the store are both achieved
        in constant time.</p>
        <input
          type="text"
          onKeyPress={(e) => {if (e.key === "Enter") this.handleSubmit()}}
          onChange={this.handleInput.bind(this)}
          value={this.state.searchQuery}
          disabled={this.state.disabled}/>
        <button
          disabled={this.state.disabled}
          onClick={this.handleSubmit.bind(this)}>
          Search for Gif
        </button>
        <ul className="word-list">
        Hashmap:
          {this.renderHashmap()}
        </ul>
        <div className="cache-gifs">
        Linked List:
          {this.renderCache()}
        </div>
      </main>
    )
  }

}

export default LRUCache;
