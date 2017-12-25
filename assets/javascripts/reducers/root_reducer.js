import { combineReducers } from 'redux';
import SearchSelectionReducer from './search_selection_reducer';

const RootReducer = combineReducers({
  characters: SearchSelectionReducer,
})

export default RootReducer;
