import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import './Layout.scss';

const Layout = ({ noFooter, movies, children }) => (
  <div className="layout">
    <div className="layout__content">
      <Header movies={movies} />
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
