import React, { Component } from 'react';
import PropTypes from 'prop-types';
import langs from 'langs';
import Modal from '../Modal';
import './Languages.scss';

class Languages extends Component {
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
    const { translations, movieTitle, orginalLanguageCode } = this.props;
    const originalLanguage = langs.where('1', orginalLanguageCode);
    const languages = [
      {
        english_name: originalLanguage.name,
        name: originalLanguage.local,
        iso_639_1: originalLanguage['1']
      },
      ...translations
    ].filter(
      (lang, i, self) =>
        self.findIndex(l => l.iso_639_1 === lang.iso_639_1) === i
    );

    return (
      <div className="language">
        <button
          className="language__button"
          onClick={this.onClick}
          ref={b => (this.button = b)}
        >
          <span className="language__translated-count">
            Available in {languages.length} languages
          </span>
        </button>

        {this.state.modalOpened && (
          <Modal onClose={this.onClose} ariaLabel={`${movieTitle} Languages`}>
            <h4 className="language__modal-heading">
              <span className="hide-sm-and-down">{movieTitle} </span>
              Translated Languages
            </h4>
            <ul className="language__list">
              {languages.map(t => (
                <li className="language__item">
                  <div className="language__translation" key={t.iso_639_1}>
                    {t.name} &mdash; {t.english_name}
                  </div>
                </li>
              ))}
            </ul>
          </Modal>
        )}
      </div>
    );
  }
}

Languages.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  translations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onModalOpen: PropTypes.func.isRequired,
  orginalLanguageCode: PropTypes.string.isRequired
};

export default Languages;
