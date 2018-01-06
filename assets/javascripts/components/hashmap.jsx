import Hashmap from '../util/hashmap';
import React from 'react';
import { dictionary } from '../dictionary';
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
      funcue.push(() => this.setState({currentNode, searching: searching4}));
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

  componentWillMount() {
    this.dictionaryHashmap = new Hashmap();
    dictionary.forEach((word) => {
      this.dictionaryHashmap.addVal(word, true);
    });
  }

  createList() {
    let allWords = [];
    this.dictionaryHashmap.eachList((list, i) => {
      const listWords = [];
      let j = 0;
      const bucketClass = this.state.currentBucket === list ? "bucket active" : "bucket";
      if (list.isEmpty()) {
        listWords.push(<li className="linked-list-node" key={i}>&nbsp;</li>);
        allWords.push(<ul className={bucketClass} key={i}>{listWords}</ul>);
      }
      list.eachNode((node) => {
        j++;
        const nodeClass = this.state.currentNode === node ? "linked-list-node active" : "linked-list-node";
        listWords.push(<li className={nodeClass} key={node.key}>{node.key}</li>);
        if (j === list.numNodes()) {
          allWords.push(<ul className={bucketClass} key={node.key}>{listWords}</ul>)
        }
      });
    });
    return allWords;
  }

  render() {
    return (
      <section className="trie">
        <Link to="/">Return</Link>
        <h3>Hashmap</h3>
        <p></p>
        <input
          type="text"
          onChange={this.handleInput.bind(this)}
          value={this.state.searchQuery}
          disabled={this.state.disabled}/>
        <button
          disabled={this.state.disabled}
          onClick={this.handleSubmit.bind(this)}>
          Start
        </button>
        <h4>{this.state.searching}</h4>
        <ul className="hashmap-list">
          {this.createList()}
        </ul>
      </section>
    );
  }
}

export default HashmapDictionary;
