const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const enableReactTesting = process.env.enableReactTesting;

module.exports = async ({ config, mode }) => {
  config.devtool = 'eval-source-map';

  if (enableReactTesting) {
    // needs to be inserted before React (i.e. config.js)
    config.entry.unshift('react-ui-testing/react-selenium-testing');
  }

  config.resolve.extensions.unshift('.ts', '.tsx');

  config.module.rules = [
    {
      test: /\.(j|t)sx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        babelrc: false,
        envName: 'development',
        extends: path.join(__dirname, '../.babelrc.js'),
      },
    },
    {
      test: /\.(css|less)$/,
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
            onlyLocals: false,
            esModule: false,
          },
        },
        'less-loader',
      ],
    },
    { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
  ];

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.enableReactTesting': JSON.stringify(enableReactTesting),
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../prod.tsconfig.json'),
    }),
  );

  // NOTE Need to allow write tests inside stories for Creevey
  config.node = { __filename: true };

  return config;
};
