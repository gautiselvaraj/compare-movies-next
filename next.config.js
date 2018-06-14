require('dotenv').config();

const withPlugins = require('next-compose-plugins');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withSass = require('@zeit/next-sass');
const withProgressBar = require('next-progressbar');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const withOffline = require('next-offline');

const { ANALYZE } = process.env;

module.exports = withPlugins(
  [
    [withSass],
    [
      withProgressBar,
      {
        profile: true
      }
    ],
    [
      withOffline,
      {
        workboxOpts: {
          runtimeCaching: [
            {
              urlPattern: /\.(?:png|gif|jpg|jpeg|svg)$/,
              handler: 'cacheFirst',
              options: {
                cacheName: 'images'
              }
            },
            {
              urlPattern: new RegExp(
                '^(http|https)://(fonts.googleapis.com|maxcdn.bootstrapcdn.com/font-awesome)/(.*)'
              ),
              handler: 'cacheFirst',
              options: {
                cacheName: 'fonts'
              }
            }
          ]
        }
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
