import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from '../../containers/HeaderContainer';
import Footer from '../Footer';
import './Layout.scss';

const Layout = ({ noFooter, movies, children }) => (
  <div className="layout">
    <div className="layout__content">
      <HeaderContainer movies={movies} />
      {children}
    </div>
    {!noFooter && <Footer />}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pathName: PropTypes.string
};

export default Layout;
