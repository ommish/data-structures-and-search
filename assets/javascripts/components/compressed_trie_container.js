import { connect } from 'react-redux';
import CompressedTrie from './compressed_trie';
import { receiveDictionary } from '../actions/dictionary_actions';

const mapStateToProps= (state) => {
  return {
    dictionaryTrie: state.dictionary.compressedTrie,
    dictionaryLength: state.dictionary.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDictionary: (dictionary, structure) => dispatch(receiveDictionary(dictionary, structure)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompressedTrie);
