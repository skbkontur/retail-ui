'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(/* env */) {
    const PROD = process.env.NODE_ENV === 'production';

    const applicationRoot = PROD ? 'http://tech.skbkontur.ru/react-ui-testing/' : '/';
    const applicationAbsoluteRoot = PROD ? 'http://tech.skbkontur.ru/react-ui-testing/' : 'http://localhost:8080/';

    return [
        {
            entry: {
                index: [require.resolve('babel-polyfill'), './src/index.js'],
            },
            output: PROD
                ? {
                      path: path.join(__dirname, 'dist'),
                      publicPath: applicationRoot,
                      filename: '[name].[hash].js',
                  }
                : {
                      path: path.join(__dirname, 'dist'),
                      publicPath: applicationRoot,
                      filename: '[name].js',
                  },
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        use: 'babel-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.md$/,
                        use: ['babel-loader', './loaders/markdown-loader'],
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.(c|le)ss$/,
                        exclude: /node_modules/,
                        use: [
                            'classnames-loader',
                            'style-loader',
                            'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:4]',
                            'less-loader',
                        ],
                    },
                    {
                        test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
                        exclude: /node_modules/,
                        use: 'file-loader',
                    },
                    {
                        test: /\.jsx?$/,
                        use: 'babel-loader',
                        include: /retail-ui/,
                    },
                    {
                        test: /\.(c|le)ss$/,
                        include: /retail-ui/,
                        use: [
                            'style-loader',
                            'css-loader?localIdentName=[name]-[local]-[hash:base64:4]',
                            'less-loader',
                        ],
                    },
                    {
                        test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
                        include: /retail-ui/,
                        use: 'file-loader',
                    },
                ],
            },
            resolve: {
                extensions: ['.js', '.jsx'],
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.bookmarkletsRoot': JSON.stringify(applicationAbsoluteRoot + 'bookmarklets'),
                }),
                new HtmlWebpackPlugin({
                    template: './src/index.html',
                }),
            ],
            devServer: {
                host: '0.0.0.0',
                disableHostCheck: true,
            },
        },
        {
            entry: {
                'demo-page': [
                    require.resolve('babel-polyfill'),
                    '../SeleniumTesting/react-selenium-testing.js',
                    './src/demo-page.js',
                ],
            },
            output: PROD
                ? {
                      path: path.join(__dirname, 'dist'),
                      publicPath: applicationRoot,
                      filename: '[name].[hash].js',
                  }
                : {
                      path: path.join(__dirname, 'dist'),
                      publicPath: applicationRoot,
                      filename: '[name].js',
                  },
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        use: 'babel-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.md$/,
                        use: ['babel-loader', './loaders/markdown-loader'],
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.(c|le)ss$/,
                        exclude: /node_modules/,
                        use: [
                            'classnames-loader',
                            'style-loader',
                            'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:4]',
                            'less-loader',
                        ],
                    },
                    {
                        test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
                        exclude: /node_modules/,
                        use: 'file-loader',
                    },
                    {
                        test: /\.jsx?$/,
                        use: 'babel-loader',
                        include: /retail-ui/,
                    },
                    {
                        test: /\.(c|le)ss$/,
                        include: /retail-ui/,
                        use: [
                            'style-loader',
                            'css-loader?localIdentName=[name]-[local]-[hash:base64:4]',
                            'less-loader',
                        ],
                    },
                    {
                        test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
                        include: /retail-ui/,
                        use: 'file-loader',
                    },
                ],
            },
            resolve: {
                extensions: ['.js', '.jsx'],
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.enableReactTesting': JSON.stringify(true),
                }),
                new HtmlWebpackPlugin({
                    template: './src/demo-page.html',
                    filename: 'demo-page/index.html',
                }),
            ],
        },
        {
            entry: {
                ['highlight-tid-bookmarklet']: ['./src/highlight-tid-bookmarklet/index.js'],
            },
            output: PROD
                ? {
                      publicPath: applicationRoot,
                      path: path.join(__dirname, 'dist/bookmarklets/'),
                      filename: '[name].js',
                  }
                : {
                      publicPath: applicationRoot,
                      path: path.join(__dirname, 'dist/bookmarklets/'),
                      filename: '[name].js',
                  },
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        include: path.join(__dirname, 'src'),
                        loader: 'babel-loader',
                    },
                    {
                        test: /\.less$/,
                        include: path.join(__dirname, 'src'),
                        use: [
                            'classnames-loader',
                            'style-loader',
                            'css-loader?localIdentName=[name]-[local]-[hash:base64:4]',
                            'less-loader',
                        ],
                    },
                ],
            },
        },
    ];
};
