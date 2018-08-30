const path = require('path');
const webpack = require('webpack');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = (baseConfig, env) => {
  const config = baseConfig;

  config.resolve.extensions.unshift('.ts', '.tsx');

  config.module.rules.push(
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        configFile: path.resolve(__dirname, '../prod.tsconfig.json')
      }
    },
    {
      test: /\.(css|less)$/,
      loaders: [
        'style-loader',
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
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../prod.tsconfig.json')
    })
  );

  return config;
};
