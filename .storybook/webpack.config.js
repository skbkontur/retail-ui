const path = require('path');
const webpack = require('webpack');

module.exports = (baseConfig, env) => {
  const config = baseConfig;

  config.module.rules.push(
    {
      test: /\.(css|less)$/,
      loaders: [
        'style-loader',
        'css-modules-flow-types-loader',
        'css-loader?localIdentName=[name]-[local]-[hash:base64:4]'
      ]
    },
    { test: /\.less$/, loader: 'less-loader' },
    { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
    { test: /\.json/, loader: 'json-loader' }
  );

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.EXPERIMENTAL_CSS_IN_JS': JSON.stringify(
        process.env.EXPERIMENTAL_CSS_IN_JS
      )
    })
  );

  return config;
};
