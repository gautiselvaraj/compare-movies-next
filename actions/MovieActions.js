import Router from 'next/router';
import callApi, { getOmdbDetails } from '../utils/ApiUtils';
import { removeMovieFromPath, getMoviesFromPath } from '../utils/UrlUtils';
import { checkIfMovieInList } from '../utils/CMUtils';
import * as types from '../constants/ActionTypes';
import { logMovieAdd, logMovieRemove, logMovieFailed } from '../utils/GAUtils';

const relatedAappendToResponse =
  'append_to_response=videos,images,translations,credits,similar,recommendations,external_ids';

const movieRequest = () => ({
  type: types.MOVIE_REQUEST
});

const movieSuccess = result => {
  logMovieAdd(`${result.media_type}-${result.id}`);

  return {
    type: types.MOVIE_SUCCESS,
    result
  };
};

export const removeMovie = movie => {
  logMovieRemove(`${movie.media_type}-${movie.id}`);
  const asPath = removeMovieFromPath(movie);
  if (asPath === '/c/') {
    Router.push('/');
  } else {
    Router.push('/compare', asPath);
  }
};

export const fetchMoviesFromUrl = url => {
  return async (dispatch, getState) => {
    const state = getState();
    const moviesInState = state.getIn(['movies', 'list']);
    let moviesFromUrl = getMoviesFromPath(url);
    moviesFromUrl = moviesFromUrl.filter(
      movie => !checkIfMovieInList(movie, moviesInState)
    );
    moviesFromUrl = moviesFromUrl.filter(movie => movie.path);

    if (moviesFromUrl.length) {
      dispatch(movieRequest());

      let responses = await Promise.all(
        moviesFromUrl.map(movie =>
          callApi(`${movie.path}?${relatedAappendToResponse}`)
        )
      );

      // Get OMDB details
      responses = await Promise.all(
        responses.map(async response => {
          if (response.external_ids && response.external_ids.imdb_id) {
            const omdbResponse = await getOmdbDetails(
              response.external_ids.imdb_id
            );
            return { ...response, ...omdbResponse };
          } else {
            return response;
          }
        })
      );

      responses.forEach((response, i) => {
        dispatch(
          movieSuccess(
            Object.assign({}, response, {
              media_type: moviesFromUrl[i].media_type
            })
          )
        );
      });
    }
  };
};
