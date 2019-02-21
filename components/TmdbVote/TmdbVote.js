import React from 'react';
import PropTypes from 'prop-types';
import './TmdbVote.scss';

const TmdbVote = ({ vote, ...otherProps }) =>
  !!vote && (
    <div className="tmdb-vote" {...otherProps}>
      <i className="fa fa-star tmdb-vote__icon" />
      <span className="tmdb-vote__count">{parseFloat(vote.toFixed(1))}</span>
    </div>
  );

TmdbVote.propTypes = { vote: PropTypes.number.isRequired };

export default TmdbVote;
