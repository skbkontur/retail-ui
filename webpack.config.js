var webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react'],
                plugins: ['transform-flow-strip-types']
            }
        },{
            test: /\.jsx?$/,
            include: /retail-ui/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react'],
                plugins: ['transform-flow-strip-types']
            }
        }, {
            test: /\.less$/,
            loaders: ['style', 'css', 'less']
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
};