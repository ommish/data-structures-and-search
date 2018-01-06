import React from 'react';
import { dictionary } from '../dictionary';
import Word from './word';
import { Link } from 'react-router-dom';

class Binary extends React.Component {

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
    this.binarySearch(dictionary, this.state.searchQuery.toString().toLowerCase());
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
    const words = dictionary.map((word, i) => <Word key={i} index={i} word={word} inspecting={this.state.inspecting} startIdx={this.state.currentStart} endIdx={this.state.currentEnd}/>);
    return (
    <section className="binary">
    <Link to="/">Return</Link>
      <h3>Binary Search</h3>
      <p>You will see the word at the probe index highlighted as the array is traversed.</p>
      <input disabled={this.state.disabled} type="text" value={this.state.searchQuery} onKeyPress={(e) => {if (e.key === "Enter") this.handleSubmit()}} onChange={this.handleInput.bind(this)}/>
      <button
        disabled={this.state.disabled}
        onClick={this.handleSubmit.bind(this)}>
        Start!
        </button>
        <h4>{this.state.searching}</h4>
        <h4>{this.state.checked} / {dictionary.length} words checked</h4>
        <ul className="word-list">
          {words}
        </ul>
    </section>
    );
  }
}

export default Binary;
