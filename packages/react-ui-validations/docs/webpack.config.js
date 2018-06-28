'use strict';

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

function readVersionFromPackageJson(packageJsonPath) {
    var content = require(packageJsonPath);
    return 'v' + content.version;
}

var libraryVersion = process.env.TRAVIS_TAG;
if (!libraryVersion) {
    libraryVersion = readVersionFromPackageJson(path.resolve('../package.json'));
}

function createConfig(publicPath, output) {
    return {
        entry: {
            'index': [
                require.resolve('babel-polyfill'),
                './src/index.js',
            ],
        },
        output: {
            path: output,
            publicPath: publicPath,
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: ['react-hot-loader', 'babel-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.md$/,
                    use: ['react-hot-loader', 'babel-loader', './loaders/markdown-loader'],
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
            modules: ['node_modules', 'web_modules'],
            alias: {
                'react': path.resolve(__dirname, 'node_modules/react'),
                'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
                'react-ui-validations': path.resolve(__dirname, '../src'),
                'retail-ui': path.resolve(__dirname, 'node_modules/retail-ui'),
                'Demo': path.resolve(__dirname, './src/components/Demo.js'),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new webpack.DefinePlugin({
                'process.env.libraryVersion': JSON.stringify(libraryVersion),
            }),
        ],
    };
}

if (process.env.NODE_ENV === 'production') {
    module.exports = [
        createConfig('http://tech.skbkontur.ru/react-ui-validations/' + libraryVersion + '/', path.join(__dirname, 'dist/' + libraryVersion)),
        createConfig('http://tech.skbkontur.ru/react-ui-validations/', path.join(__dirname, 'dist')),
    ];
}
else {
    module.exports = createConfig('/', path.join(__dirname, 'dist'));
}

