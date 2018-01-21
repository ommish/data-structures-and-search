import TrieNode from './trie_node';

class Trie {

  constructor(parent, words = []) {
    this.root = parent
    Trie.buildTrie(this.root, words);
  }

  static buildTrie(parent, words) {
    words.forEach((word) => {
      parent.addWord(word);
    });
  }
}

export default Trie;
