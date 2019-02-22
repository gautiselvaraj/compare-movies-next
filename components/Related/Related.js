import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logRelatedAdded } from '../../utils/GAUtils';
import Modal from '../Modal';
import Poster from '../Poster';
import TmdbVote from '../TmdbVote';
import { formatedDate } from '../../utils/CMUtils';
import { pushMovieToPath, getMovieUrlsFromPath } from '../../utils/UrlUtils';
import Link from 'next/link';
import './Related.scss';

class Related extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpened: false };
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.selectMovie = this.selectMovie.bind(this);
  }

  onClick() {
    this.props.onModalOpen();
    this.setState({ modalOpened: true });
  }

  onClose() {
    this.setState({ modalOpened: false });
    this.button.focus();
  }

  selectMovie(m) {
    logRelatedAdded(`${m.media_type}-${m.id}`);
    this.onClose();
  }

  render() {
    const { related, movieTitle, movieType, pathName } = this.props;
    const moviesFromUrl = getMovieUrlsFromPath(pathName).map(m =>
      parseInt(m.id, 10)
    );
    const uniqRelated = related.filter(m => !moviesFromUrl.includes(m.id));
    const type = movieType === 'tv' ? 'TV Shows' : 'Movies';

    if (!related.length) {
      return (
        <div className="related">
          <span className="related__no-related">
            No Related {type} Available
          </span>
        </div>
      );
    }

    return (
      <div className="related">
        <button
          className="related__button"
          onClick={this.onClick}
          ref={b => (this.button = b)}
        >
          <span className="related__link">Related {type}</span>
        </button>

        {this.state.modalOpened && (
          <Modal
            onClose={this.onClose}
            ariaLabel={`Related ${type} for ${movieTitle}`}
          >
            <h4 className="related__modal-heading">
              Related {type}{' '}
              <span className="hide-sm-and-down">for {movieTitle} </span>
            </h4>
            <ul className="related__list">
              {uniqRelated.map(m => (
                <li key={m.id} className="related__item">
                  <Link href="/compare" as={pushMovieToPath(m, pathName)}>
                    <a
                      className="related__add-button"
                      onClick={() => this.selectMovie(m)}
                    >
                      <div className="related__media">
                        <Poster
                          size={75}
                          path={m.poster_path}
                          alt={m.title || m.name}
                          className="relateds__image"
                        />
                      </div>
                      <div className="related__details">
                        <h5 className="related__title">{m.title || m.name}</h5>
                        <div>
                          <span className="related__date">
                            {formatedDate(m.release_date || m.first_air_date)}
                          </span>
                          <span className="related__vote">
                            <TmdbVote vote={m.vote_average} />
                          </span>
                        </div>
                        <div className="related__compare">
                          Add to comparison list
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </Modal>
        )}
      </div>
    );
  }
}

Related.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  movieType: PropTypes.string.isRequired,
  related: PropTypes.arrayOf(PropTypes.object).isRequired,
  onModalOpen: PropTypes.func.isRequired,
  pathName: PropTypes.string.isRequired
};

export default Related;
