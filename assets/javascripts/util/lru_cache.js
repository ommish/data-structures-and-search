import Hashmap from './hashmap';
import LinkedList from './linked_list';

class LRUCache {
  constructor(max = 5, func) {
    this.hashmap = new Hashmap();
    this.store = new LinkedList();
    this.max = max;
    this.func = func;
  }

  getVal(key) {
    const node = this.hashmap.findNode(key);
    if (node) {
      return this.updateStore(node.val);
    } else {
      return this.addToStore(key);
    }
  }

  updateStore(node) {
    return new Promise((resolve, reject) => {
      node.removeFromList();
      const newNode = this.store.appendNode(node.key, node.val);
      this.hashmap.addVal(node.key, newNode);

      resolve();
    });
  }

  addToStore(key) {
    if (this.hashmap.numElements === this.max) {
      this.ejectNode();
    }
    let val;
    return this.func(key).then((res) => {
      if (res.data[0]) {
        val = res.data[0].images.original.url;
      } else {
        val = "http://s3-sa-east-1.amazonaws.com/base-fisc-prod/missing.png";
      }
      const newNode = this.store.appendNode(key, val);
      return this.hashmap.addVal(key, newNode);
    });
  }

  ejectNode() {
    const toRemove = this.store.head.next;
    toRemove.removeFromList();
    this.hashmap.deleteKey(toRemove.key)
  }
}

export default LRUCache;
