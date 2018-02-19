const PATH_DIVIDER = '-----';

const encodePaths = path => path.replace(/[^a-zA-Z0-9-_/]/g, '_');

const getPathParts = path => path.split('/').filter(ele => ele);

const getTypeIdFromPath = path => path.split(PATH_DIVIDER)[1];

const encodeAndPrefixPaths = paths => `/${encodePaths(paths.join('/'))}`;

export const pushMovieToPath = (path, movie) => {
  const pathParts = getPathParts(path);
  pathParts.unshift(
    `${(movie.title || movie.name).trim()}${PATH_DIVIDER}${movie.media_type}-${
      movie.id
    }`
  );
  return encodeAndPrefixPaths(pathParts);
};

export const removeMovieFromPath = (path, movie) =>
  encodeAndPrefixPaths(
    getPathParts(path).filter(
      part => getTypeIdFromPath(part) !== `${movie.media_type}-${movie.id}`
    )
  );

export const getMovieUrlsFromPath = path =>
  getPathParts(path).map(path => {
    if (/-{5}(tv|movie)-\d{0,10}/.test(path)) {
      return getTypeIdFromPath(path)
        .split('-')
        .join('/');
    } else {
      return null;
    }
  });
