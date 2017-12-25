import { RECEIVE_SELECTION } from '../actions/selection_actions';

const SearchSelectionReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_SELECTION:
    return action.selection;
    default:
    return oldState;
  }
};

export default SearchSelectionReducer;
