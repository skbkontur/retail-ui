const webpack = require('webpack');

const isTestEnv = Boolean(process.env.STORYBOOK_REACT_UI_TEST);

module.exports = async ({ config, mode }) => {
  config.resolve.extensions.unshift('.ts', '.tsx');

  if (isTestEnv) {
    config.entry.unshift('@skbkontur/react-selenium-testing');
  }

  config.module.rules = [
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_moduels/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
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
      ],
    },
    {
      test: /\.(png|woff|woff2|eot)$/,
      loader: 'file-loader',
    },
  ];

  return config;
};
