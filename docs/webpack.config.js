'use strict';

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'index': [
            require.resolve('babel-polyfill'),
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: process.env.NODE_ENV === 'production' 
            ? 'http://tech.skbkontur.ru/react-ui-validations/'
            : '/',
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
                test: /\.(c|le)ss$/,
                exclude: /node_modules/,
                use: [
                    'classnames-loader', 
                    'style-loader', 
                    'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:4]', 
                    'less-loader'
                ]
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
        }
    },    
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
};
