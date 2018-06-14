module.exports = {
  apps: [
    {
      name: 'comparemovies-web-app',
      script: 'server.js',
      instances: 0,
      exec_mode: 'cluster'
    }
  ]
};
