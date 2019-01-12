import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import Poster from '../Poster';
import Backdrop from '../Backdrop';
import './ImageGallery.scss';

class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = { openedImageIndex: 0, openedImageLoaded: false };

    this.thumbClick = this.thumbClick.bind(this);
    this.openedImageLoaded = this.openedImageLoaded.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.openPrev = this.openPrev.bind(this);
    this.openNext = this.openNext.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  componentDidUpdate() {
    const { thumbsContainer, highlightedThumb } = this;
    if (thumbsContainer && highlightedThumb) {
      const parentLeft = thumbsContainer.scrollLeft;
      const parentWidth = thumbsContainer.offsetWidth;
      const parentRight = parentLeft + parentWidth;
      const childLeft = highlightedThumb.offsetLeft;
      const childWidth = highlightedThumb.offsetWidth;
      const childRight = childLeft + childWidth;

      if (parentLeft > childLeft || childRight > parentRight) {
        const scrollPosition =
          parentLeft > childLeft
            ? childLeft
            : childLeft - parentWidth + childWidth;
        thumbsContainer.scroll({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  openNext() {
    let newOpenedImageIndex;
    const openedImageIndex = this.state.openedImageIndex;
    const images = this.props.images;

    newOpenedImageIndex = openedImageIndex + 1;
    if (newOpenedImageIndex >= images.length) {
      newOpenedImageIndex = 0;
    }
    this.setState({
      openedImageIndex: newOpenedImageIndex,
      openedImageLoaded: false
    });
  }

  openPrev() {
    let newOpenedImageIndex;
    const openedImageIndex = this.state.openedImageIndex;
    const images = this.props.images;

    newOpenedImageIndex = openedImageIndex - 1;
    if (newOpenedImageIndex < 0) {
      newOpenedImageIndex = images.length - 1;
    }
    this.setState({
      openedImageIndex: newOpenedImageIndex,
      openedImageLoaded: false
    });
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        this.openNext();
        event.preventDefault();
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        this.openPrev();
        event.preventDefault();
        break;

      default:
        break;
    }
  }

  thumbClick(i) {
    if (i !== this.state.openedImageIndex) {
      this.setState({ openedImageIndex: i, openedImageLoaded: false });
    }
  }

  openedImageLoaded() {
    this.setState({ openedImageLoaded: true });
  }

  render() {
    const { openedImageIndex, openedImageLoaded } = this.state;
    const images = this.props.images;
    const openedImage = images[openedImageIndex];

    return (
      <div className="image-gallery">
        <div className="image-gallery__opened">
          {!openedImageLoaded && (
            <div className="image-gallery__loader">
              <Loader shortLoader={false} />
            </div>
          )}
          <div
            className="image-gallery__opened-container"
            style={{ opacity: openedImageLoaded ? 1 : 0 }}
          >
            {openedImage.type === 'poster' ? (
              <Poster
                key={openedImage.file_path}
                onLoad={this.openedImageLoaded}
                className="image-gallery__opened-image"
                size={400 * openedImage.aspect_ratio}
                path={openedImage.file_path}
                alt={`${openedImage.type} ${openedImage.iso_639_1}`}
              />
            ) : (
              <Backdrop
                key={openedImage.file_path}
                onLoad={this.openedImageLoaded}
                className="image-gallery__opened-image"
                size={400 * openedImage.aspect_ratio}
                path={openedImage.file_path}
                alt={`${openedImage.type} ${openedImage.iso_639_1}`}
              />
            )}
          </div>
          <button
            className="image-gallery__opened-prev"
            onClick={this.openPrev}
          >
            <i className="fa fa-angle-left fa-4x" />
          </button>
          <button
            className="image-gallery__opened-next"
            onClick={this.openNext}
          >
            <i className="fa fa-angle-right fa-4x" />
          </button>
        </div>
        <div
          className="image-gallery__thumbs"
          ref={c => (this.thumbsContainer = c)}
        >
          {images.map((image, i) => (
            <button
              onClick={() => this.thumbClick(i)}
              key={image.file_path}
              className={`image-gallery__thumbs-button ${
                i === openedImageIndex
                  ? 'image-gallery__thumbs-button--active'
                  : ''
              }`}
              ref={t => {
                if (i === openedImageIndex) {
                  this.highlightedThumb = t;
                }
              }}
            >
              {image.type === 'poster' ? (
                <Poster
                  className="image-gallery__thumb"
                  size={100 * image.aspect_ratio}
                  path={image.file_path}
                  alt={`${image.type} ${image.iso_639_1}`}
                />
              ) : (
                <Backdrop
                  className="image-gallery__thumb"
                  size={100 * image.aspect_ratio}
                  path={image.file_path}
                  alt={`${image.type} ${image.iso_639_1}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ImageGallery;
