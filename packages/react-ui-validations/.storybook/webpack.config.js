const webpack = require('webpack');

module.exports = function(sourceConfig, env, defaultConfig) {
  return {
    ...defaultConfig,
    entry: {
      ...defaultConfig.entry,
      preview: [
        require.resolve('babel-polyfill'),
        require.resolve('react-ui-testing/react-selenium-testing'),
        require.resolve('../stories/styles/reset.less'),
        require.resolve('../stories/styles/typography.less'),
        ...defaultConfig.entry.preview,
      ],
    },
    module: {
      ...defaultConfig.module,
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_moduels/,
          loader: 'ts-loader',
          options: {
            // transpileOnly: true,
          },
        },
        {
          test: /\.(css|less)$/,
          loaders: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[name]-[local]-[hash:base64:4]',
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.(png|woff|woff2|eot)$/,
          loader: 'file-loader',
        },
      ],
    },
    resolve: {
      ...defaultConfig.resolve,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      ...defaultConfig.plugins,
      new webpack.DefinePlugin({
        'process.env.enableReactTesting': JSON.stringify(true),
        REACT_UI_PACKAGE: JSON.stringify('retail-ui'),
      }),
    ],
  };
};
