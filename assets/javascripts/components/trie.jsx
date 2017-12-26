import React from 'react';
import { dictionary } from '../test_dictionary';
import Node from '../util/node';

class Trie extends React.Component {
  constructor(props) {
    super(props);
    this.root = new Node();
    this.dictionary = Array.from(dictionary);

  }

  addWord(parent, word, segLength) {
    if (segLength > word.length) return;
    const child = new Node(word.slice(0, segLength));
    parent.addChild(child);
    this.addWord(child, word, segLength + 1);
  }

  buildTrie(parent = this.root, words = this.dictionary, segLength = 1) {

    if (words.length < 2) {
      this.addWord(parent, words[0], segLength);
      return;
    }

    let queue = [];

    for (let i = 0; i < words.length; i++) {

      if (queue.length < 1 || words[i].slice(0, segLength) === words[i - 1].slice(0, segLength)) {
        queue.push(words[i]);
      }

      if (i + 1 === words.length || words[i].slice(0, segLength) !== words[i + 1].slice(0, segLength)) {
        let newParent = new Node(words[i].slice(0, segLength));
        parent.addChild(newParent);
        this.buildTrie(newParent, queue, segLength + 1);
        queue = [];
      }

    }

  }

  componentDidMount() {
    this.buildTrie();
    this.props.receiveDictionary(this.root, "trie");
  }

  render() {
    window.rootNode = this.root;
    return (
      <section className="trie">
      <h3>Trie</h3>
      {JSON.stringify(this.root.toObject())}
      </section>
    );
  }

}

export default Trie;
