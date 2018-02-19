import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charset="utf-8" />
          <meta content="IE=Edge,chrome=1" http-equiv="X-UA-Compatible" />
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
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content="#ffffff" />

          <link
            href="//fonts.googleapis.com/css?family=Lato:400,700|Comfortaa:700"
            rel="stylesheet"
          />
          <link
            href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossorigin="anonymous"
          />
          <script src="//www.youtube.com/iframe_api" async />

          <title>Compare Movies and TV Shows Instantly</title>
          <meta
            name="description"
            content="Compare movies and TV shows info like ratings, runtime, genres, release date, status, season & episodes details, cast, crew, overview and so on. Also watch movies and TV shows trailers and posters with ease."
          />
          <meta
            property="og:title"
            content="Compare Movies and TV Shows Instantly"
          />
          <meta
            property="og:description"
            content="Compare movies and TV shows info like ratings, runtime, genres, release date, status, season & episodes details, cast, crew, overview and so on. Also watch movies and TV shows trailers and posters with ease."
          />
          <meta property="og:site_name" content="Compare Movies" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://www.comparemovies.info/social-logo.jpg"
          />
          <meta
            name="twitter:title"
            content="Compare Movies and TV Shows Instantly"
          />
          <meta
            name="twitter:description"
            content="Compare movies and TV shows info like ratings, runtime, genres, release date, status, season & episodes details, cast, crew, overview and so on. Also watch movies and TV shows trailers and posters with ease."
          />
          <meta name="twitter:creator" content="@gautiselvaraj" />
          <meta
            name="twitter:image"
            content="https://www.comparemovies.info/social-logo.jpg"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
