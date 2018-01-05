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
  }

  handleInput(e) {
    this.setState({searchQuery: e.target.value, inspecting: null, checked: 0, found: "Enter a word to search!"});
  }

  handleSubmit() {
    this.trieSearch(this.props.dictionaryTrie, this.state.searchQuery.toString().toLowerCase());
    this.setState({disabled: true, found: "Searching..."});
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

  componentDidMount() {
    this.trie = new CompressedTrieStructure(new TreeNode(), dictionary);
    this.props.receiveDictionary(this.trie.root, "compressedTrie");
  }

  toJSX(node) {
    return (
      <ul key={node.val} className={this.state.inspecting === node.val ? "node active" : "node"}>
        {node.isRoot() ? "" : <li>{node.val}</li>}
        {node.isLeaf() ? "" : Object.values(node.children).map((child) => this.toJSX(child))}
      </ul>
    );
  }

  render() {
    return (
      <section className="compressed-trie">
        <Link to="/">Return</Link>
        <h3>Compressed Trie</h3>
        <p>The compressed trie is similar to a trie, except the compressed trie has a reduced size.
        This is accomplished by ignoring word segments that would only lead to one other word segment,
        essentially combining two (or more) nodes into one. A compressed trie can be built from an existing trie with a compressor function,
        or built from scratch like the the one below.
        While the space requirement can be greatly reduced, traversal becomes slightly more complicated.
        The time complexity for search remains O(m) time where m is the length of the target string.</p>
        <p>This is a demonstration of how a compressed trie would be traversed to locate a word. Complete words are found in the leaf nodes.
        (Please note that this dictionary is missing many words!)</p>
        <h4>Search for a node by value</h4>
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
        <h4>{this.state.found}</h4>
        <h4>{this.state.checked} nodes checked</h4>
        <h4>Looking for: {this.state.inspectingSeg}</h4>

        <section className="compressed-trie-list">{this.trie ? this.toJSX(this.trie.root) : ""}</section>
      </section>
    );  }

}

export default CompressedTrie;
