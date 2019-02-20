const express = require('express');
const next = require('next');
const unSupportedBrowserMiddleware = require('./unSupportedBrowserMiddleware');
const omdbService = require('./services/omdb');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(unSupportedBrowserMiddleware());
    server.disable('x-powered-by');

    server.get('/c/:id', (req, res) => {
      app.render(req, res, '/compare');
    });

    server.get('/api/omdb_details/:id', async (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      const response = await omdbService(req.params.id);
      res.send(JSON.stringify(response));
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
