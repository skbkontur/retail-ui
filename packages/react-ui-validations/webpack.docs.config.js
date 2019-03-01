'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function readVersionFromPackageJson(packageJsonPath) {
  const content = require(packageJsonPath);
  return 'v' + content.version;
}

let libraryVersion = process.env.TRAVIS_TAG;
if (!libraryVersion) {
  libraryVersion = readVersionFromPackageJson(path.resolve('package.json'));
}

function createConfig(publicPath, output) {
  return {
    entry: {
      index: [require.resolve('babel-polyfill'), './docs/index.tsx'],
    },
    output: {
      path: output,
      publicPath: publicPath,
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.md$/,
          exclude: /node_modules/,
          use: ['react-hot-loader', 'babel-loader', './loaders/markdown-loader'],
        },
        {
          test: /\.(css|less)$/,
          exclude: /node_modules/,
          use: [
            'classnames-loader',
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]-[local]-[hash:base64:4]',
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
          exclude: /node_modules/,
          use: 'file-loader',
        },
        {
          test: /\.(js|jsx)$/,
          include: /retail-ui/,
          exclude: /retail-ui(\\|\/)node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.(css|less)$/,
          include: /retail-ui/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[name]-[local]-[hash:base64:4]',
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
          include: /retail-ui/,
          use: 'file-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: ['node_modules', 'web_modules'],
      alias: {
        Demo: path.resolve(__dirname, './docs/components/Demo.tsx'),
        src: path.resolve(__dirname, 'src'),
        docs: path.resolve(__dirname, 'docs'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './docs/index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.libraryVersion': JSON.stringify(libraryVersion),
        'process.env.libraryVersionEscaped': JSON.stringify(libraryVersion.replace('-', '--')),
        REACT_UI_PACKAGE: JSON.stringify('retail-ui'),
      }),
    ],
  };
}

if (process.env.NODE_ENV === 'production') {
  module.exports = [
    createConfig(
      'http://tech.skbkontur.ru/react-ui-validations/' + libraryVersion + '/',
      path.join(__dirname, 'dist/' + libraryVersion),
    ),
    createConfig('http://tech.skbkontur.ru/react-ui-validations/', path.join(__dirname, 'dist')),
  ];
} else {
  module.exports = createConfig('/', path.join(__dirname, 'dist'));
}
