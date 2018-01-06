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

  render() {
    return (
      <section>
        <Link to="/">Return</Link>
        <h3>LRU Cache</h3>
        <p></p>
        <input
          type="text"
          onKeyPress={(e) => {if (e.key === "Enter") this.handleSubmit()}}
          onChange={this.handleInput.bind(this)}
          value={this.state.searchQuery}
          disabled={this.state.disabled}/>
        <button
          disabled={this.state.disabled}
          onClick={this.handleSubmit.bind(this)}>
          Submit
        </button>
        <div className="cache-gifs">
          {this.renderCache()}
        </div>
      </section>
    )
  }

}

export default LRUCache;
