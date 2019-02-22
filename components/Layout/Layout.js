import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from '../../containers/HeaderContainer';
import Footer from '../Footer';
import './Layout.scss';

const Layout = ({ noFooter, pathName, children }) => (
  <div className="layout">
    <div className="layout__content">
      <HeaderContainer pathName={pathName} />
      {children}
    </div>
    {!noFooter && <Footer pathName={pathName} />}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pathName: PropTypes.string
};

export default Layout;
