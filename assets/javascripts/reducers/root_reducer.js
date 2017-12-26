import { combineReducers } from 'redux';
import SearchSelectionReducer from './search_selection_reducer';
import DictionaryReducer from './dictionary_reducer';

const RootReducer = combineReducers({
  searchSelection: SearchSelectionReducer,
  dictionary: DictionaryReducer,
})

export default RootReducer;
