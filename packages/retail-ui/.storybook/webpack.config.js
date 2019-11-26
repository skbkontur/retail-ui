const path = require('path');
const webpack = require('webpack');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const enableReactTesting = process.env.enableReactTesting;
const REACT_SELENIUM_TESTING_PATH = path.resolve(__dirname, '../../react-ui-testing/react-selenium-testing.js');
const SCREENSHOT_TESTS_STYLES_PATH = path.resolve(__dirname, 'screenshotTestStyles.less');

module.exports = async ({ config, mode }) => {
  const isProd = mode === 'PRODUCTION';

  config.devtool = 'eval-source-map';

  if (enableReactTesting) {
    // needs to be inserted before React (i.e. config.js)
    config.entry.unshift(REACT_SELENIUM_TESTING_PATH);
    config.entry.push(SCREENSHOT_TESTS_STYLES_PATH);
  }

  config.resolve.extensions.unshift('.ts', '.tsx');

  config.module.rules = [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: REACT_SELENIUM_TESTING_PATH,
      options: {
        babelrc: false,
        presets: ['@babel/preset-env'],
        plugins: [
          '@babel/plugin-transform-object-assign',
          '@babel/plugin-transform-typeof-symbol',
          '@babel/plugin-transform-runtime',
        ],
      },
    },
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        babelrc: false,
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-transform-runtime',
        ],
      },
    },
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        configFile: path.resolve(__dirname, '../prod.tsconfig.json'),
      },
    },
    {
      test: /\.(css|less)$/,
      loaders: [
        'style-loader',
        'css-loader?localIdentName=[name]-[local]-[hash:base64:4]',
        {
          loader: 'typed-css-modules-loader',
          options: {
            noEmit: isProd,
          },
        },
      ],
    },
    { test: /\.less$/, loader: 'less-loader' },
    { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
  ];

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.enableReactTesting': JSON.stringify(enableReactTesting),
    }),
    new WatchExternalFilesPlugin({
      files: ['*.less'],
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../prod.tsconfig.json'),
    }),
  );

  return config;
};
