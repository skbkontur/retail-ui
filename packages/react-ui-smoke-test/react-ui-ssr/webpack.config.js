const path = require('path');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          envName: 'cjs',
          extends: path.join(__dirname, '../../react-ui/.babelrc.js'),
        },
      },
      {
        loader: 'string-replace-loader',
        options: {
          search: /__REACT_UI_PACKAGE__/g,
          replace: '@skbkontur/react-ui',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode: env,
  target: 'node',
};
