import { Map, fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';

const initialState = Map({
  fetching: false,
  results: null,
  errors: null
});

export default function search(state = initialState, action) {
  switch (action.type) {
    case types.SUGGESTS_REQUEST:
      return state.withMutations(map => {
        map.set('fetching', true).set('errors', null);
      });

    case types.SUGGESTS_SUCCESS:
      return state.withMutations(map => {
        map
          .set('fetching', false)
          .set('results', fromJS(action.results))
          .set('errors', null);
      });

    case types.SUGGESTS_FAILURE:
      return state.withMutations(map => {
        map.set('fetching', false).set('errors', action.errors);
      });

    default:
      return state;
  }
}
