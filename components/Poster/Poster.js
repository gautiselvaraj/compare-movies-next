import React from 'react';
import PropTypes from 'prop-types';
import { getPosterPath } from '~/utils/tmdbUtils';

const Poster = ({ size, path, alt, ...props }) =>
  path && (
    <img src={getPosterPath(path, size)} alt={alt} width={size} {...props} />
  );

Poster.propTypes = {
  size: PropTypes.number.isRequired,
  path: PropTypes.string,
  alt: PropTypes.string.isRequired
};

export default Poster;
