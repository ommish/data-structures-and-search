import React from 'react';
import { dictionary } from '../test_dictionary';
import Node from '../util/node';
import { Link } from 'react-router-dom';

class Trie extends React.Component {

  constructor(props) {
    super(props);
    this.root = new Node();

    this.state = {
      searchQuery: "",
      inspecting: null,
      disabled: false,
    };
  }

  handleInput(e) {
    this.setState({searchQuery: e.target.value});
  }

  handleSubmit() {
    this.trieSearch(this.props.dictionary, this.state.searchQuery.toString());
    this.setState({disabled: true});
  }

  trieSearch(trie, target) {
    const funcue = [];

  }

  componentDidMount() {
    Node.buildTrie(this.root, dictionary, 1);
    this.props.receiveDictionary(this.root, "trie");
  }

  toJSX(node) {
    return (
      <ul key={node.val} className="node">
        <li>value: {node.val}</li>
        <li>children: {node.isLeaf() ? "none" : node.children.map((child) => this.toJSX(child))}</li>
      </ul>
    );
  }

  render() {
    return (
      <section className="trie">
        <Link to="/">Return</Link>
        <h3>Trie</h3>
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
        {this.toJSX(this.root)}
      </section>
    );  }

}

export default Trie;
