const webpack = require('webpack');

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  webpackFinal: config => {
    config.resolve.extensions.unshift('.ts', '.tsx');

    config.entry.unshift(require.resolve('@skbkontur/react-props2attrs'));

    config.module.rules.push({
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
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.enableReactTesting': JSON.stringify(true),
      }),
    );

    return config;
  },
};
