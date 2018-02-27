import { API_HOSTNAME } from '~/constants/ApiConstants';

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
