import { getPathFromMovies } from './UrlUtils';

const getMovieTitles = movies => movies.map(m => m.title || m.name);

const siteUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://www.comparemovies.info'
    : 'http://localhost:3000';

const defaultTitle =
  'Confused about what to watch? Compare movies and TV shows and make informed decisions.';

const defaultDescription =
  'Watch trailers and compare stats like ratings from IMDB, TMDB, Rotten Tomatoes and Metacritic, runtime, genres, release date, status, season & episode details, cast, crew, overview and so on with ease.';

export const socialImg = `${siteUrl}/static/social-logo-v2.jpg`;

export const metaTitle = movies =>
  movies && movies.length
    ? `${getMovieTitles(movies).join(' vs ')} - Compare movies and TV Shows`
    : defaultTitle;

export const metaDescription = movies =>
  movies && movies.length
    ? `Comparing ${getMovieTitles(movies).join(
        ', '
      )} stats like ratings from IMDB, TMDB, Rotten Tomatoes and Metacritic, runtime, genres, release date, status, season & episode details, cast, crew, overview and so on with ease.`
    : defaultDescription;

export const metaUrl = movies =>
  movies && movies.length
    ? `${siteUrl}/c/${getPathFromMovies(movies)}`
    : siteUrl;

export const canonicalUrl = movies => {
  if (movies && movies.length) {
    const duplicatedMovies = [...movies];
    return `${siteUrl}/c/${getPathFromMovies(
      duplicatedMovies.sort((a, b) => a.id - b.id)
    )}`;
  }
  return siteUrl;
};
