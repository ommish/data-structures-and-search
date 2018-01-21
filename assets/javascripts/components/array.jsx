import React from 'react';
import { longDictionary } from '../long_dictionary';
import Word from './word';
import { Link } from 'react-router-dom';

class ArrayComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      inspecting: null,
      currentStart: null,
      currentEnd: null,
      disabled: false,
      checked: 0,
      searching: "Enter a word to search!"
    };
  }

  handleInput(e) {
    this.setState({searchQuery: e.target.value, checked: 0, inspecting: null, searching: "Enter a word to search!"});
  }

  handleSubmit() {
    this.setState({disabled: true, inspecting: null, currentStart: null, currentEnd: null, checked: 0, searching: "Searching..."});
    this.binarySearch(longDictionary, this.state.searchQuery.toLowerCase());
  }

  binarySearch(arr, target) {
    const funcue = [];
    let startIdx = 0;
    let endIdx = arr.length - 1;
    let probeIdx = Math.floor(arr.length / 2);
    let checked = 1;

    while (startIdx <= endIdx) {

      const idx = probeIdx;
      const checkedWords = checked;
      const currentStart = startIdx;
      const currentEnd = endIdx;
      const searching = target === arr[probeIdx] ? "Found!" : "Searching..."
      funcue.push(() => {
        this.setState({inspecting: idx, currentEnd, currentStart, checked: checkedWords, searching});
      });

      if (target === arr[probeIdx]) {
        this.startBSearchAnimation(funcue);
        return probeIdx;
      } else if (target < arr[probeIdx]) {
        endIdx = probeIdx - 1;
        probeIdx = startIdx +  Math.floor((endIdx - startIdx) / 2);
      } else {
        startIdx = probeIdx + 1;
        probeIdx = startIdx +  Math.floor((endIdx - startIdx) / 2);
      }
      checked++;
    }
    funcue.push(() => {
      this.setState({inspecting: null, currentStart: null, currentEnd: null, searching: "Not found!"});
    });
    this.startBSearchAnimation(funcue);
    return null;
  }

  startBSearchAnimation(queue) {
    const bSearchInterval = window.setInterval(() => {
      queue.shift()();
      if (queue.length < 1) {
        window.clearInterval(bSearchInterval)
        this.setState({disabled: false})
      }
    }, 1000)
  }

  render() {
    const words = longDictionary.map((word, i) => <Word key={i} index={i} word={word} inspecting={this.state.inspecting} startIdx={this.state.currentStart} endIdx={this.state.currentEnd}/>);
    return (
    <main className="binary">
      <h3>Array</h3>
      <h4>Binary Search</h4>
      <p>This is a demonstration of how an array would be searched using binary search. The section being searched will be highlighted, and the word at the probe index will be colored red.</p>
      <input disabled={this.state.disabled} type="text" value={this.state.searchQuery} onKeyPress={(e) => {if (e.key === "Enter" && this.state.searchQuery) this.handleSubmit()}} onChange={this.handleInput.bind(this)}/>
      <button
        disabled={!this.state.searchQuery || this.state.disabled}
        onClick={this.handleSubmit.bind(this)}>
        Start!
      </button>
      <div className="search-status">
        <p>{this.state.searching}</p>
        <p>{this.state.checked} / {longDictionary.length} words checked</p>
      </div>
      <ul className="word-list">
        {words}
      </ul>
    </main>
    );
  }
}

export default ArrayComp;
