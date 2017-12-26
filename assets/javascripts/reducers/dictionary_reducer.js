import { RECEIVE_DICTIONARY } from '../actions/dictionary_actions';
import { merge } from 'lodash';

const DictionaryReducer = (state = {}, action) => {
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_DICTIONARY:
    newState[action.structure] = action.dictionary;
    return newState;
    default:
    return state;
  }
};

export default DictionaryReducer;
