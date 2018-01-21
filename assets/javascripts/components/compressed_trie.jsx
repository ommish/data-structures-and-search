import React from 'react';
import { longDictionary } from '../long_dictionary';
import CompressedTrieNode from '../util/compressed_trie_node';
import { Link } from 'react-router-dom';

class CompressedTrie extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      inspecting: null,
      disabled: false,
      checked: 0,
      found: "Enter a word to search!",
      inspectingSeg: null,
    };

    this.buildCompressedTrie();
  }

  buildCompressedTrie() {
    this.root = new CompressedTrieNode();
    const words = longDictionary.filter((word, i) => {
      for (let n = 2; n < i; n++) {
        if (i % n === 0) return false;
      }
      return true;
    });
    words.forEach((word) => {
      this.root.addWord(word);
    });
  }

  handleInput(e) {
    this.setState({searchQuery: e.target.value, inspecting: null, inspectingSeg: null, checked: 0, found: "Enter a word to search!"});
  }

  handleSubmit() {
    this.setState({disabled: true, inspecting: null, checked: 0, found: "Searching..."});
    this.trieSearch(this.state.searchQuery.toLowerCase());
  }

  trieSearch(target) {
    const funcue = [];
    let currentParent = this.root
    let searching = true;
    let i = 1;
    let checked = 1;
    let inspecting = currentParent.children[target.slice(0, 1)];

    while (searching) {
      let val;
      let numChecked;
      let found = "Searching...";
      let inspectingSeg = currentParent.val ? currentParent.getWord().concat(`-${target.slice(0, i)}`) : target.slice(0, 1);
      if (i < target.length) {
        if (inspecting) {
          val = inspecting.getWord();
          target = target.slice(i);
          currentParent = inspecting;
          i = 0;
        }
        i++;
        numChecked = checked;
        checked++;
        inspecting = currentParent.children[target.slice(0, i)]
      } else if (!inspecting) {
        searching = false;
        val = null;
        numChecked = checked;
        found = "Not Found!"
      } else {
        searching = false;
        val = inspecting.getWord();
        numChecked = checked;
        found = "Found!";
      }
      funcue.push(() => {
        this.setState({inspecting: val, checked: numChecked, inspectingSeg, found})
      });

    }
    this.startTrieSearchAnimation(funcue);
  }

  startTrieSearchAnimation(queue) {
    const trieSearchInterval = window.setInterval(() => {
      queue.shift()();
      if (queue.length < 1) {
        window.clearInterval(trieSearchInterval);
        this.setState({disabled: false});
      }
    }, 1000);
  }

  toJSX(node) {
    const wordClass = this.state.inspecting === node.getWord() ? "word active" : "word"
    const word = node.isWord ? node.val.concat(` (${node.getWord()})`) : node.val
    return (
      <ul key={node.getWord()} className="word-list trie">
        {node.isRoot() ? "" : <li className={wordClass}>{word}</li>}
        {Object.values(node.children).map((child) => this.toJSX(child))}
      </ul>
    );
  }

  render() {
    return (
      <main>
        <h3>Compressed Trie</h3>
        <p>The compressed trie is similar to a trie, but has a reduced size.
        This is accomplished by ignoring word segments that would only lead to one other word segment,
        essentially combining two (or more) nodes into one. A compressed trie can be built from an existing trie with a compressor function,
        or built from scratch like the one below.
        The time complexity for search remains O(m) where m is the length of the target string.</p>
        <p>This is a demonstration of how a compressed trie would be traversed to locate a node.</p>
        <p>(Nodes representing dictionary words have the full word displayed rather than just the node value in order to
        better visualize the words stored.)</p>
        <input
          disabled={this.state.disabled}
          type="text"
          value={this.state.searchQuery}
          onKeyPress={(e) => {if (e.key === "Enter" && this.state.searchQuery) this.handleSubmit()}}
          onChange={this.handleInput.bind(this)}/>
        <button
          disabled={!this.state.searchQuery || this.state.disabled}
          onClick={this.handleSubmit.bind(this)}>
          Start!
        </button>
        <div className="search-status">
        <p>{this.state.found}</p>
        <p>{this.state.checked} checks</p>
        <p>Currently searching for: {this.state.inspectingSeg}</p>
        </div>
        <section className="trie-list">{this.root ? this.toJSX(this.root) : ""}</section>
      </main>
    );  }

}

export default CompressedTrie;
