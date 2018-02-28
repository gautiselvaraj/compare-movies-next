import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logHomeMovieAdded } from '~/utils/GAUtils';
import Poster from '~/components/Poster';
import Vote from '~/components/Vote';
import { formatedDate } from '~/utils/CMUtils';
import './Suggests.scss';

class Suggests extends Component {
  constructor() {
    super();
    this.headings = [
      'Movies Now Playing',
      'TV Shows Airing Today',
      'Popular Movies',
      'Popular TV Shows',
      'Top Rated Movies',
      'Top Rated TV Shows'
    ];
    this.selectMovie = this.selectMovie.bind(this);
  }

  componentDidMount() {
    const { getSuggestedMovies, suggests } = this.props;
    if (!suggests) {
      getSuggestedMovies();
    }
  }

  selectMovie(e, movie) {
    if (e.currentTarget.disabled) {
      return false;
    }
    e.currentTarget.disabled = true;
    logHomeMovieAdded(`${movie.media_type}-${movie.id}`);
    this.props.onMovieSelect(movie);
  }

  render() {
    const suggests = this.props.suggests;

    if (!suggests) {
      return null;
    }

    return (
      <div className="suggests">
        <h3 className="suggests__heading">or choose from the lists below</h3>
        <div className="suggests__container">
          {suggests.map((suggest, i) => (
            <div key={i} className="suggests__list">
              <h5 className="suggests__list-title">{this.headings[i]}</h5>
              {suggest.map((movie, j) => (
                <div className="suggests__list-item" key={movie.id}>
                  <button
                    key={movie.id}
                    className="suggests__list-button"
                    onClick={e => this.selectMovie(e, movie)}
                  >
                    <div className="suggests__list-media">
                      <Poster
                        size={35}
                        path={movie.poster_path}
                        alt={movie.title || movie.name}
                        className="suggests__list-image"
                      />
                    </div>
                    <div className="suggests__list-details">
                      <h5 className="suggests__list-sub-title">
                        {movie.title || movie.name}
                      </h5>
                      <div>
                        <span className="suggests__list-date">
                          {formatedDate(
                            movie.release_date || movie.first_air_date
                          )}
                        </span>
                        <span className="suggests__list-vote">
                          <Vote vote={movie.vote_average} />
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Suggests.propTypes = {
  suggests: PropTypes.arrayOf(PropTypes.array),
  getSuggestedMovies: PropTypes.func.isRequired,
  onMovieSelect: PropTypes.func.isRequired
};

export default Suggests;
