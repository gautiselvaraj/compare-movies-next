import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatedDate } from '../../utils/CMUtils';
import Modal from '../Modal';
import Poster from '../Poster';
import './SeasonEpisodes.scss';

class SeasonEpisodes extends Component {
  constructor(porps) {
    super(porps);
    this.state = { modalOpened: false };
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClick() {
    this.props.onModalOpen();
    this.setState({ modalOpened: true });
  }

  onClose() {
    this.setState({ modalOpened: false });
    this.button.focus();
  }

  render() {
    const { seasonCount, episodeCount, seasons, movieTitle } = this.props;

    return (
      <div className="seasons-episodes">
        <button
          className="seasons-episodes__button"
          onClick={this.onClick}
          ref={b => (this.button = b)}
          aria-label="Seasons & Episodes"
        >
          <span className="seasons-episodes__count">
            S{seasonCount}
            <span className="seasons-episodes__seperator">&mdash;</span>E
            {episodeCount}
          </span>
        </button>

        {this.state.modalOpened && (
          <Modal
            onClose={this.onClose}
            ariaLabel={`${movieTitle} Seasons Info`}
          >
            <h4 className="seasons-episodes__modal-heading">
              <span className="hide-sm-and-down">{movieTitle} </span>
              Season Info
            </h4>
            {seasons.map(s => (
              <div className="seasons-episodes__season" key={s.id}>
                <div className="seasons-episodes__poster">
                  <Poster
                    size={75}
                    path={s.poster_path}
                    alt={`Season-${s.season_number}`}
                    className="seasons-episodes__image"
                  />
                </div>
                <div className="seasons-episodes__misc">
                  <h5 className="seasons-episodes__season-number">
                    Season <strong>{s.season_number}</strong>
                  </h5>
                  <div className="seasons-episodes__episode-count">
                    Episodes: {s.episode_count}
                  </div>
                  <div className="seasons-episodes__air-date">
                    Air Date: {formatedDate(s.air_date, 'long')}
                  </div>
                </div>
              </div>
            ))}
          </Modal>
        )}
      </div>
    );
  }
}

SeasonEpisodes.propTypes = {
  seasonCount: PropTypes.number.isRequired,
  episodeCount: PropTypes.number.isRequired,
  seasons: PropTypes.arrayOf(PropTypes.object).isRequired,
  movieTitle: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired
};

export default SeasonEpisodes;
