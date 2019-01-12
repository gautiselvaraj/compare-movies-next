import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import YouTubeEmbed from '../YouTubeEmbed';
import ImageGallery from '../ImageGallery';
import './MediaModal.scss';

class MediaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show
    };
    this.onClose = this.onClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.show) {
      this.setState({ show: nextProps.show });
    }
  }

  onClose() {
    this.setState({ show: false });
    this.props.onClose();
  }

  filterAndAddTypeToImageArray(arr, type) {
    return arr.map(p => Object.assign({}, p, { type }));
  }

  render() {
    const { movie, type } = this.props;
    let youTubekeys = [];
    let consolidatedImages;

    if (type === 'videos') {
      youTubekeys = movie.videos.results
        .filter(m => m.site === 'YouTube')
        .map(m => m.key);
    } else {
      consolidatedImages = [
        ...this.filterAndAddTypeToImageArray(movie.images.posters, 'poster'),
        ...this.filterAndAddTypeToImageArray(movie.images.backdrops, 'backdrop')
      ];
    }

    return (
      this.state.show && (
        <Modal
          onClose={this.onClose}
          modalClassName="media-modal"
          ariaLabel={`${movie.title || movie.name} ${type}`}
        >
          <h4 className="media-modal__heading">
            <span className="hide-sm-and-down">
              {movie.title || movie.name}{' '}
            </span>
            <span className="media-modal__type">{type}</span>
          </h4>
          {type === 'videos' ? (
            !!youTubekeys.length && <YouTubeEmbed youTubekeys={youTubekeys} />
          ) : (
            <ImageGallery images={consolidatedImages} />
          )}
        </Modal>
      )
    );
  }
}

MediaModal.propTypes = {
  movie: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  type: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default MediaModal;
