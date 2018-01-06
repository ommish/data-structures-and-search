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
      return this.updateStore(node);
    } else {
      return this.addToStore(key);
    }
  }

  updateStore(node) {
    node.removeFromList();
    const newNode = this.store.appendNode(node.key, node.val);
    return this.hashmap.addVal(node.key, newNode);
  }

  addToStore(key) {
    if (this.hashmap.numElements === this.max) {
      this.ejectNode();
    }
    const val = this.func(key);
    const newNode = this.store.appendNode(key, val);
    return this.hashmap.addVal(key, newNode);
  }

  ejectNode() {
    const toRemove = this.store.head.next;
    toRemove.removeFromList();
    this.hashmap.deleteKey(toRemove.key)
  }
}

export default LRUCache;
