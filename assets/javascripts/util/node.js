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

}

export default Node;

window.Node = Node;
