import LinkedList from '../util/linked_list';
import hash from 'hash-string';

class Hashmap {
  constructor(numLists = 10) {
    this.lists = new Array(numLists);
    for (let i = 0; i < numLists; i++) {
      this.lists[i] = new LinkedList();
    }
    this.numElements = 0;
  }

  findNode(key) {
    return this.list(key).findNode(key);
  }

  addVal(key, val) {
    if (this.numLists() === this.numElements) this.resize();
    if (this.list(key).include(key)) {
      this.list(key).updateNode(key, val);
    } else {
      this.list(key).appendNode(key, val);
      this.numElements++;
    }
    return val;
  }

  deleteKey(key) {
    if (this.list(key).removeNode(key)) this.numElements--;
  }

  resize() {
    const oldLists = this.lists;
    this.lists = new Array(this.numLists() * 2);
    for (let i = 0; i < this.numLists(); i++) {
      this.lists[i] = new LinkedList();
    }
    oldLists.forEach((list) => {
      list.eachNode((node) => {
        this.list(node.key).appendNode(node.key, node.val);
      });
    });
  }

  eachNode(callback) {
    this.lists.forEach((list) => {
      list.eachNode(callback);
    });
  }

  eachList(callback) {
    this.lists.forEach((list, i) => {
      callback(list, i);
    });
  }

  numLists() {
    return this.lists.length;
  }

  list(key) {
    return this.lists[hash(key) % this.numLists()];
  }
}

export default Hashmap;
