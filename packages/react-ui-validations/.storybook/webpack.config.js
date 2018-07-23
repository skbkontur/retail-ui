var autoprefixer = require('autoprefixer')
var webpack = require('webpack')
const path = require('path')

module.exports = function(storybookBaseConfig, configType) {
    storybookBaseConfig.entry.preview = [
        require.resolve('babel-polyfill'),
        require.resolve(
            '../selenium-tests/Assemblies/SeleniumTesting/react-selenium-testing.js'
        ),
        require.resolve('../stories/styles/reset.less'),
        require.resolve('../stories/styles/typography.less'),
        ...storybookBaseConfig.entry.preview
    ]
    storybookBaseConfig.module.loaders.push([
        {
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            exclude: /(node_modules)|(WebWorms)/
        },
        {
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                presets: [
                    require.resolve('babel-preset-es2015'),
                    require.resolve('babel-preset-react'),
                    require.resolve('babel-preset-stage-0')
                ]
            },
            include: /WebWorms/
        },
        {
            test: /\.(c|le)ss$/,
            exclude: /node_modules/,
            loaders: [
                'classnames',
                'style',
                'css?localIdentName=[name]-[local]-[hash:base64:4]',
                'less'
            ]
        },
        {
            test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
            exclude: /node_modules/,
            loader: 'file-loader'
        },
        {
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                presets: [
                    require.resolve('babel-preset-es2015'),
                    require.resolve('babel-preset-react'),
                    require.resolve('babel-preset-stage-0')
                ]
            },
            include: /retail-ui|fast-memoize/,
            exclude: /retail-ui(\\|\/)node_modules/
        },
        {
            test: /\.(c|le)ss$/,
            include: /retail-ui/,
            exclude: /retail-ui(\\|\/)node_modules/,
            loader:
                'style-loader!css-loader?localIdentName=[name]-[local]-[hash:base64:4]!less-loader'
        },
        {
            test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
            include: /retail-ui/,
            exclude: /retail-ui(\\|\/)node_modules/,
            loader: 'file-loader'
        }
    ])
    storybookBaseConfig.resolve.modulesDirectories = [
        'node_modules',
        'local_modules',
        'web_modules'
    ]
    storybookBaseConfig.plugins = storybookBaseConfig.plugins || []
    storybookBaseConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.enableReactTesting': JSON.stringify(true)
        })
    )
    return storybookBaseConfig
}
