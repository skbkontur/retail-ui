const path = require('path');
const webpack = require('webpack');

module.exports = async ({ config, mode }) => {
  config.resolve.extensions.unshift('.ts', '.tsx');

  config.entry.unshift('react-ui-testing/react-selenium-testing');

  config.entry.push(
    path.join(__dirname, '../stories/styles/reset.less'),
    path.join(__dirname, '../stories/styles/typography.less'),
  );

  config.module.rules = [
    {
      test: /\.(ts|tsx)$/,
      // exclude: /node_moduels/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
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
    {
      test: /\.(css|less)$/,
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
        'less-loader',
      ],
    },
    {
      test: /\.(png|woff|woff2|eot)$/,
      loader: 'file-loader',
    },
  ];

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.enableReactTesting': JSON.stringify(true),
    }),
  );

  return config;
};
