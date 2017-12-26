
class Node {
  constructor(val = "") {
    this.val = val;
    this.parent = null;
    this.children = {};
  }

  setParent(parent) {
    if (this.parent === parent) {
      return;
    }

    if (this.parent) delete this.parent.children[this.val]
    this.parent = parent;
    if (this.parent) this.parent.children[this.val] = this;
  }

  addChild(child) {
    child.setParent(this);
  }

  removeChild(val) {
    const child = this.children[val];
    if (child) child.setParent(null);
  }

  isLeaf() {
    return Object.keys(this.children).length < 1;
  }

  isRoot() {
    return !this.parent;
  }

  numChildren() {
    return Object.keys(this.children).length;
  }

  static buildTrie(parent, words, segLength) {

    let queue = [];
    let newParent;

    for (let i = 0; i < words.length; i++) {

      if (queue.length < 1 || words[i].slice(0, segLength) === words[i - 1].slice(0, segLength)) {
        queue.push(words[i]);
      }

      if (i + 1 === words.length || words[i].slice(0, segLength) !== words[i + 1].slice(0, segLength)) {
        if (queue.length < 2) {
          const newChild = new Node(queue[0].slice(0));
          parent.addChild(newChild);
          queue = [];
        } else {
          if (queue.some((word) => word.slice(0, segLength + 1) !== queue[0].slice(0, segLength + 1))) {
            newParent = new Node(words[i].slice(0, segLength));
            parent.addChild(newParent);
          } else {
            newParent = parent;
          }
          this.buildTrie(newParent, queue, segLength + 1);
          queue = [];
        }
      }
    }
  }
}

export default Node;
