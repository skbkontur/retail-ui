import config from './webpack.config.mts';

export default {
  ...config,
  entry: { SSR: './src/server.tsx' },
  output: { filename: '[name].js', module: true, chunkFormat: 'module' },
  experiments: { outputModule: true },
  module: {
    ...config.module,
    rules: (config.module.rules as unknown[]).concat([
      {
        test: /\.css$/,
        use: 'null-loader',
      },
    ]),
  },
  devtool: 'inline-source-map',
  target: 'node',
};
