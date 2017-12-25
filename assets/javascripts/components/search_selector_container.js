import { connect } from 'react-redux';
import SearchSelector from './search_selector';
import { receiveSelection } from '../actions/selection_actions';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    receiveSelection: (selection) => dispatch(receiveSelection(selection)),
    receiveDictionary: ()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchSelector);
