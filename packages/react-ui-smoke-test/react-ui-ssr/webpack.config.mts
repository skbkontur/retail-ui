import { fileURLToPath } from 'url';
import path from 'path';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          envName: 'cjs',
          extends: path.join(__dirname, '../../react-ui/.babelrc.cjs'),
        },
      },      
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js'],
    },
    alias: {
      // React 17 has no exports map, so @skbkontur/icons' bare
      // `react/jsx-runtime` import must point to the physical runtime file.
      'react/jsx-runtime': path.resolve(__dirname, '../../../node_modules/react/jsx-runtime.js'),
    },
  },
  mode: env,
  target: 'node',
};
