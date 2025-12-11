import path from 'path'
import { fileURLToPath } from 'url';

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
          extends: path.join(__dirname, '../../react-ui/.babelrc.js'),
        },
      },      
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode: env,
  target: 'node',
};
