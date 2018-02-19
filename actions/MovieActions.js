import Router from 'next/router';
import callApi from '~/utils/ApiUtils';
import {
  pushMovieToPath,
  removeMovieFromPath,
  getMovieUrlsFromPath
} from '~/utils/UrlUtils';
import { checkIfMovieInList } from '~/utils/CMUtils';
import * as types from '~/constants/ActionTypes';
import { logMovieAdd, logMovieRemove, logMovieFailed } from '~/utils/GAUtils';

const relatedAappendToResponse =
  'append_to_response=videos,images,translations,credits,similar,recommendations';

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

const movieFailure = errors => {
  logMovieFailed(errors);

  return {
    type: types.MOVIE_FAILURE,
    errors
  };
};

const movieRemove = movie => {
  logMovieRemove(`${movie.media_type}-${movie.id}`);

  return {
    type: types.MOVIE_REMOVE,
    movie
  };
};

export const removeMovie = movie => {
  return dispatch => {
    dispatch(movieRemove(movie));
    Router.push('/compare', removeMovieFromPath(movie), { shallow: true });
  };
};

export const addMovie = movie => {
  return async (dispatch, getState) => {
    const state = getState();
    let response;

    if (!checkIfMovieInList(movie, state.getIn(['movies', 'list']))) {
      dispatch(movieRequest());
      try {
        response = await callApi(
          `${movie.media_type}/${movie.id}?${relatedAappendToResponse}`
        );
        dispatch(
          movieSuccess(
            Object.assign({}, response, { media_type: movie.media_type })
          )
        );
      } catch (errors) {
        dispatch(movieFailure(errors));
      }
      console.log(pushMovieToPath(movie));
      Router.push('/compare', pushMovieToPath(movie), { shallow: true });
    }
  };
};

export const fetchMoviesFromUrl = () => {
  return async dispatch => {
    let moviesFromUrl = getMovieUrlsFromPath();
    moviesFromUrl.reverse();
    moviesFromUrl = moviesFromUrl.filter(path => path);
    if (moviesFromUrl.length) {
      dispatch(movieRequest());
      const responses = await Promise.all(
        moviesFromUrl.map(url => callApi(`${url}?${relatedAappendToResponse}`))
      );
      responses.forEach((response, i) => {
        dispatch(
          movieSuccess(
            Object.assign({}, response, {
              media_type: moviesFromUrl[i].split('/')[0]
            })
          )
        );
      });
    }
  };
};
