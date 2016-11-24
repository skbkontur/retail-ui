const path = require('path')
// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    loaders: [
      // add your custom loaders.
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-stage-0'),
            require.resolve('babel-preset-react'),
          ],
        },
        include: [
          path.resolve(__dirname, '..', '..', 'components'),
          path.resolve(__dirname, '..', '..', 'lib'),
          path.resolve(__dirname, '..', '..', 'testing'),
        ],
      },
      {
        test: /\.(css|less)$/,
        loaders: ['style', 'css?localIdentName=[name]-[local]-[hash:base64:4]']
      },
      {test: /\.less$/, loader: 'less-loader'},
      {test: /\.(woff|woff2|eot)$/, loader: 'file-loader'},
      {test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader'},
      {test: /\.md$/, loader: 'marked-loader'},
      {test: /\.json/, loader: 'json-loader'}
    ],
  },
  resolve: {
    fallback: path.join(__dirname, '..', 'node_modules'),
    alias: {
      ui: path.resolve(__dirname, '..', '..', 'components'),
      react: path.resolve(__dirname, '..', 'node_modules/react'),
      'react-dom': path.resolve(__dirname, '..', 'node_modules/react-dom'),
    },
    extensions: ['', '.adapter.js', '.js', '.jsx', '.json'],
  },
  resolveLoader: {
    modulesDirectories: [
      "web_loaders",
      "web_modules",
      "node_loaders",
      "node_modules",
      path.join(__dirname, '..', 'node_modules')
    ]
  }
};
