import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalClosing: false };
    this.onClose = this.onClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'Escape':
        this.onClose();
        break;
      default:
        break;
    }
  }

  onClick(event) {
    if (this.modalInner && !this.modalInner.contains(event.target)) {
      this.onClose();
    }
  }

  componentWillMount() {
    this.closeTimeout = null;
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentDidMount() {
    document.body.classList.add('body__modal--opened');
    this.modal.focus();
  }

  componentWillUnmount() {
    document.body.classList.remove('body__modal--opened');
    window.clearTimeout(this.closeTimeout);
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onClose() {
    this.setState({ modalClosing: true });
    // Set timeout so modal closing animations can happen
    this.closeTimeout = setTimeout(this.props.onClose, 500);
  }

  render() {
    const modalClosingClass = this.state.modalClosing ? 'modal--closing' : '';
    const { modalClassName, children, ariaLabel } = this.props;

    return (
      <div
        className={`modal ${
          modalClassName ? modalClassName : ''
        } ${modalClosingClass}`}
        role="dialog"
        aria-label={ariaLabel}
        tabIndex={-1}
        ref={m => (this.modal = m)}
      >
        <div className="modal__backdrop" onClick={this.onClick} role="document">
          <button
            onClick={this.onClose}
            className="modal__close"
            title="Close Modal"
          >
            &times;
          </button>
          <div className="modal__inner">
            <div className="modal__content" ref={m => (this.modalInner = m)}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  modalClassName: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired
};

export default Modal;
