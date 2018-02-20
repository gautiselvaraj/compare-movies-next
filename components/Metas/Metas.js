import React, { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { getPosterPath } from '~/utils/tmdbUtils';

class Meta extends Component {
  render() {
    const movies = this.props.movies;

    if (!movies || !movies.length) {
      return (
        <Helmet>
          <title>Compare Movies and TV Shows Instantly</title>
          <meta
            name="description"
            content="Compare movies and TV shows info like ratings, runtime, genres, release date, status, season & episodes details, cast, crew, overview and so on. Also watch movies and TV shows trailers and posters with ease."
          />
          <meta
            property="og:title"
            content="Compare Movies and TV Shows Instantly"
          />
          <meta
            property="og:description"
            content="Compare movies and TV shows info like ratings, runtime, genres, release date, status, season & episodes details, cast, crew, overview and so on. Also watch movies and TV shows trailers and posters with ease."
          />
          <meta
            property="og:image"
            content="https://www.comparemovies.info/social-logo.jpg"
          />
          <meta property="og:url" content="https://www.comparemovies.info" />
          <meta
            name="twitter:title"
            content="Compare Movies and TV Shows Instantly"
          />
          <meta
            name="twitter:description"
            content="Compare movies and TV shows info like ratings, runtime, genres, release date, status, season & episodes details, cast, crew, overview and so on. Also watch movies and TV shows trailers and posters with ease."
          />
          <meta
            name="twitter:image"
            content="https://www.comparemovies.info/social-logo.jpg"
          />
        </Helmet>
      );
    }

    const movieTitles = movies.map(m => m.title || m.name);
    const metaTitle = `${movieTitles.join(
      ' vs '
    )} - Compare Movies and TV Shows Instantly`;
    const metaDescription = `Comparing ${movieTitles.join(
      ', '
    )} ratings, runtime, genres, release date, status, season & episodes details, cast, crew, overview and so on.`;
    const metaImage = getPosterPath(movies[0].poster_path);
    const metaUrl = this.props.url;

    return (
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        {!!metaImage && <meta property="og:image" content={metaImage} />}
        <meta property="og:url" content={metaUrl} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {!!metaImage && <meta name="twitter:image" content={metaImage} />}
      </Helmet>
    );
  }
}

Meta.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default Meta;
