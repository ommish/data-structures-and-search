export class BinaryTreeNode {
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

  // if (parent) {
  //   if (this.val > parent.val) {
  //     if (parent.children.high && this.val > parent.children.high) {
  //       this.children.low = parent.children.high;
  //       parent.children.high.parent = this;
  //     } else if (parent.children.high && this.val < parent.children.high){
  //       this.children.high = parent.children.high;
  //     }
  //     parent.high = this;
  //   } else {
  //     if (this.val > parent.children.low) {
  //       this.children.low = parent.children.low;
  //     } else {
  //       this.children.high - parent.children.low;
  //     }
  //     parent.low = this;
  //   }
  // }
}

export class BinaryTree {

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
