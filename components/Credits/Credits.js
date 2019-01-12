import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Credit from '../Credit';
import './Credits.scss';

class Credits extends Component {
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
    const { type, credits, movieTitle } = this.props;

    return (
      <div className="credits">
        <h5 className="credits__heading">{type}</h5>
        {credits.slice(0, 5).map((c, i) => (
          <Credit key={c.credit_id} credit={c} imageSize={35} />
        ))}
        <button
          className="credits__button"
          onClick={this.onClick}
          ref={b => (this.button = b)}
        >
          more...
        </button>

        {this.state.modalOpened && (
          <Modal onClose={this.onClose} ariaLabel={`${movieTitle} ${type}`}>
            <h4 className="credits__modal-heading">
              <span className="hide-sm-and-down">{movieTitle} </span>
              <span className="credits__modal-type">{type}</span>
            </h4>
            {credits.map((c, i) => (
              <Credit key={c.credit_id} credit={c} imageSize={50} />
            ))}
          </Modal>
        )}
      </div>
    );
  }
}

Credits.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  credits: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired
};

export default Credits;
