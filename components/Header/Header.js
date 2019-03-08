import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import SocialShares from '../SocialShares';
import SearchContainer from '../../containers/SearchContainer';
import Logo from '../Logo';
import './Header.scss';

const Header = ({ movies }) => {
  const shrinkHeader = movies && movies.length;

  return (
    <header className={`header ${shrinkHeader ? 'header--affixed' : ''}`}>
      <div className="header__logo">
        <Link href="/">
          <a className="header__link">
            <Logo animateLogo={!shrinkHeader} />
          </a>
        </Link>
      </div>
      <div className="header__search">
        <SearchContainer autoFocus={!shrinkHeader} />
      </div>
      {shrinkHeader && (
        <div className="header__shares">
          <SocialShares small movies={movies} />
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default Header;
