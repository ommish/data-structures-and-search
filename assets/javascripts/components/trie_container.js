import { connect } from 'react-redux';
import Trie from './trie';
import { receiveDictionary } from '../actions/dictionary_actions';

const mapStateToProps= (state) => {
  return {
    dictionaryTrie: state.dictionary.trie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDictionary: (dictionary, structure) => dispatch(receiveDictionary(dictionary, structure)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trie);
