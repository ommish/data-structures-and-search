
class Node {
  constructor(val = null) {
    this.val = val;
    this.parent = null;
    this.children = [];
  }

  setParent(parent) {
    if (this.parent === parent) {
      return;
    }

    if (this.parent) this.parent.children = this.parent.children.filter((child) => child !== this);
    this.parent = parent;
    if (this.parent) this.parent.children.push(this);
  }

  addChild(child) {
    child.setParent(this);
  }

  removeChild(child) {
    if (this.children.includes(child)) child.setParent(null);
  }

  isLeaf() {
    return this.children.length < 1;
  }

  isRoot() {
    return !this.parent;
  }

  toObject() {
    const res = {};
    if (!this.isRoot()) res.val = this.val;
    res.children = this.isLeaf() ? [] : this.children.map((child) => child.toObject());
    return res;
  }

  static addWord(parent, word, segLength) {
    if (segLength > word.length) return;
    const child = new Node(word.slice(0, segLength));
    parent.addChild(child);
    this.addWord(child, word, segLength + 1);
  }

  static buildTrie(parent, words, segLength) {

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

}

export default Node;
