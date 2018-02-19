import React from 'react';
import PropTypes from 'prop-types';
import './Vote.scss';

const Vote = ({
  vote,
  type = 'small',
  noRatingClass = '',
  noRatingText = false
}) =>
  !!vote ? (
    <div className={`vote ${type ? `vote--${type}` : ''}`}>
      <i className="fa fa-star vote__icon" />
      <span className="vote__count">{parseFloat(vote.toFixed(1))}</span>
    </div>
  ) : (
    noRatingText && <span className={noRatingClass}>No ratings yet</span>
  );

Vote.propTypes = {
  vote: PropTypes.number.isRequired,
  type: PropTypes.string,
  noRatingText: PropTypes.bool,
  noRatingClass: PropTypes.string
};

export default Vote;
