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
    this.setState({autosuggestResults: res});
  }

  componentDidMount() {
    this.trie = new TrieStructure(new TreeNode(), dictionary);
    this.props.receiveDictionary(this.trie.root, "trie");
  }


  render() {
    return (
      <section className="trie">
        <Link to="/">Return</Link>
        <h3>Trie</h3>
        <p>This trie is built with nodes that each hold a value (beginning segment of a word) and an object containing references to its children.
        Searching for a word is done in O(m) time where m is the length of the target string.</p>
        <p>This is a demonstration of how a trie can be used to accomplish autosuggest. A search for the node with the target value is first conducted,
        then its child nodes are searched to find values that are dictionary words.
        (Please note that this dictionary is missing many words!)</p>
        <label>Autocomplete
        <input value={this.state.searchQuery} onChange={this.handleInput.bind(this)}/>
        </label>
        <ul className="trie-list">
        {this.state.autosuggestResults.map((word, i) => <li key={i}>{word}</li>)}
        </ul>
      </section>
    )
  }
}

export default Trie;
