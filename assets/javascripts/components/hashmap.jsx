import Hashmap from '../util/hashmap';
import React from 'react';
import { dictionary } from '../long_dictionary';
import { Link } from 'react-router-dom';

class HashmapDictionary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      disabled: false,
      currentBucket: null,
      currentNode: null,
      searching: "Enter a word to search",
    }

    this.dictionaryHashmap = new Hashmap();
    dictionary.forEach((word) => {
      this.dictionaryHashmap.addVal(word, true);
    });
  }

  handleInput(e) {
    this.setState({searchQuery: e.target.value, currentBucket: null, currentNode: null, searching: "Enter a word to search"});
  }

  handleSubmit() {
    this.setState({disabled: true, currentBucket: null, currentNode: null, searching: "Searching..."})
    this.startHashmapSearch();
  }

  startHashmapSearch() {
    const funcue = [];
    let currentBucket = this.dictionaryHashmap.list(this.state.searchQuery);
    let searching = true;

    let searching1 = currentBucket ? "Searching..." : "Not found!";
    funcue.push(() => this.setState({currentBucket, searching: searching1}));
    if (!currentBucket) {
      this.startHashmapAnimation(funcue);
      return;
    }
    searching = !currentBucket.isEmpty();
    let searching2 = currentBucket.isEmpty() ? "Not Found!" : "Searching...";

    if (!searching) {
      funcue.push(() => this.setState({currentBucket, searching: searching2}));
      this.startHashmapAnimation(funcue);
      return;
    }
    currentBucket.eachNode((currentNode) => {
      if (searching) {
        let searching3 = currentNode.key === this.state.searchQuery ? "Found!" : "Searching...";
        searching = currentNode.key !== this.state.searchQuery;
        funcue.push(() => this.setState({currentNode, searching: searching3}));
        if (currentNode.key === this.state.searchQuery) {
          this.startHashmapAnimation(funcue);
        }
      }
    });
    if (searching) {
      let searching4 = "Not found!";
      funcue.push(() => this.setState({currentNode: null, searching: searching4}));
      this.startHashmapAnimation(funcue);
    }
  }

  startHashmapAnimation(queue) {
    const hashmapInterval = window.setInterval(() => {
      queue.shift()();
      if (queue.length < 1) {
        window.clearInterval(hashmapInterval);
        this.setState({disabled: false});
      }
    }, 1000);
  }

  createList() {
    let allWords = [];
    this.dictionaryHashmap.eachList((list, i) => {
      const listWords = [];
      let j = 0;
      // const bucketClass = this.state.currentBucket === list ? "bucket active" : "bucket";
      let wordClass = this.state.currentBucket === list ? "word range" : "word";

      if (list.isEmpty()) {
        listWords.push(<li className={`${wordClass} empty`} key={i}>empty</li>);
        allWords.push(<ul key={i}>{listWords}</ul>);
      }
      list.eachNode((node) => {
        j++;
      let wordClass = this.state.currentBucket === list ? "word range" : "word";
      wordClass += this.state.currentNode === node ? " active" : "";
        listWords.push(<li className={wordClass} key={node.key}>{node.key}</li>);
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
        <h3>Hashmap</h3>
        <p>This hashmap is built with a resizing array of linked lists.
        Doubling of the array size is triggered when the number of stored elements reaches the number of linked lists.
        Finding a word in this dictionary is achieved in constant time.</p>
        <p>The list containing the element will be highlighted,
        and the word at the node being checked will be colored red.</p>
        <input
          type="text"
          onKeyPress={(e) => {if (e.key === "Enter") this.handleSubmit()}}
          onChange={this.handleInput.bind(this)}
          value={this.state.searchQuery}
          disabled={this.state.disabled}/>
        <button
          disabled={this.state.disabled}
          onClick={this.handleSubmit.bind(this)}>
          Start!
        </button>
        <div className="search-status">
        <p>{this.state.searching}</p>
        </div>
        <ul className="word-list">
          {this.createList()}
        </ul>
      </main>
    );
  }
}

export default HashmapDictionary;
