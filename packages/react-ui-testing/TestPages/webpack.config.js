const path = require('path');

const semver = require('semver');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const reactUiPath = path.resolve(__dirname, '../../react-ui/build');
const { versions, reactUiLocalVersionStub } = require('./versions');

const versionsDependencies = versions.map((x) => Object.keys(x.dependencies)).reduce((a, c) => a.concat(c), []);

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
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  namedExport: false,
                },
              },
            },
          ],
        },
        {
          test: /\.(less)$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
        },
        {
          test: /\.(woff|eot|png|gif|ttf|woff2)$/,
          use: 'file-loader',
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
            },
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
        'process.env.retailUIVersion': JSON.stringify(process.env.RETAIL_UI_VERSION),
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
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      host: '0.0.0.0',
      port: 8083,
      historyApiFallback: {
        rewrites: versions.map((version) => ({
          from: new RegExp(`^/${version['react']}/${version['@skbkontur/react-ui']}/.*`),
          to: `/${version['react']}/${version['@skbkontur/react-ui']}/index.html`,
        })),
      },
      hot: true,
    },
  };
}

module.exports = versions.map((version) => createConfig(version['react'], version['@skbkontur/react-ui']));
