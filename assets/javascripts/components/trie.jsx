import React from 'react';
import { dictionary } from '../dictionary';
import TreeNode from '../util/tree_node';
import TrieStructure from '../util/trie';
import { Link } from 'react-router-dom';

class Trie extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      autosuggestResults: [],
    }
  }

  handleInput(e) {
    this.setState({searchQuery: e.target.value}, () => this.autosuggest());
  }

  autosuggest() {
    const parentNode = TrieStructure.findNodeByVal(this.trie.root, this.state.searchQuery);
    let res;
    if (parentNode) {
      res = parentNode.allChildWords();
    } else {
      res = [];
    }
    if (this.state.searchQuery === "") {
      res = this.trie.root.allChildWords();
    }
    this.setState({autosuggestResults: res});
  }

  componentDidMount() {
    this.trie = new TrieStructure(new TreeNode(), dictionary);
    this.autosuggest();
  }


  render() {
    return (
      <main className="trie">
        <h3>Trie</h3>
        <h4>Autosuggest</h4>
        <p>
        This trie is built with nodes that each hold a value (beginning segment of a word) and an object containing references to its children.
        The values of the child nodes are word segments that continue from the parent node's. Searching for a word is done in O(m) time where m is the length of the target string.</p>
        <p>This is a demonstration of how a trie can be used to implement autosuggest. After finding the node with the target value,
        the values of its terminal nodes are displayed.</p>
        <input value={this.state.searchQuery} onChange={this.handleInput.bind(this)}/>
        <p></p>
        <ul className="word-list">
        {this.state.autosuggestResults.map((word, i) => <li className="word" key={i}>{word}</li>)}
        </ul>
      </main>
    )
  }
}

export default Trie;
