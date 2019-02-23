import { Map, List, fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';

const initialState = Map({
  fetching: false,
  list: List(),
  errors: null
});

export default function search(state = initialState, action) {
  switch (action.type) {
    case types.MOVIE_REQUEST:
      return state.withMutations(map => {
        map.set('fetching', true).set('errors', null);
      });

    case types.MOVIE_SUCCESS:
      return state.withMutations(map => {
        map
          .set('fetching', false)
          .set('list', state.get('list').unshift(fromJS(action.result)))
          .set('errors', null);
      });

    default:
      return state;
  }
}
