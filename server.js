const fetch = require('isomorphic-fetch');
const express = require('express');
const next = require('next');
const unSupportedBrowserMiddleware = require('./unSupportedBrowserMiddleware');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(unSupportedBrowserMiddleware());

    server.get('/c/:id', (req, res) => {
      app.render(req, res, '/compare');
    });

    server.get('/omdb_details/:id', (req, res) => {
      res.setHeader('Content-Type', 'application/json');

      fetch(
        `http://www.omdbapi.com/?i=${req.params.id}&apikey=${
          process.env.OMDB_API_KEY
        }`
      )
        .then(response => response.json())
        .then(json =>
          res.send(
            JSON.stringify({
              awards: json.Awards,
              ratings: json.Ratings,
              dvdReleaseDate: json.DVD,
              production: json.Production
            })
          )
        )
        .catch(err => res.send(JSON.stringify({})));
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) {
        throw err;
      }
      console.log(`Ready on ${port} port`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
