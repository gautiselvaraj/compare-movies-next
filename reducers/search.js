import { Map, fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';

const initialState = Map({
  fetching: false,
  query: null,
  results: null,
  errors: null
});

export default function search(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_REQUEST:
      return state.withMutations(map => {
        map
          .set('fetching', true)
          .set('query', action.query)
          .set('results', null)
          .set('errors', null);
      });

    case types.SEARCH_SUCCESS:
      return state.withMutations(map => {
        map
          .set('fetching', false)
          .set('results', fromJS(action.results))
          .set('errors', null);
      });

    case types.SEARCH_FAILURE:
      return state.withMutations(map => {
        map
          .set('fetching', false)
          .set('results', null)
          .set('errors', action.errors);
      });

    default:
      return state;
  }
}
