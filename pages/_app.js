import 'isomorphic-fetch';
import '~/styles/index.scss';

import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import initStore from '~/store';
import Metas from '~/components/Metas';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <div>
            <Metas />
            <Component {...pageProps} />
          </div>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);