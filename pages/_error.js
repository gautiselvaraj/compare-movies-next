import 'isomorphic-fetch';
import '~/styles/index.scss';
import '~/styles/errors.scss';

import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Helmet from 'react-helmet';
import initStore from '~/store';
import Layout from '~/components/Layout';
import Metas from '~/components/Metas';

class ErrorPage extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Layout>
        <Metas />
        <div className="error">
          <h3 className="error__heading">
            {this.props.statusCode === 404 ? (
              <span>This page could not be found!</span>
            ) : (
              <span>Something went wrong</span>
            )}
          </h3>
        </div>
      </Layout>
    );
  }
}

export default withRedux(initStore)(ErrorPage);
