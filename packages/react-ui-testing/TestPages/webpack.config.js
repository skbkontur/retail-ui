const path = require('path');

const semver = require('semver');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const reactUiPath = path.resolve(__dirname, '../../react-ui/build');
const { versions, reactUiLocalVersionStub } = require('./versions');

const versionsDependencies = versions.map(x => Object.keys(x.dependencies)).reduce((a, c) => a.concat(c), []);

const dependencies = ['react', '@skbkontur/react-ui', ...new Set(versionsDependencies)];

function createConfig(reactVersion, reactUIVersion) {
  const targetDir = `${reactVersion}_${reactUIVersion}`;
  const alias = {};
  for (const dependency of dependencies) {
    alias[dependency] = path.resolve(`${targetDir}/node_modules/${dependency}`);
  }
  if (reactUIVersion === reactUiLocalVersionStub) {
    alias['@skbkontur/react-ui'] = reactUiPath;
  }
  return {
    entry: {
      [`index_${reactVersion}_${reactUIVersion}`]: [
        'babel-polyfill',
        './react-selenium-testing-custom-props.js',
        '../react-selenium-testing.js',
        `./${targetDir}/index.js`,
      ],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: '[name].js',
    },
    module: {
      loaders: [
        {
          test: /\.(css)$/,
          loaders: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(less)$/,
          loaders: ['style-loader', 'css-loader', 'less-loader'],
        },
        {
          test: /\.(woff|eot|png|gif|ttf|woff2)$/,
          loader: 'file-loader',
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            babelrc: false,
            presets: [
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-stage-0'),
            ],
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: { ...alias },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.enableReactTesting': JSON.stringify(true),
        'process.env.hasKebab': JSON.stringify(semver.satisfies(reactUIVersion, '>=0.9.0')),
        'process.env.hasPaging': JSON.stringify(semver.satisfies(reactUIVersion, '>=0.9.0')),
        'process.env.hasSidePage': JSON.stringify(semver.satisfies(reactUIVersion, '>=0.11.0')),
        'process.env.newCombobox': JSON.stringify(semver.satisfies(reactUIVersion, '>=0.7.0')),
        'process.env.reactUIVersion': JSON.stringify(reactUIVersion),
        'process.env.baseUrl': JSON.stringify(`/${reactVersion}/${reactUIVersion}`),
      }),
      new HtmlWebpackPlugin({
        filename: `${reactVersion}/${reactUIVersion}/index.html`,
        template: './src/index.html',
      }),
    ],
    devServer: {
      host: '0.0.0.0',
      port: 8083,
      historyApiFallback: {
        rewrites: versions.map(version => ({
          from: new RegExp(`^/${version['react']}/${version['@skbkontur/react-ui']}/.*`),
          to: `/${version['react']}/${version['@skbkontur/react-ui']}/index.html`,
        })),
      },
    },
  };
}

module.exports = versions.map(version => createConfig(version['react'], version['@skbkontur/react-ui']));
