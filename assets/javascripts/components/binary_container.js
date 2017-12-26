import { connect } from 'react-redux';
import { receiveDictionary } from '../actions/dictionary_actions';
import Binary from './binary';

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionary.array || [],
    dictionaryLength: state.dictionary.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDictionary: (dictionary, structure) => dispatch(receiveDictionary(dictionary, structure)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Binary);
