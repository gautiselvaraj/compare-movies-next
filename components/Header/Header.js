import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import SocialShares from '~/components/SocialShares';
import SearchContainer from '~/containers/SearchContainer';
import Logo from '~/components/Logo';
import './Header.scss';

const Header = ({ shrinkHeader }) => {
  const headerClass = shrinkHeader ? 'header--affixed' : '';

  return (
    <header className={`header ${headerClass}`}>
      <div className="header__logo">
        <Link href="/">
          <a className="header__link">
            <Logo animateLogo={!shrinkHeader} />
          </a>
        </Link>
      </div>
      <div className="header__search">
        <SearchContainer />
      </div>
      {shrinkHeader && (
        <div className="header__shares">
          <SocialShares small />
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  shrinkHeader: PropTypes.bool.isRequired
};

export default Header;
