import Router from 'next/router';

const encodePaths = path => path.replace(/[^a-zA-Z0-9-_/\:]/g, '_');

const getPathParts = path =>
  path === '/'
    ? []
    : path
        .replace('/c/', '')
        .split('/')
        .filter(ele => ele);

const getTypeIdFromPath = path => path.split('--')[0];

const encodeAndPrefixPaths = paths => `/c/${encodePaths(paths.join('/'))}`;

const getMoviePath = movie =>
  `${movie.media_type}-${movie.id}--${(movie.title || movie.name)
    .trim()
    .substring(0, 20)}`;

export const pushMovieToPath = (movie, path = Router.asPath) =>
  encodeAndPrefixPaths([getMoviePath(movie), ...getPathParts(path)]);

export const removeMovieFromPath = movie =>
  encodeAndPrefixPaths(
    getPathParts(Router.asPath).filter(
      part => getTypeIdFromPath(part) !== `${movie.media_type}-${movie.id}`
    )
  );

export const getMoviesFromPath = path =>
  getPathParts(path).map(path => {
    if (/^(tv|movie)-\d{0,10}/.test(path)) {
      const movieSplit = getTypeIdFromPath(path).split('-');
      return {
        id: movieSplit[1],
        media_type: movieSplit[0],
        path: movieSplit.join('/')
      };
    } else {
      return null;
    }
  });

export const getPathFromMovies = movies =>
  encodePaths(movies.map(m => getMoviePath(m)).join('/'));
