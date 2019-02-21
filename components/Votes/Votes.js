import React from 'react';
import PropTypes from 'prop-types';
import './Votes.scss';
import { getMovieRatingByType, getAggregateRating } from '../../utils/CMUtils';

const Votes = ({ movie }) => {
  const { ratings, vote_average: vote } = movie;

  if (!ratings) {
    return null;
  }

  const imdbRating = getMovieRatingByType(ratings, 'Internet Movie Database');
  const tomatoRating = getMovieRatingByType(ratings, 'Rotten Tomatoes');
  const metacriticRating = getMovieRatingByType(ratings, 'Metacritic');

  return (
    <>
      <span>
        {vote && (
          <span className="vote vote__secondary tooltip" data-title="TMDB">
            <i className="fa fa-star vote__icon" />
            <span className="vote__count">{parseFloat(vote.toFixed(1))}</span>
          </span>
        )}
        {tomatoRating && (
          <span
            className="vote vote__tertiary tooltip"
            data-title="Rotten Tomatoes"
          >
            <span className="vote__count">{tomatoRating}</span>
          </span>
        )}
      </span>
      <span
        className="vote vote__primary tooltip"
        data-title="Aggregated Rating"
      >
        <span className="vote__icon">
          <i className="fa fa-star" />
          <i className="fa fa-star" />
          <i className="fa fa-star" />
        </span>
        <span className="vote__count">{getAggregateRating(movie)}</span>
      </span>
      <span>
        {imdbRating && (
          <span className="vote vote__secondary tooltip" data-title="IMDB">
            <i className="fa fa-imdb vote__icon" />
            <span className="vote__count">{imdbRating}</span>
          </span>
        )}
        {metacriticRating && (
          <span className="vote vote__tertiary tooltip" data-title="Metacritic">
            <span className="vote__count">{metacriticRating}/100</span>
          </span>
        )}
      </span>
    </>
  );
};

Votes.propTypes = { movie: PropTypes.object.isRequired };

export default Votes;
