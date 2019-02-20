import { API_HOSTNAME } from '../constants/ApiConstants';

export default async (path, options) => {
  const response = await fetch(
    `${API_HOSTNAME}/${path}&api_key=${process.env.TMDB_API_KEY}`,
    options
  );
  if (response.status >= 200 && response.status < 300) {
    return await response.json();
  } else {
    const errorResponse = await response.json();
    throw errorResponse.status_message || errorResponse.errors;
  }
};

export const getOmdbDetails = async imdbID => {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://www.comparemovies.info'
      : `http://localhost:${process.env.PORT || 3000}`;
  const response = await fetch(`${baseUrl}/api/omdb_details/${imdbID}`);
  if (response.status >= 200 && response.status < 300) {
    return await response.json();
  } else {
    const errorResponse = await response.json();
    throw errorResponse.status_message || errorResponse.errors;
  }
};
