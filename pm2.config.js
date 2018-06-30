module.exports = {
  apps: [
    {
      name: 'comparemovies-web-app',
      script: 'server.js',
      instances: 1,
      exec_mode: 'cluster'
    }
  ]
};
