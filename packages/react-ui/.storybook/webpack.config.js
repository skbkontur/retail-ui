const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = async ({ config, mode }) => {
  config.devtool = 'eval-source-map';

  config.entry.unshift('core-js/stable');

  config.resolve.extensions.unshift('.ts', '.tsx');

  config.module.rules = [
    {
      test: /\.(j|t)sx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        babelrc: false,
        envName: 'cjs',
        extends: path.join(__dirname, '../.babelrc.js'),
      },
    },
    {
      test: /\.css$/,
      loaders: [
        'style-loader',
        {
          loader: 'dts-css-modules-loader',
          options: {
            namedExport: false,
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'global',
              localIdentName: '[name]-[local]-[hash:base64:4]',
            },
          },
        },
      ],
    },
    { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
  ];

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.enableReactTesting': JSON.stringify(isTestEnv),
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../prod.tsconfig.json'),
    }),
  );

  // NOTE Need to allow write tests inside stories for Creevey
  config.node = { __filename: true };

  return config;
};
