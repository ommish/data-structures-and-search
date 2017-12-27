import LinkedList from '../util/linked_list';
import { hash } from 'string-hash';

class HashMap {
  constructor(numLists = 10) {
    this.lists = new Array(numLists).map((el) => new LinkedList())
    this.numElements = 0;
  }

  addVal(key, val) {
    if (this.numLists() === this.numElements) this.resize();
    if (this.list(key).include(key)) {
      this.list(key).updateNode(key, val);
    } else {
      this.list(key).appendNode(key, val);
      this.numElements++;
    }
  }

  deleteKey(key) {
    if (this.list(key).removeNode(key)) this.numElements--;
  }

  resize() {
    const oldLists = this.lists;
    this.lists = new Array(this.numLists() * 2).map((el) => new LinkedList());
    oldLists.forEach((list) => {
      list.eachNode((node) => {
        this.list(node.key).appendNode(node.key, node.val);
      });
    });
  }

  eachBucket(callback) {
    this.lists.forEach((list) => {
      callback(list);
    });
  }

  numLists() {
    return this.lists.length;
  }

  list(key) {
    this.lists[hash(key) % this.numLists()]
  }
}
