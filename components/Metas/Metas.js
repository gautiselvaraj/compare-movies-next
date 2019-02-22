import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  socialImg,
  metaTitle,
  metaDescription,
  metaUrl,
  canonicalUrl
} from '../../utils/metas';

const Meta = ({ movies }) => {
  const title = metaTitle(movies);
  const description = metaDescription(movies);
  const url = metaUrl(movies);

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <meta property="og:title" content={title} key="ogTitle" />
      <meta
        property="og:description"
        content={description}
        key="ogDescription"
      />
      <meta property="og:type" content="website" key="ogType" />
      <meta property="og:image" content={socialImg} key="ogImage" />
      <meta property="og:url" content={url} key="ogUrl" />
      <meta name="twitter:title" content={title} key="twitterTitle" />
      <meta
        name="twitter:description"
        content={description}
        key="twitterDescription"
      />
      <meta name="twitter:image" content={socialImg} key="twitterImage" />
      <link rel="canonical" href={canonicalUrl(movies)} key="canonical" />
    </Head>
  );
};

Meta.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default Meta;
