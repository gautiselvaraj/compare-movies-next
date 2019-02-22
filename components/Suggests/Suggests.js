import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logHomeMovieAdded } from '../../utils/GAUtils';
import Poster from '../Poster';
import TmdbVote from '../TmdbVote';
import { formatedDate } from '../../utils/CMUtils';
import './Suggests.scss';
import { pushMovieToPath } from '../../utils/UrlUtils';
import Link from 'next/link';

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
  }

  componentDidMount() {
    const { getSuggestedMovies, suggests } = this.props;
    if (!suggests) {
      getSuggestedMovies();
    }
  }

  render() {
    const { pathName, suggests } = this.props;

    if (!suggests) {
      return null;
    }

    return (
      <div className="suggests">
        <h3 className="suggests__heading">or choose from the lists below</h3>
        <div className="suggests__container">
          {suggests.map((suggest, i) => (
            <section key={i} className="suggests__list">
              <h5 className="suggests__list-title">{this.headings[i]}</h5>
              <ul className="suggests__list-items">
                {suggest.map((movie, j) => (
                  <li className="suggests__list-item" key={movie.id}>
                    <Link href="/compare" as={pushMovieToPath(movie, pathName)}>
                      <a
                        className="suggests__list-button"
                        onClick={() =>
                          logHomeMovieAdded(`${movie.media_type}-${movie.id}`)
                        }
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
                              <TmdbVote vote={movie.vote_average} />
                            </span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  }
}

Suggests.propTypes = {
  suggests: PropTypes.arrayOf(PropTypes.array),
  getSuggestedMovies: PropTypes.func.isRequired,
  pathName: PropTypes.string.isRequired
};

export default Suggests;
