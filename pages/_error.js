import '../styles/index.scss';
import '../styles/errors.scss';

import React, { Component } from 'react';
import Layout from '../components/Layout';

export default class ErrorPage extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Layout>
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
