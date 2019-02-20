const withSass = require('@zeit/next-sass');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

if (process.env.NODE_ENV !== 'production') {
  require('now-env');
}

const { ANALYZE } = process.env;

module.exports = withSass({
  target: 'serverless',
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    config.plugins = config.plugins || [];

    config.plugins.push(new webpack.EnvironmentPlugin(['TMDB_API_KEY']));

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
});
