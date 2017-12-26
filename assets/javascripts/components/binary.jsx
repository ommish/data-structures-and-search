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
      disabled: false,
    };
  }

  handleInput(e) {
    this.setState({searchQuery: e.target.value});
  }

  handleSubmit() {
    this.binarySearch(this.props.dictionary, this.state.searchQuery.toString());
    this.setState({disabled: true});
  }

  binarySearch(arr, target) {
    const funcue = [];
    let startIdx = 0;
    let endIdx = arr.length - 1;
    let probeIdx = Math.floor(arr.length / 2);

    while (startIdx <= endIdx) {

      const idx = probeIdx;
      funcue.push(() => {
        this.setState({inspecting: idx});
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
    }
    funcue.push(() => {
      this.setState({inspecting: null});
    });
    this.startBSearchAnimation(funcue);
    return null;
  }

  startBSearchAnimation(queue) {
    const bSearchInterval = window.setInterval(() => {
      if (typeof queue[0] === "function") {
        queue.shift()();
      } else if (queue.length < 1) {
        window.clearInterval(bSearchInterval)
        this.setState({disabled: false})
      }
    }, 1000)
  }
  
  componentDidMount() {
    this.props.receiveDictionary(dictionary, "array");
  }

  render() {
    const words = this.props.dictionary.map((word, i) => <Word key={i} index={i} word={word} inspecting={this.state.inspecting}/>);
    return (
    <section className="binary">
    <Link to="/">Return</Link>
      <h3>Binary Search</h3>
      <input disabled={this.state.disabled} type="text" value={this.state.searchQuery} onKeyPress={(e) => {if (e.key === "Enter") this.handleSubmit()}} onChange={this.handleInput.bind(this)}/>
      <button
        disabled={this.state.disabled}
        onClick={this.handleSubmit.bind(this)}>
        Start!
        </button>
        <ul className="word-list">
          {words}
        </ul>
    </section>
    );
  }
}

export default Binary;
