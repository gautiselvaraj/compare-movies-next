import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalClosing: false };
    this.onClose = this.onClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.el = document.createElement('div');
    this.modalRoot = null;
  }

  componentWillMount() {
    this.closeTimeout = null;
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentDidMount() {
    this.modalRoot = document.getElementById('modal_portal');
    this.modalRoot.appendChild(this.el);
    document.documentElement.classList.add('body__modal--opened');
    this.modal.focus();
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
    document.documentElement.classList.remove('body__modal--opened');
    clearTimeout(this.closeTimeout);
    document.removeEventListener('keydown', this.onKeyDown);
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

  onClose() {
    this.setState({ modalClosing: true });
    // Set timeout so modal closing animations can happen
    this.closeTimeout = setTimeout(this.props.onClose, 500);
  }

  render() {
    const modalClosingClass = this.state.modalClosing ? 'modal--closing' : '';
    const { modalClassName, children, ariaLabel } = this.props;

    return createPortal(
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
      </div>,
      this.el
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
