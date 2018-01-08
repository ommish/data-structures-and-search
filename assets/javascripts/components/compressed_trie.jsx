import React from 'react';
import { dictionary } from '../dictionary';
import TreeNode from '../util/tree_node';
import CompressedTrieStructure from '../util/compressed_trie';
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

    this.root = new TreeNode();
    CompressedTrieStructure.buildCompressedTrie(this.root, dictionary, 1);
  }

  handleInput(e) {
    this.setState({searchQuery: e.target.value, inspecting: null, inspectingSeg: null, checked: 0, found: "Enter a word to search!"});
  }

  handleSubmit() {
    this.setState({disabled: true, inspecting: null, checked: 0, inspectingSeg: null, found: "Searching..."});
    this.trieSearch(this.root, this.state.searchQuery.toString().toLowerCase());
  }

  trieSearch(root, target) {
    const funcue = [];
    let searching = true;
    let i = 1;
    let checked = 1;
    let currentParent = root;
    let inspecting = currentParent.children[target.slice(0, i)];

    while (searching) {
      let val;
      let numChecked;
      let found = "Searching...";
      let inspectingSeg = target.slice(0, i);
      if (i < target.length) {
        if (inspecting) {
          val = inspecting.val;
          currentParent = inspecting;
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
        val = inspecting.val;
        numChecked = checked;
        found = "Found!";
      }
      funcue.push(() => {
        this.setState({inspecting: val, checked: numChecked, found, inspectingSeg})
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
    const wordClass = this.state.inspecting === node.val ? "word active" : "word"
    return (
      <ul key={node.val} className="word-list compressed-trie">
        {node.isRoot() ? "" : <li className={wordClass}>{node.val}</li>}
        {node.isLeaf() ? "" : Object.values(node.children).map((child) => this.toJSX(child))}
      </ul>
    );
  }

  render() {
    return (
      <main className="">
        <h3>Compressed Trie</h3>
        <p>The compressed trie is similar to a trie, but has a reduced size.
        This is accomplished by ignoring word segments that would only lead to one other word segment,
        essentially combining two (or more) nodes into one. A compressed trie can be built from an existing trie with a compressor function,
        or built from scratch like the one below.
        While the space requirement can be greatly reduced, the time complexity for building a compressed trie is higher.
        The time complexity for search remains O(m) where m is the length of the target string.</p>
        <p>This is a demonstration of how a compressed trie would be traversed to locate a node.</p>
        <input
          disabled={this.state.disabled}
          type="text"
          value={this.state.searchQuery}
          onKeyPress={(e) => {if (e.key === "Enter") this.handleSubmit()}}
          onChange={this.handleInput.bind(this)}/>
        <button
          disabled={this.state.disabled}
          onClick={this.handleSubmit.bind(this)}>
          Start!
        </button>
        <div className="search-status">
        <p>{this.state.found}</p>
        <p>{this.state.checked} nodes checked</p>
        <p>Looking for: {this.state.inspectingSeg}</p>
        </div>
        <section className="compressed-trie-list">{this.root ? this.toJSX(this.root) : ""}</section>
      </main>
    );  }

}

export default CompressedTrie;
