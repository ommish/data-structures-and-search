class LinkedList {
  constructor() {
    this.head = new ListNode();
    this.tail = new ListNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  numNodes() {
    let count = 0;
    this.eachNode((node) => count++);
    return count;
  }

  isEmpty() {
    return this.head.next === this.tail;
  }

  eachNode(callback) {
    let currentNode = this.head.next;
    while (currentNode !== this.tail) {
      callback(currentNode);
      currentNode = currentNode.next;
    }
  }

  appendNode(key, val) {
    const newNode = new ListNode(key, val);

    newNode.prev = this.tail.prev;
    this.tail.prev.next = newNode;
    this.tail.prev = newNode;
    newNode.next = this.tail;

    return newNode;
  }

  updateNode(key, val) {
    let updatedNode;
    this.eachNode((node) => {
      if (node.key === key) {
        node[key] = val;
        updatedNode = node;
      }
    });
    return updatedNode;
  }

  removeNode(key) {
    let deleted;
    this.eachNode((node) => {
      if (node.key === key) {
        deleted = node;
        node.removeFromList();
      }
    });
    return deleted;
  }

  checkVal(key) {
    let val;
    this.eachNode((node) => {
      if (node.key === key) val = node.val;
    });
    return val;
  }

  include(key) {
    let res = false;
    this.eachNode((node) => {
      if (node.key === key) res = true;
    });
    return res;
  }

}

class ListNode {
  constructor(key = null, val = null) {
    this.val = val;
    this.key = key;
    this.prev = null;
    this.next = null;
  }

  removeFromList() {
    if (this.prev) this.prev.next = this.next;
    if (this.next) this.next.prev = this.prev;
    this.prev = null;
    this.next = null;
  }
}

export default LinkedList;
