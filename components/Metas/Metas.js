import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { getPosterPath } from '~/utils/tmdbUtils';

const siteUrl = 'https://www.comparemovies.info';
const defaultTitle = 'Compare Movies and TV Shows Instantly';
const defaultDescription =
  'Compare movies and TV shows info like ratings, runtime, genres, release date, status, season & episodes details, cast, crew, overview and so on. Also watch movies and TV shows trailers and posters with ease.';
const socialImg = `${siteUrl}/static/social-logo.jpg`;

class Meta extends Component {
  render() {
    const movies = this.props.movies;

    if (!movies || !movies.length) {
      return (
        <Helmet>
          <title>{defaultTitle}</title>
          <me name="description" content={defaultDescription} />
          <meta property="og:title" content={defaultTitle} />
          <meta property="og:description" content={defaultDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={socialImg} />
          <meta property="og:url" content={siteUrl} />
          <meta name="twitter:title" content={defaultTitle} />
          <meta name="twitter:description" content={defaultDescription} />
          <meta name="twitter:image" content={socialImg} />
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
    const metaUrl = `${siteUrl}${this.props.url}`;

    return (
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={socialImg} />
        <meta property="og:url" content={metaUrl} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={socialImg} />
      </Helmet>
    );
  }
}

Meta.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default Meta;
