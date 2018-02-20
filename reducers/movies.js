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

    case types.MOVIE_FAILURE:
      return state.withMutations(map => {
        map.set('fetching', false).set('errors', action.errors);
      });

    case types.MOVIE_REMOVE:
      return state.set(
        'list',
        state
          .get('list')
          .filter(
            movie =>
              movie.get('id') !== action.movie.id ||
              movie.get('media_type') !== action.movie.media_type
          )
      );

    case types.MOVIE_REMOVE_ALL:
      return state.set('list', List());

    default:
      return state;
  }
}
