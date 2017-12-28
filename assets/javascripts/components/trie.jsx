import React from 'react';
import { dictionary } from '../dictionary';
import TreeNode from '../util/tree_node';
import { Link } from 'react-router-dom';

class Trie extends React.Component {

  constructor(props) {
    super(props);
    this.root = new TreeNode();

    this.state = {
      searchQuery: "",
      inspecting: null,
      disabled: false,
      checked: 0,
      found: "Enter a word to search!",
      inspectingSeg: null,
    };
  }

// TODO: Add autocomplete to search input using the trie!

  handleInput(e) {
    this.setState({searchQuery: e.target.value, inspecting: null, checked: 0, found: "Enter a word to search!"});
  }

  handleSubmit() {
    this.trieSearch(this.props.dictionaryTrie, this.state.searchQuery.toString().toLowerCase());
    this.setState({disabled: true, found: "Searching..."});
  }

  trieSearch(trie, target) {
    const funcue = [];
    let searching = true;
    let i = 1;
    let checked = 1;
    let currentParent = trie;
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
    TreeNode.buildTrie(this.root, dictionary, 1);
    this.props.receiveDictionary(this.root, "trie");
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
      <section className="trie">
        <Link to="/">Return</Link>
        <h3>Trie</h3>
        <p>This trie is built with nodes that each hold a value (beginning segment of a word) and an object containing references to its children.
        Searching for a word is done in O(m) time where m is the length of the target string.
        Building a trie can be costly (generally O(n*m) time), but one reason you might want to use a trie is if you need to know all the words
        that a word fragment could lead to (such as in autocomplete).</p>
        <p>This is a demonstration of how a trie would be traversed to locate a word. Complete words are found in the leaf nodes.
        (Please note that this dictionary is missing many words!)</p>
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
        <h4>Looking for {this.state.inspectingSeg}</h4>

        <section className="trie-list">{this.toJSX(this.root)}</section>
      </section>
    );  }

}

export default Trie;
