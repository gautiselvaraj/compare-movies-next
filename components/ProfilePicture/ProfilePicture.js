import React from 'react';
import PropTypes from 'prop-types';
import { getMovieProfilePath } from '~/utils/tmdbUtils';

const ProfilePicture = ({ size, path, alt, ...props }) =>
  path && (
    <img
      src={getMovieProfilePath(path, size)}
      alt={alt}
      width={size}
      {...props}
    />
  );

ProfilePicture.propTypes = {
  size: PropTypes.number.isRequired,
  path: PropTypes.string,
  alt: PropTypes.string.isRequired
};

export default ProfilePicture;
