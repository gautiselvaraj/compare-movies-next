const browser = require('browser-detect');

module.exports = () => (req, res, next) => {
  if (
    !req.originalUrl.includes('/static/') &&
    !req.originalUrl.includes('browser-not-supported') &&
    browser(req.headers['user-agent']).name === 'ie'
  ) {
    res.redirect('/browser-not-supported');
  } else {
    next();
  }
};
