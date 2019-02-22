import callApi from '../utils/ApiUtils';
import * as types from '../constants/ActionTypes';
import { filterAndSortSearchResults } from '../utils/CMUtils';
import { logSearch } from '../utils/GAUtils';

const searchRequest = query => ({
  type: types.SEARCH_REQUEST,
  query
});

const searchSuccess = results => ({
  type: types.SEARCH_SUCCESS,
  results
});

const searchFailure = errors => ({
  type: types.SEARCH_FAILURE,
  errors
});

export const searchMovies = query => {
  return async dispatch => {
    dispatch(searchRequest(query));
    if (query) {
      logSearch(query);
      try {
        const combainedResults = filterAndSortSearchResults(
          await Promise.all([
            callApi(`search/movie?include_adult=true&page=1&query=${query}`),
            callApi(`search/tv?include_adult=true&page=1&query=${query}`)
          ])
        );
        dispatch(searchSuccess(combainedResults));
      } catch (errors) {
        dispatch(searchFailure(errors));
      }
    } else {
      dispatch(searchSuccess(null));
    }
  };
};
