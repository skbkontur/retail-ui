var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './showcase',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'showcase.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
        include: [
          path.join(__dirname, 'src'),
          /jstransform/,
          path.resolve(__dirname, '..', 'components'),
          path.resolve(__dirname, '..', 'lib'),
          /esprima\.js$/, // Need memberExpressionLiterals for IE8.
        ],
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css?localIdentName=[name]-[local]-[hash:base64:8]!autoprefixer'
        ),
      },
      {test: /\.less$/, loader: 'less-loader'},
      {test: /\.(woff|woff2|eot)$/, loader: "file-loader"},
      {test: /\.md$/, loader: 'marked-loader'},
      {test: /\.json/, loader: 'json-loader'},

      { test: require.resolve("react"), loader: "expose?React" },
      { test: require.resolve("react-dom"), loader: "expose?ReactDOM" },
      { test: path.resolve(__dirname, "src", "components.js"), loader: "expose?__components" }
    ]
  },
  resolve: {
    fallback: path.join(__dirname, 'node_modules'),
    alias: {
      ui: path.resolve(__dirname, '..', 'components')
    },
    extensions: ['', '.js', '.jsx', '.json'],
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new ExtractTextPlugin('showcase.css'),
    new webpack.PrefetchPlugin('react'),
  ]
};
