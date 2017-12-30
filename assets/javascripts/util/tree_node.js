
class TreeNode {
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
      // if we're at the first word or the previous word had the same initial segment, add the word to the queue
      if (queue.length < 1 || words[i].slice(0, segLength) === words[i - 1].slice(0, segLength)) {
        queue.push(words[i]);
      }
      // if we're at the last word or the next word has a different initial segment
      if (i + 1 === words.length || words[i].slice(0, segLength) !== words[i + 1].slice(0, segLength)) {
        // and if we only have one word in the queue
        if (queue.length < 2) {
          // add a new node with value = word and append to parent
          const newChild = new TreeNode(queue[0].slice(0));
          parent.addChild(newChild);
          queue = [];
        } else {
          // otherwise, if the queue doesn't have any words whose shared segments are longer than the current segment length
          if (queue.some((word) => word.slice(0, segLength + 1) !== queue[0].slice(0, segLength + 1))) {
            // append a new node with value = segment of the word and make that the new parent
            newParent = new TreeNode(words[i].slice(0, segLength));
            parent.addChild(newParent);
          } else {
            // otherwise, keep the same parent
            newParent = parent;
          }
          // build tree for the words in queue
          this.buildTrie(newParent, queue, segLength + 1);
          queue = [];
        }
      }
    }
  }
}

export default TreeNode;
