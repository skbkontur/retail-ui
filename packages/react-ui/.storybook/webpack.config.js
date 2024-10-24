const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isTestEnv = Boolean(process.env.STORYBOOK_REACT_UI_TEST);

module.exports = async ({ config }) => {
  config.devtool = 'eval-source-map';

  if (isTestEnv) {
    config.entry.unshift('@skbkontur/react-props2attrs');
  }

  config.entry.unshift('core-js/stable');

  config.resolve.extensions.unshift('.ts', '.tsx');

  // storybook's rule for css doesn't handle css-modules
  const filteredStorybooksWebpackRules = (config.module.rules || [])
    .slice(2)
    .filter((r) => r.test && !r.test.test('.css'));

  config.module.rules = [
    ...filteredStorybooksWebpackRules,
    {
      test: /\.(j|t)sx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        babelrc: false,
        extends: path.join(__dirname, '../.babelrc.js'),
      },
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'dts-css-modules-loader',
          options: {
            namedExport: false,
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'global',
              localIdentName: '[name]-[local]-[hash:base64:4]',
              namedExport: false,
            },
          },
        },
      ],
    },
    { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
  ];

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, '../prod.tsconfig.json'),
      },
    }),
  );

  // NOTE Need to allow write tests inside stories for Creevey
  config.node = { __filename: true };

  return config;
};
