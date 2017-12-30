import Hashmap from '../util/hashmap';
import React from 'react';
import { dictionary } from '../dictionary';
import { Link } from 'react-router-dom';


class HashmapDictionary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const dictionaryHashmap = new Hashmap();
    dictionary.forEach((word) => {
      dictionaryHashmap.addVal(word, true);
    });
    this.props.receiveDictionary(dictionaryHashmap, "hashmap");
  }

  render() {
    let words = [];
    if (this.props.dictionaryHashmap) {
      this.props.dictionaryHashmap.eachNode((node) => {
        words.push(<li key={node.key}>{node.key}</li>);
      });
    }
    return (
      <section className="trie">
        <Link to="/">Return</Link>
        <h3>Hashmap</h3>
        <ul>
        {words}
        </ul>
      </section>
    );
  }
}

export default HashmapDictionary;
