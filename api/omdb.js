const omdbService = require('../services/omdb');
const { parse } = require('url');

module.exports = async (req, res) => {
  const { query } = parse(req.url, true);
  const response = await omdbService(query.id);
  res.end(JSON.stringify(response));
};
