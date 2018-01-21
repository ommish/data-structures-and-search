import React from 'react';
import { longDictionary } from '../long_dictionary';
import TrieNode from '../util/trie_node';
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
    const parentNode = this.trie.root.findChildNodeByWord(this.state.searchQuery.toLowerCase());
    if (parentNode) {
      this.setState({trie: this.toJSX(parentNode)});
    } else {
      this.setState({trie: null});
    }
  }

  toJSX(node) {
    const wordClass = node.isWord && this.state.searchQuery ? "word active" : "word";
    const word = node.isWord ? node.val.concat(` (${node.getWord()})`) : node.val
    return (
      <ul key={node.val} className="word-list trie">
        {node.isRoot() ? "" : <li className={wordClass}>{word}</li>}
        {Object.values(node.children).map((child) => this.toJSX(child))}
      </ul>
    );
  }

  componentDidMount() {
    this.trie = new TrieStructure(new TrieNode(), longDictionary);
    this.setState({trie: this.toJSX(this.trie.root)})
  }

  render() {
    return (
      <main>
        <h3>Trie</h3>
        <h4>Autosuggest</h4>
        <p>
        This trie is used to store a dictionary.
        Each character in a word is stored as a child node of its preceding character.
        Searching for a string is done in O(m) time where m is the length of the target string.</p>
        <p>This is a demonstration of how a trie can be used to implement autosuggest.
        The trie is first searched using the input to find the target node, then its child nodes are
        searched to find nodes that represent actual dictionary words.
        For example, if the search term is "ab", we check if the root has any child nodes with the value "a".
        If it does, we check that node's children for a node with value "b".
        If this node exists, we then recursively search through its children for nodes with an isWord property value of true.
        These nodes will be highlighted.</p>
        <p>(Nodes representing dictionary words have the full word (rather than just the node value) displayed in order to
        help visualize the autosuggest results.)</p>
        <input value={this.state.searchQuery} onChange={this.handleInput.bind(this)}/>
        <section className="trie-list">
          {this.state.trie ? this.state.trie : null}
        </section>
      </main>
    )
  }
}

export default Trie;
