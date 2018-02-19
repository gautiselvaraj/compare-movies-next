import { IMAGE_HOSTNAME } from '~/constants/ApiConstants';

// TMDb available image size
const tmdbBackdropSizes = [300, 780, 1280];
const tmdbPosterSizes = [92, 154, 185, 342, 500, 780];
const tmdbLogoSizes = [45, 92, 154, 185, 300, 500];
const tmdbProfilePictureSizes = [45, 185, 632];

const nextHighestFromArray = (value, array) => {
  const arrayLastIndex = array.length - 1;

  // Return first array element if it is bigger than value
  if (array[0] >= value) {
    return array[0];
  }

  // Return last array element if it is lesser than value
  if (array[arrayLastIndex] <= value) {
    return array[arrayLastIndex];
  }

  return array.find(e => e > value);
};

const getPosterSize = size => nextHighestFromArray(size * 2, tmdbPosterSizes);

const getBackdropSize = size =>
  nextHighestFromArray(size * 2, tmdbBackdropSizes);

const getLogoSize = size => nextHighestFromArray(size * 2, tmdbLogoSizes);

const getProfileImageSize = size =>
  nextHighestFromArray(size * 2, tmdbProfilePictureSizes);

export const getPosterPath = (posterPath, size) =>
  !!posterPath && `${IMAGE_HOSTNAME}/w${getPosterSize(size)}${posterPath}`;

export const getBackdropPath = (backdropPath, size) =>
  !!backdropPath &&
  `${IMAGE_HOSTNAME}/w${getBackdropSize(size)}${backdropPath}`;

export const getLogoPath = (logoPath, size) =>
  !!logoPath && `${IMAGE_HOSTNAME}/w${getLogoSize(size)}${logoPath}`;

export const getMovieProfilePath = (profilePath, size) =>
  !!profilePath &&
  `${IMAGE_HOSTNAME}/w${getProfileImageSize(size)}${profilePath}`;
