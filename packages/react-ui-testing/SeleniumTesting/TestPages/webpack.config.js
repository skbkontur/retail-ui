const path = require('path');
const semver = require('semver');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const versions = require('./versions');

const versionsDependencies = versions
    .map(x => Object.keys(x.dependencies))
    .reduce((a, c) => a.concat(c), []);

const dependencies = ['react', 'retail-ui', ... new Set(versionsDependencies)];

const versionPairs = versions
    .map(version => version['retail-ui'].map(retailUIVersion => [version.react, retailUIVersion]))
    .reduce((x, y) => x.concat(y), []);

function createConfig(reactVersion, retailUIVersion) {
    const targetDir = `${reactVersion}_${retailUIVersion}`;
    const alias = {};
    for (const dependency of dependencies) {
        alias[dependency] = path.resolve(`${targetDir}/node_modules/${dependency}`);
    }

    return {
        entry: {
            [`index_${reactVersion}_${retailUIVersion}`]: [
                'babel-polyfill',
                './react-selenium-testing-custom-props.js',
                '../react-selenium-testing.js',
                `./${targetDir}/index.js`
            ]
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
                    loaders: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(less)$/,
                    loaders: ['style-loader', 'css-loader', 'less-loader']
                },
                {
                    test: /\.(woff|eot|png|gif|ttf|woff2)$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            require.resolve('babel-preset-react'),
                            require.resolve('babel-preset-es2015'),
                            require.resolve('babel-preset-stage-0')
                        ],
                    }
                },
                {
                    test: /\.jsx?$/,
                    include: /(retail\-ui)/,
                    loader: 'babel-loader',
                    exclude: /(react\-input\-mask)/,
                    query: {
                        presets: [
                            require.resolve('babel-preset-react'),
                            require.resolve('babel-preset-es2015'),
                            require.resolve('babel-preset-stage-0')
                        ]
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {...alias}
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.enableReactTesting': JSON.stringify(true),
                'process.env.hasKebab': JSON.stringify(semver.satisfies(retailUIVersion, '>=0.9.0')),
                'process.env.hasPaging': JSON.stringify(semver.satisfies(retailUIVersion, '>=0.9.0')),
                'process.env.hasSidePage': JSON.stringify(semver.satisfies(retailUIVersion, '>=0.11.0')),
                'process.env.newCombobox': JSON.stringify(semver.satisfies(retailUIVersion, '>=0.7.0')),
                'process.env.retailUIVersion': JSON.stringify(retailUIVersion),
                'process.env.baseUrl': JSON.stringify(`/${reactVersion}/${retailUIVersion}`),
            }),
            new HtmlWebpackPlugin({
                filename: `${reactVersion}/${retailUIVersion}/index.html`,
                template: './src/index.html',
            })
        ],
        devServer: {
            port: 8083,
            historyApiFallback: {
                rewrites: versionPairs.map(x =>
                    ({
                        from: new RegExp(`^/${x[0]}/${x[1]}/.*`),
                        to: `/${x[0]}/${x[1]}/index.html`,
                    })
                ),
            }
        },
    };
}

module.exports = versionPairs.map(x => createConfig(x[0], x[1]));
