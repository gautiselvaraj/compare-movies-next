import React from 'react';
import PropTypes from 'prop-types';
import './MiscVotes.scss';

const getRating = (ratings, source) => {
  let filteredRating = ratings.find(rating => rating.Source === source);
  return filteredRating ? filteredRating.Value.split('/')[0] : false;
};

const MiscVotes = ({ ratings }) => {
  if (!ratings) {
    return null;
  }

  const imdbRating = getRating(ratings, 'Internet Movie Database');
  const tomatoRating = getRating(ratings, 'Rotten Tomatoes');
  const metacriticRating = getRating(ratings, 'Metacritic');

  return [
    <span className="misc-vote misc-vote__secondary" key="1">
      {tomatoRating && (
        <span
          className="misc-vote__tomato tooltip"
          data-title="Rotten Tomatoes"
        >
          <span className="misc-vote__count">{tomatoRating}</span>
        </span>
      )}
      {metacriticRating && (
        <span className="misc-vote__metacritic tooltip" data-title="Metacritic">
          <span className="misc-vote__count">{metacriticRating}/100</span>
        </span>
      )}
    </span>,
    imdbRating && (
      <span
        className="misc-vote misc-vote__imdb tooltip"
        data-title="IMDB"
        key="2"
      >
        <i className="fa fa-imdb misc-vote__icon" />
        <span className="misc-vote__count">{imdbRating}</span>
      </span>
    )
  ];
};

MiscVotes.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.object)
};

export default MiscVotes;
