import { join } from 'path';

import config from './webpack.config.mts';

export default {
  ...config,

  entry: ['core-js/stable', './src/client.tsx'],
  output: { filename: 'client.js' },
  module: {
    ...config.module,

    rules: [
      ...config.module.rules,

      {
        test: /\.css$/,
        use: [
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
    ],
  },
  devServer: {
    contentBase: join(__dirname, './dist'),
    hot: true,
    port: 8080,
  },
  target: 'web',
};
