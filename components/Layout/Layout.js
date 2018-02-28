import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from '~/containers/HeaderContainer';
import Footer from '~/components/Footer';
import './Layout.scss';

const Layout = ({ noFooter, children }) => (
  <div className="layout">
    <div className="layout__content">
      <HeaderContainer />
      {children}
    </div>
    {!noFooter && <Footer />}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
