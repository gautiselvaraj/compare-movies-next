require('dotenv').config();

const withPlugins = require('next-compose-plugins');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withSass = require('@zeit/next-sass');
const withProgressBar = require('next-progressbar');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { ANALYZE } = process.env;

module.exports = withPlugins(
  [
    [withSass],
    [
      withProgressBar,
      {
        profile: true
      }
    ]
  ],
  {
    poweredByHeader: false,
    webpack: (config, { isServer }) => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,
        new Dotenv({ path: path.join(__dirname, '.env'), systemvars: true })
      ];

      if (ANALYZE) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: isServer ? 8888 : 8889,
            openAnalyzer: true
          })
        );
      }

      return config;
    }
  }
);
