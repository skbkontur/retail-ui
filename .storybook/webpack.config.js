const path = require('path');
const webpack = require('webpack');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;

module.exports = (baseConfig, env) => {
  const config = baseConfig;

  config.resolve.extensions.unshift('.ts', '.tsx');

  config.module.rules.push(
    { test: /\.tsx?$/, loader: 'ts-loader' },
    {
      test: /\.(css|less)$/,
      loaders: [
        'style-loader',
        'css-modules-flow-types-loader',
        'css-loader?localIdentName=[name]-[local]-[hash:base64:4]',
        '@skbkontur/typed-css-modules-loader'
      ]
    },
    { test: /\.less$/, loader: 'less-loader' },
    { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
    { test: /\.json/, loader: 'json-loader' }
  );

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.EXPERIMENTAL_CSS_IN_JS': JSON.stringify(
        process.env.EXPERIMENTAL_CSS_IN_JS
      )
    }),
    new WatchExternalFilesPlugin({
      files: ['*.less']
    })
  );

  return config;
};
