const path = require('path');

const config = require('./webpack.config');

module.exports = {
  ...config,

  entry: ['core-js/stable', './src/client.tsx'],
  output: { filename: 'client.js' },
  module: {
    ...config.module,

    rules: [
      ...config.module.rules,

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
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    hot: true,
    port: 8080,
  },
  target: 'web',
};
