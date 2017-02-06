'use strict';

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'index': './index.js'
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
                use: 'classnames-loader!style-loader!css-loader?modules&localIdentName=[name]-[local]-[hash:base64:4]!less-loader'
            },
            {
                test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
                exclude: /node_modules/,
                use: 'file-loader',
            },
            {
                test: /\.jsx?$/,
                use: 'babel',
                include: /retail-ui/,
                exclude: /retail-ui(\\|\/)node_modules/,
            },
            {
                test: /\.(c|le)ss$/,
                include: /retail-ui/,
                exclude: /retail-ui(\\|\/)node_modules/,
                use: 'style-loader!css-loader?localIdentName=[name]-[local]-[hash:base64:4]!less-loader',
            },
            {
                test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
                include: /retail-ui/,
                exclude: /retail-ui(\\|\/)node_modules/,
                use: 'file-loader',
            },
        ],
    },    
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ],
};
