const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function readVersionFromPackageJson(packageJsonPath) {
  const content = require(packageJsonPath);
  return 'v' + content.version;
}

const libraryVersion = readVersionFromPackageJson(path.resolve('package.json'));

function createConfig(publicPath, output) {
  return {
    entry: {
      index: [require.resolve('babel-polyfill'), './docs/index.tsx'],
    },
    output: {
      path: output,
      publicPath: publicPath,
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            // transpileOnly: true,
          },
        },
        {
          test: /\.md$/,
          exclude: /node_modules/,
          use: ['react-hot-loader', 'babel-loader', './loaders/markdown-loader'],
        },
        {
          test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
          use: 'file-loader',
        },
        {
          test: /\.(css|less)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[name]-[local]-[hash:base64:4]',
              },
            },
            'less-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        Demo: path.resolve(__dirname, './docs/Common/Demo.tsx'),
        SourceCode: path.resolve(__dirname, './docs/Common/SourceCode.tsx'),
        src: path.resolve(__dirname, './src'),
        docs: path.resolve(__dirname, './docs'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './docs/index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.libraryVersion': JSON.stringify(libraryVersion),
        'process.env.libraryVersionEscaped': JSON.stringify(libraryVersion.replace('-', '--')),
        REACT_UI_PACKAGE: JSON.stringify('retail-ui'),
      }),
    ],
    devServer: {
      disableHostCheck: true,
      historyApiFallback: true,
      host: '0.0.0.0',
      inline: true,
    },
  };
}

if (process.env.NODE_ENV === 'production') {
  module.exports = [
    createConfig(
      'http://tech.skbkontur.ru/react-ui-validations/' + libraryVersion + '/',
      path.join(__dirname, 'dist/' + libraryVersion),
    ),
    createConfig('http://tech.skbkontur.ru/react-ui-validations/', path.join(__dirname, 'dist')),
  ];
} else {
  module.exports = createConfig('/', path.join(__dirname, 'dist'));
}
