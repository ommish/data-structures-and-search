import React from 'react';
import BinaryTreeStructure from '../util/binary_tree';
import { dictionary } from '../short_dictionary';
import { merge } from 'lodash';

class BinaryTree extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      input: "",
      tree: new BinaryTreeStructure(dictionary.slice(0, window.outerWidth  / 30)),
      inspecting: "",
      disabled: false,
      message: "Enter a word into the tree",
      newNodeVal: "",
    };
  }

  handleInput(e) {
    this.setState({input: e.target.value});
  }

  handleSubmit() {
    this.findParentFor(this.state.input.toLowerCase());
    this.setState({disabled: true});
  }

  handleEnter(e) {
    if (e.key === "Enter" && !this.state.disabled) {
      this.handleSubmit();
    }
  }

  findParentFor(word) {
    const newTree = merge(new BinaryTreeStructure(), this.state.tree);
    const funcue = [];
    let currentParent = newTree.root;
    let newParentNode = newTree.root;

    let inspecting = currentParent.val.slice();
    funcue.push(() => this.setState({inspecting, message: "Searching for insert location..."}));

    while (currentParent) {
      if (word === currentParent.val) {
        funcue.push(() => {
          this.setState({message: "Word already exists", inspecting: "", newNodeVal: ""});
        });
        this.startAnimation(funcue);
        return;
      } else if (word < currentParent.val) {
        currentParent = currentParent.children.low;
        if (currentParent) {
          newParentNode = currentParent;
          let inspecting = currentParent.val.slice();
          funcue.push(() => this.setState({inspecting}));
        }
      } else {
        currentParent = currentParent.children.high;
        if (currentParent) {
          newParentNode = currentParent;
          let inspecting = currentParent.val.slice();
          funcue.push(() => this.setState({inspecting}));
        }
      }
    }
    this.insertWord(word, newTree, newParentNode, funcue);
  }

  insertWord(word, newTree, newParentNode, funcue) {
    funcue.push(() => {
      newTree.addNewNode(word, newParentNode);
      this.setState({tree: newTree, newNodeVal: word, inspecting: "", message: "Inserting node..."});
    });
    this.startAnimation(funcue);
  }

  startAnimation(funcue) {
    const bstAnimation = window.setInterval(() => {
      if (funcue.length < 1) {
        window.clearInterval(bstAnimation);
        this.setState({disabled: false, newNodeVal: "", message: "Enter a word into the tree"});
      } else {
        funcue.shift()();
      }
    }, 1000);
  }

  toJSX(node) {
    if (!node) {
      return (
        <div className="bst">
          <div className="bst-parent"></div>
        </div>
      );
    }

    let wordClass = node.val === this.state.inspecting ? "bst-parent word active" : "bst-parent word";
    if (node.val === this.state.newNodeVal) wordClass = wordClass.concat(" active");

    return (
      <div className="bst">
        <div className={wordClass}>{node.val}</div>
        <div className="lines">
          <div className={`line ${node.children.low ? "visible" : "hidden"}`}></div>
          <div className={`line ${node.children.high ? "visible" : "hidden"}`}></div>
        </div>
        <div className="bst-children">
          {this.toJSX(node.children.low)}
          {this.toJSX(node.children.high)}
        </div>
      </div>
    );
  }

  render () {
    return (
      <main>
        <h3>Binary Search Tree</h3>
        <p>This binary search tree was built from a sorted array of words. The value for the parent node is taken from the word at the middle index
        of the array. Parent nodes have low and high child nodes, where the low child's value is the word at the middle index of all the words before
        the parent node's value, and the high child's value is the word at the middle index of all the words after the parent node's value.
        The tree is then built recursively, using the low and high child nodes as the next parent nodes.</p>
        <p>Inserting a new word into a binary search tree takes O(log(n)) time.</p>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleInput.bind(this)}
          onKeyPress={this.handleEnter.bind(this)}
          disabled={this.state.disabled}
          maxLength={8}
          />
        <button disabled={this.state.disabled} onClick={this.handleSubmit.bind(this)}>Add Word</button>
        <div className="search-status">
          <p>{this.state.message}</p>
        </div>
        {this.toJSX(this.state.tree.root)}
      </main>
    );
  }
}

export default BinaryTree;
