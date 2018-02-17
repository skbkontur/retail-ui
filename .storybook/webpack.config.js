const path = require('path');

module.exports = {
  module: {
    rules: [
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
