require('dotenv').config();

const withPlugins = require('next-compose-plugins');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withSass = require('@zeit/next-sass');

module.exports = withPlugins([[withSass]], {
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,
      new Dotenv({ path: path.join(__dirname, '.env'), systemvars: true })
    ];

    return config;
  }
});
