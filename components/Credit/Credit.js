import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from '../ProfilePicture';
import { getInitials } from '../../utils/CMUtils';
import './Credit.scss';

const Credit = ({ credit, imageSize }) => (
  <div className="credit">
    <div
      className={`credit__poster ${
        imageSize > 35 ? 'credit__poster--big' : ''
      }`}
      data-initials={getInitials(credit.name)}
    >
      <ProfilePicture
        size={imageSize}
        path={credit.profile_path}
        alt={`${credit.name} &mdash; ${credit.character || credit.job}`}
        className="credit__image"
      />
    </div>
    <div className="credit__misc">
      <div className="credit__name">{credit.name}</div>
      <div className="credit__role">{credit.character || credit.job}</div>
    </div>
  </div>
);

Credit.propTypes = {
  credit: PropTypes.object.isRequired,
  imageSize: PropTypes.number.isRequired
};

export default Credit;
