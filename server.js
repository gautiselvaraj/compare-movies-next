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
