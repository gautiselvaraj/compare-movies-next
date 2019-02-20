import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(...args) {
    const documentProps = await super.getInitialProps(...args);
    return { ...documentProps };
  }

  render() {
    return (
      <html lang="en">
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
        </Head>
        <body>
          <noscript>
            <div className="not-supported">
              <h2>JavaScript Disabled</h2>
              <p className="not-supported__paragraph">
                Please enable JavaScript to run this app.
              </p>
              <a
                href="https://www.enable-javascript.com/"
                className="not-supported__button"
                target="_blank"
              >
                Enable JavaScript
              </a>
            </div>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
