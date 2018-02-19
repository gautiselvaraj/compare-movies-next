import callApi from '~/utils/ApiUtils';
import * as types from '~/constants/ActionTypes';
import { addMovieType, addTvType } from '~/utils/CMUtils';

const suggestsRequest = () => ({
  type: types.SUGGESTS_REQUEST
});

const suggestsSuccess = results => ({
  type: types.SUGGESTS_SUCCESS,
  results
});

const suggestsFailure = results => ({
  type: types.SUGGESTS_FAILURE,
  results
});

export const getSuggestedMovies = () => {
  return async dispatch => {
    dispatch(suggestsRequest());
    try {
      const suggested = await Promise.all(
        [
          'movie/now_playing',
          'tv/airing_today',
          'movie/popular',
          'tv/popular',
          'movie/top_rated',
          'tv/top_rated'
        ].map(path => callApi(`${path}?`))
      );

      dispatch(
        suggestsSuccess([
          addMovieType(suggested[0].results.slice(0, 5)),
          addTvType(suggested[1].results.slice(0, 5)),
          addMovieType(suggested[2].results.slice(0, 5)),
          addTvType(suggested[3].results.slice(0, 5)),
          addMovieType(suggested[4].results.slice(0, 5)),
          addTvType(suggested[5].results.slice(0, 5))
        ])
      );
    } catch (errors) {
      dispatch(suggestsFailure(errors));
    }
  };
};
