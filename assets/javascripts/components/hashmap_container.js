import { connect } from 'react-redux';
import Hashmap from './hashmap';
import { receiveDictionary } from '../actions/dictionary_actions';

const mapStateToProps= (state) => {
  return {
    dictionaryHashmap: state.dictionary.hashmap,
    dictionaryLength: state.dictionary.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDictionary: (dictionary, structure) => dispatch(receiveDictionary(dictionary, structure)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hashmap);
