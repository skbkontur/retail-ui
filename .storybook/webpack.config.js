const path = require('path');
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
    rules: [
      // add your custom loaders.
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-stage-0'),
            require.resolve('babel-preset-react')
          ]
        },
        include: [
          path.resolve(__dirname, '..', 'components'),
          path.resolve(__dirname, '..', 'lib')
        ]
      },
      {
        test: /\.(css|less)$/,
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[name]-[local]-[hash:base64:4]'
        ]
      },
      { test: /\.less$/, loader: 'less-loader' },
      { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
      { test: /\.json/, loader: 'json-loader' }
    ]
  }
};
