import React from 'react';
import PropTypes from 'prop-types';
import './Logo.scss';

const Logo = ({ animateLogo }) => (
  <div className={`logo ${animateLogo ? 'logo--animate' : ''}`}>
    <div className={`logo-icons`}>
      <img
        src="/static/images/logo-animated-first.png"
        className="logo__image"
        alt="Compare"
      />
      <img
        src="/static/images/logo-animated-second.png"
        className="logo__image"
        alt="Movies"
      />
      <img
        src="/static/images/logo-animated-third.png"
        className="logo__image"
        alt="Logo"
      />
    </div>
    <h1 className="logo__text">Compare Movies</h1>
  </div>
);

Logo.propTypes = {
  animateLogo: PropTypes.bool.isRequired
};

export default Logo;
