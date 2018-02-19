import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import initStore from '../store';
import Layout from '~/components/Layout';
import BodyContainer from '~/containers/BodyContainer';

class IndexPage extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BodyContainer />
        </Layout>
      </div>
    );
  }
}

export default withRedux(initStore)(IndexPage);
