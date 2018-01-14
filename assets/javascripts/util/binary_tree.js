class BinaryTreeNode {
  constructor(val) {
    this.val = val;
    this.parent = null;
    this.children = {
      low: null,
      high: null,
    };
  }

  setParent(parent) {
    this.parent = parent;
    if (parent) {
      if (this.val > parent.val) {
        parent.children.high = this;
      } else {
        parent.children.low = this;
      }
    }
  }
}

class BinaryTree {

  constructor(words = []) {
    const midIdx = Math.floor(words.length / 2);
    this.root = new BinaryTreeNode(words[midIdx]);

    BinaryTree.buildTree(this.root, words.slice(0, midIdx), (words.slice(midIdx + 1)));
  }

  addNewNode(newVal, parent) {
    const newNode = new BinaryTreeNode(newVal);
    newNode.setParent(parent);
  }

  static buildTree(parent, left, right) {

    const leftMidIdx = Math.floor(left.length / 2);
    const rightMidIdx = Math.floor(right.length / 2);

    if (left.length > 0) {
      const leftChild = new BinaryTreeNode(left[Math.floor(left.length / 2)]);
      leftChild.setParent(parent);
      BinaryTree.buildTree(leftChild, left.slice(0, leftMidIdx), left.slice(leftMidIdx + 1));
    }
    if (right.length > 0) {
      const rightChild = new BinaryTreeNode(right[Math.floor(right.length / 2)]);
      rightChild.setParent(parent);
      BinaryTree.buildTree(rightChild, right.slice(0, rightMidIdx), right.slice(rightMidIdx + 1));
    }
  }
}

export default BinaryTree;

//
//                 ball
//
//     around                   toy
//
// about     cat           roof        yellow
//
//
// police
