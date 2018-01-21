
class TrieNode {
  constructor(val = "", isWord = false) {
    this.val = val;
    this.parent = null;
    this.children = {};
    this.isWord = isWord;
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

  getWord() {
    if (this.isRoot() || this.parent.isRoot()) {
      return this.val;
    }
    return this.parent.getWord().concat(this.val);
  }

  addWord(val) {
    if (val.length === 1) {
      if (this.children[val]) {
        this.children[val].isWord = true;
        return;
      } else {
        this.addChild(new TrieNode(val, true));
        return;
      }
    }
    let child = this.children[val.slice(0, 1)];
    if (!child) {
      child = new TrieNode(val.slice(0, 1));
      this.addChild(child);
    }
    child.addWord(val.slice(1));
  }

  findChildNodeByWord(target) {
    if (!target) return this;
    if (target.length === 1) {
      if (this.children[target]) return this.children[target];
      return null;
    }
    const nextNode = this.children[target.slice(0, 1)];
    if (!nextNode) return null;
    return nextNode.findChildNodeByWord(target.slice(1));
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

  allChildWords() {
    if (this.isLeaf()) {
      return [];
    }
    let childrenVals = Object.keys(this.children).filter((key) => this.children[key].isWord);
    Object.values(this.children).forEach((child) => {
      childrenVals = childrenVals.concat(child.allChildWords());
    });
    return childrenVals;
  }


}

export default TrieNode;
