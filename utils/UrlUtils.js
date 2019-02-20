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

export const pushMovieToPath = movie => {
  const pathParts = getPathParts(Router.asPath);
  pathParts.unshift(
    `${movie.media_type}-${movie.id}--${(movie.title || movie.name)
      .trim()
      .substring(0, 20)}`
  );
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
      return getTypeIdFromPath(path)
        .split('-')
        .join('/');
    } else {
      return null;
    }
  });
