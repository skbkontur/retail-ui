const config = require('./webpack.config');

module.exports = {
  ...config,

  entry: { SSR: './src/server.tsx' },
  output: { filename: '[name].js' },
  module: {
    ...config.module,

    rules: [
      ...config.module.rules,

      {
        test: /\.css$/,
        use: 'null-loader',
      },
    ],
  },
  devtool: 'inline-source-map',
  target: 'node',
};
