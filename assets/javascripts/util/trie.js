import TreeNode from './tree_node';

class Trie {

  constructor(parent, words = []) {
    this.root = parent
    Trie.buildTrie(this.root, words);
  }

  static findNodeByVal(node, target) {
    if (node.val === target) return node;
    if (node.isLeaf()) return null;
    const childrenToCheck = Object.values(node.children).filter((child) => target.startsWith(child.val))
    for (let i = 0; i < childrenToCheck.length; i++) {
      const res = Trie.findNodeByVal(childrenToCheck[i], target);
      if (res) return res;
    }
    return null;
  }

  static buildTrie(parent, words) {

    words.forEach((word) => {
      let currentParent = parent;
      for (let i = 1; i <= word.length; i++) {
        let isWord = i === word.length;
        if (!currentParent.children[word.slice(0, i)]) {
          let newParent = new TreeNode(word.slice(0, i), isWord);
          currentParent.addChild(newParent);
          currentParent = newParent;
        } else {
          if (isWord) {
            currentParent.children[word.slice(0, i)].isWord = true;
          } else {
            currentParent = currentParent.children[word.slice(0, i)];
          }
        }
      }
    });
  }
}

export default Trie;
