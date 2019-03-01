const webpack = require('webpack');

module.exports = function(sourceConfig, env, defaultConfig) {
  return {
    ...defaultConfig,
    entry: {
      ...defaultConfig.entry,
      preview: [
        require.resolve('babel-polyfill'),
        require.resolve('./react-selenium-testing.js'),
        require.resolve('../stories/styles/reset.less'),
        require.resolve('../stories/styles/typography.less'),
        ...defaultConfig.entry.preview,
      ],
    },
    module: {
      ...defaultConfig.module,
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: /(retail-ui|config\.js)/,
          exclude: /retail-ui(\\|\/)node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.less$/,
          loaders: ['style-loader', 'css-loader', 'less-loader'],
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
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
      modules: ['node_modules', 'local_modules', 'web_modules'],
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
