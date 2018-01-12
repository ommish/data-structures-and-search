import React from 'react';
import { dictionary } from '../long_dictionary';
import TreeNode from '../util/tree_node';
import TrieStructure from '../util/trie';
import { Link } from 'react-router-dom';

class Trie extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      trie: null,
    }
  }

  handleInput(e) {
    this.setState({searchQuery: e.target.value}, () => this.findNode());
  }

  findNode() {
    const parentNode = TrieStructure.findNodeByVal(this.trie.root, this.state.searchQuery);
    if (parentNode) {
      this.setState({trie: this.toJSX(parentNode)});
    } else {
      this.setState({trie: null});
    }
  }

  toJSX(node) {
    const wordClass = node.isWord && this.state.searchQuery ? "word active" : "word"
    return (
      <ul key={node.val} className="word-list trie">
        {node.isRoot() ? "" : <li className={wordClass}>{node.val}</li>}
        {node.isLeaf() ? "" : Object.values(node.children).map((child) => this.toJSX(child))}
      </ul>
    );
  }

  componentDidMount() {
    this.trie = new TrieStructure(new TreeNode(), dictionary);
    this.setState({trie: this.toJSX(this.trie.root)})
  }

  render() {
    return (
      <main>
        <h3>Trie</h3>
        <h4>Autosuggest</h4>
        <p>
        This trie is built with nodes that each hold a value (beginning segment of a word) and an object containing references to its children.
        The values of the child nodes are word segments that continue from the parent node's. Searching for a word is done in O(m) time where m is the length of the target string.</p>
        <p>This is a demonstration of how a trie can be used to implement autosuggest. After finding the node with the target value, nodes with actual dictionary word values are found.
        These nodes will be highlighted.</p>
        <input value={this.state.searchQuery} onChange={this.handleInput.bind(this)}/>
        <section className="trie-list">
          {this.state.trie ? this.state.trie : null}
        </section>
      </main>
    )
  }
}

export default Trie;
