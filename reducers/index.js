import { combineReducers } from 'redux-immutable';
import search from './search';
import movies from './movies';
import suggests from './suggests';

export default combineReducers({
  search,
  movies,
  suggests
});
