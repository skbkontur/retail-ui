const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = {
  addons: ['@storybook/addon-actions/register', '@storybook/addon-links/register', 'creevey'],
  stories: ['../components/**/*.stories.tsx', '../internal/**/*.stories.tsx'],
  typescript: {
    reactDocgenTypescriptOptions: {
      tsconfigPath: '../prod.tsconfig.json',
      setDisplayName: false,
    },
  },
  webpackFinal: config => {
    const { entry } = config;
    config.entry = [entry.shift(), require.resolve('@skbkontur/react-props2attrs'), ...entry];

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

    return config;
  },
};
