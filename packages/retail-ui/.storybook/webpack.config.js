const path = require('path');
const webpack = require('webpack');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const enableReactTesting = process.env.enableReactTesting;
const REACT_SELENIUM_TESTING_PATH = path.resolve(__dirname, '../../react-ui-testing/react-selenium-testing.js');
const SCREENSHOT_TESTS_STYLES_PATH = path.resolve(
  __dirname,
  '../../react-ui-screenshot-tests/screenshotTestStyles.less',
);

module.exports = (baseConfig, env) => {
  const config = baseConfig;

  if (enableReactTesting) {
    config.entry.preview.unshift(REACT_SELENIUM_TESTING_PATH, SCREENSHOT_TESTS_STYLES_PATH);
  }

  config.resolve.extensions.unshift('.ts', '.tsx');

  config.module.rules.push(
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
          loader: '@skbkontur/typed-css-modules-loader',
          options: {
            noEmit: isProd,
          },
        },
      ],
    },
    { test: /\.less$/, loader: 'less-loader' },
    { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
    { test: /\.json/, loader: 'json-loader' },
  );

  if (enableReactTesting) {
    config.module.rules.push({
      test: /\.js$/,
      include: REACT_SELENIUM_TESTING_PATH,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: ['transform-object-assign', 'transform-es2015-typeof-symbol', 'transform-runtime'],
        },
      },
    });
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.REACT_APP_EXPERIMENTAL_CSS_IN_JS': JSON.stringify(process.env.REACT_APP_EXPERIMENTAL_CSS_IN_JS),
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
