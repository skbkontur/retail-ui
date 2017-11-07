var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './docs-entry',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/react-ui/dist/',
    filename: 'docs.js'
  },
  devServer: {
    disableHostCheck: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'es3ify',
        exclude: [/react-input-mask/]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-stage-0'),
            require.resolve('babel-preset-react')
          ],
          cacheDirectory: true
        },
        include: [
          path.join(__dirname, 'src'),
          path.resolve(__dirname, '..', 'components'),
          path.resolve(__dirname, '..', 'lib'),
          path.resolve(__dirname, '..', 'testing')
        ]
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css?localIdentName=[name]-[local]-[hash:base64:8]',
          'postcss'
        )
      },
      { test: /\.less$/, loader: 'less-loader' },
      { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
      { test: /\.md$/, loader: 'marked-loader' },
      { test: /\.json/, loader: 'json-loader' }
    ]
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions', 'IE 8'] })],
  resolve: {
    fallback: path.join(__dirname, 'node_modules'),
    alias: {
      ui: path.resolve(__dirname, '..', 'components'),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    },
    extensions: ['', '.adapter.js', '.js', '.jsx', '.json']
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new ExtractTextPlugin('docs.css'),
    new webpack.PrefetchPlugin('react')
  ]
};
