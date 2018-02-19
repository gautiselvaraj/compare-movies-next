import React from 'react';
import PropTypes from 'prop-types';
import { getBackdropPath } from '~/utils/tmdbUtils';

const Backdrop = ({ size, path, alt, ...props }) =>
  path && (
    <img src={getBackdropPath(path, size)} alt={alt} width={size} {...props} />
  );

Backdrop.propTypes = {
  size: PropTypes.number.isRequired,
  path: PropTypes.string,
  alt: PropTypes.string.isRequired
};

export default Backdrop;
