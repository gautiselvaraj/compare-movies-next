import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const siteUrl = 'https://www.comparemovies.info';
const defaultTitle = 'Compare Movies and TV Shows';
const defaultDescription =
  'Confused about what to watch? Compare movies and TV shows and make informed decisions. Watch trailers and compare stats like ratings from IMDB, TMDB, Rotten Tomatoes and Metacritic, runtime, genres, release date, status, season & episode details, cast, crew, overview and so on with ease.';
const socialImg = `${siteUrl}/static/social-logo-v2.jpg`;

const HeadContents = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage
}) => (
  <Head>
    <title key="title">{title}</title>
    <meta name="description" content={description} key="description" />
    <meta property="og:title" content={ogTitle} key="ogTitle" />
    <meta
      property="og:description"
      content={ogDescription}
      key="ogDescription"
    />
    <meta property="og:type" content="website" key="ogType" />
    <meta property="og:image" content={ogImage} key="ogImage" />
    <meta property="og:url" content={ogUrl} key="ogUrl" />
    <meta name="twitter:title" content={twitterTitle} key="twitterTitle" />
    <meta
      name="twitter:description"
      content={twitterDescription}
      key="twitterDescription"
    />
    <meta name="twitter:image" content={twitterImage} key="twitterImage" />
  </Head>
);

class Meta extends Component {
  render() {
    const movies = this.props.movies;

    if (!movies || !movies.length) {
      return (
        <HeadContents
          title={defaultTitle}
          description={defaultDescription}
          ogTitle={defaultTitle}
          ogDescription={defaultDescription}
          ogImage={socialImg}
          ogUrl={siteUrl}
          twitterTitle={defaultTitle}
          twitterDescription={defaultDescription}
          twitterImage={socialImg}
        />
      );
    }

    const movieTitles = movies.map(m => m.title || m.name);
    const metaTitle = `${movieTitles.join(
      ' vs '
    )} - Compare Movies and TV Shows`;
    const metaDescription = `Comparing ${movieTitles.join(
      ', '
    )} stats like ratings from IMDB, TMDB, Rotten Tomatoes and Metacritic, runtime, genres, release date, status, season & episode details, cast, crew, overview and so on with ease.`;
    const metaUrl = `${siteUrl}${this.props.pathName}`;

    return (
      <HeadContents
        title={metaTitle}
        description={metaDescription}
        ogTitle={metaTitle}
        ogDescription={metaDescription}
        ogImage={socialImg}
        ogUrl={metaUrl}
        twitterTitle={metaTitle}
        twitterDescription={metaDescription}
        twitterImage={socialImg}
      />
    );
  }
}

Meta.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default Meta;
