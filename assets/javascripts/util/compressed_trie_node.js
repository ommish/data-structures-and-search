import TrieNode from './trie_node';

class CompressedTrieNode extends TrieNode {

  getWord() {
    if (this.isRoot() || this.parent.isRoot()) {
      return this.val;
    }
    return this.parent.getWord().concat(`-${this.val}`);
  }

  findParentFor(val) {
    const res = {};
    const children = Object.values(this.children);

    if (children.length < 1) return res;

    for (let i = val.length; i > 0; i--) {
      const target = val.slice(0, i);

      res.parent = this.children[target];
      if (res.parent) return res;

      res.sibling = children.filter((node) => node.val.startsWith(target))[0];
      res.sharedChars = i;
      if (res.sibling) return res;
    }

    return res;
  }

  addWord(val) {
    if (this.children[val]) {
      this.children[val].isWord = true;
      return;
    }

    const {parent, sibling, sharedChars} = this.findParentFor(val);

    if (parent) {
      parent.addWord(val.slice(parent.val.length));
    } else if (!parent && !sibling) {
      this.addChild(new CompressedTrieNode(val, true));
    } else {
      const newParent = new CompressedTrieNode(val.slice(0, sharedChars), false);
      this.removeChild(sibling.val);
      sibling.val = sibling.val.slice(sharedChars);
      newParent.addChild(sibling);
      newParent.addChild(new CompressedTrieNode(val.slice(sharedChars), true));
      this.addChild(newParent);
    }
  }

}

export default CompressedTrieNode;
