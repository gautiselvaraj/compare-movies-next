import React from 'react';
import PropTypes from 'prop-types';
import SearchContainer from '~/containers/SearchContainer';
import Logo from '~/components/Logo';
import './Header.scss';

const Header = ({ shrinkHeader }) => {
  const headerClass = shrinkHeader ? 'header--affixed' : '';

  return (
    <header className={`header ${headerClass}`}>
      <div className="header__logo">
        <a href="/" className="header__link">
          <Logo animateLogo={!shrinkHeader} />
        </a>
      </div>
      <div className="header__search">
        <SearchContainer />
      </div>
    </header>
  );
};

Header.propTypes = {
  shrinkHeader: PropTypes.bool.isRequired
};

export default Header;
