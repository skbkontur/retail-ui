const path = require('path');
const webpack = require('webpack');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;

const isProd = process.env.NODE_ENV === 'production';

module.exports = (baseConfig, env) => {
  const config = baseConfig;

  config.resolve.extensions.unshift('.ts', '.tsx');

  config.module.rules.push(
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: isProd
      }
    },
    {
      test: /\.(css|less)$/,
      loaders: [
        'style-loader',
        'css-modules-flow-types-loader',
        'css-loader?localIdentName=[name]-[local]-[hash:base64:4]',
        {
          loader: '@skbkontur/typed-css-modules-loader',
          options: {
            noEmit: isProd
          }
        }
      ]
    },
    { test: /\.less$/, loader: 'less-loader' },
    { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
    { test: /\.json/, loader: 'json-loader' }
  );

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.REACT_APP_EXPERIMENTAL_CSS_IN_JS': JSON.stringify(
        process.env.REACT_APP_EXPERIMENTAL_CSS_IN_JS
      )
    }),
    new WatchExternalFilesPlugin({
      files: ['*.less']
    })
  );

  return config;
};
