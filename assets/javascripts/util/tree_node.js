
class TreeNode {
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

export default TreeNode;
