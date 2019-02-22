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

export const getMoviePath = movie =>
  `${movie.media_type}-${movie.id}--${(movie.title || movie.name)
    .trim()
    .substring(0, 20)}`;

export const pushMovieToPath = (movie, path = Router.asPath) => {
  const pathParts = getPathParts(path);
  pathParts.unshift(getMoviePath(movie));
  return encodeAndPrefixPaths(pathParts);
};

export const removeMovieFromPath = movie =>
  encodeAndPrefixPaths(
    getPathParts(Router.asPath).filter(
      part => getTypeIdFromPath(part) !== `${movie.media_type}-${movie.id}`
    )
  );

export const getMovieUrlsFromPath = url =>
  getPathParts(url).map(path => {
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
