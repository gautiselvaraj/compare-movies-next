import Document, { Head, Main, NextScript } from 'next/document';
import Helmet from 'react-helmet';

export default class MyDocument extends Document {
  static async getInitialProps(...args) {
    const documentProps = await super.getInitialProps(...args);
    return { ...documentProps, helmet: Helmet.renderStatic() };
  }

  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent());
  }

  get helmetJsx() {
    return (
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        title="Hello next.js!"
        meta={[
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { property: 'og:title', content: 'Hello next.js!' }
        ]}
      />
    );
  }

  render() {
    return (
      <html lang="en" {...this.helmetHtmlAttrComponents}>
        <Head>
          <meta charSet="utf-8" />
          <meta content="IE=Edge,chrome=1" httpEquiv="X-UA-Compatible" />
          <meta
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            name="viewport"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <meta
            name="msapplication-config"
            content="/static/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />

          <link
            href="//fonts.googleapis.com/css?family=Lato:400,700|Comfortaa:700"
            rel="stylesheet"
          />
          <link
            href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossOrigin="anonymous"
          />
          <script src="//www.youtube.com/iframe_api" async />

          <link rel="stylesheet" href="/_next/static/style.css" />

          {this.helmetJsx}
          {this.helmetHeadComponents}
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
