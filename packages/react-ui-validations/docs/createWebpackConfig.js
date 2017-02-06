/* eslint-disable */
'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var fs = require('fs');

module.exports = (dir, argv, options) => {
    const opts = Object.assign({
        plugins: [],
        hashNames: false,
        publicPath: '/dist/',
    }, options || {});

    const ENV = getEnv(argv);
    const PROD = ENV === 'prod' || ENV === 'test';

    const config = {
        context: __dirname,
        devtool: '#eval',
        entry: {
            'vendor': [
                require.resolve('babel-polyfill'),
                require.resolve('retail-ui/testing'),
                require.resolve('whatwg-fetch'),
                './local_modules/ui/index.js',
                './local_modules/AbsoluteSticky.jsx',
                './local_modules/ui/layout/index.js',
                './local_modules/lodash_without_global.js',
                'react',
                'react-dom',
                'reelm',
                'reelm/fluent',
                'reelm/effects',
                'react-redux',
                'moment',
                'moment/locale/ru',
            ],
            'incidents-app': [
                './src/Incidents/index.js'
            ],
            'message-monitoring': [
                './src/MessageMonitoring/index.js'
            ],
            'organizations': [
                './src/Organizations/index.js'
            ],
            'reporting': [
                './src/Reports/index.js'
            ],
            'supplier-web': [
                './src/SupplierWeb/index.js'
            ],
            'createPriceLightbox': [
                './src/BuyerSelectLightbox/components/index.js'
            ],
            'admin-tools-tasks': [
                './src/RemoteTaskQueueMonitoring/index.js'
            ],
            'validations-demo': [
                './src/ValidationsDemo/index.js'
            ],
            'service-header': [
                './src/ServiceHeader/index.js'
            ],
            'legacy-admin-toolbar': [
                './src/ServiceHeader/legacy-admin-toolbar'
            ],
            'legacy-edi-topbar': [
                './src/ServiceHeader/legacy-edi-topbar'
            ],
            'legacy-footer': [
                './src/ServiceHeader/legacy-footer'
            ],
            'legacy-edi-navigation': [
                './src/ServiceHeader/legacy-edi-navigation'
            ],
        },
        output: {
            path: path.resolve(dir, 'dist'),
            publicPath: opts.publicPath,
            filename: getOutputFilename(opts.hashNames, 'js'),
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['react-hot', 'babel'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(c|le)ss$/,
                    exclude: /node_modules/,
                    loader: PROD
                        ? ExtractTextPlugin.extract('classnames', 'style!css!postcss!less')
                        : 'classnames!style!css?localIdentName=[name]-[local]-[hash:base64:4]!less'
                },
                {
                    test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
                    exclude: /node_modules/,
                    loader: 'file-loader',
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel',
                    query: {
                        presets: [
                            require.resolve('babel-preset-es2015'),
                            require.resolve('babel-preset-react'),
                            require.resolve('babel-preset-stage-0'),
                        ],
                    },
                    include: /retail-ui|fast-memoize/,
                    exclude: /retail-ui(\\|\/)node_modules/,
                },
                {
                    test: /\.(c|le)ss$/,
                    include: /retail-ui/,
                    exclude: /retail-ui(\\|\/)node_modules/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?localIdentName=[name]-[local]-[hash:base64:4]!postcss-loader!less-loader'),
                },
                {
                    test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
                    include: /retail-ui/,
                    exclude: /retail-ui(\\|\/)node_modules/,
                    loader: 'file-loader',
                },
            ],
        },
        resolve: {
            modulesDirectories: ['node_modules', 'local_modules', 'web_modules'],
            extensions: ['', '.adapter.js','.js', '.jsx'],
        },
        resolveLoader: {
            root: path.resolve(__dirname, 'node_modules'),
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.API': JSON.stringify(getApiMode(argv)),
            }),
            new ExtractTextPlugin(getOutputFilename(opts.hashNames, 'css')),
            new webpack.optimize.CommonsChunkPlugin("vendor", opts.hashNames ? "vendor.[hash].js" : "vendor.js")
        ].concat(opts.plugins),
        devServer: {
            proxy: {
                '/IncidentsProxy/*': bypassNetSuiteApi(),
                '/internal-api/*': localApi(),
                '*/Incidents*': bypassTo('/public/Incidents.html'),
                '*/Monitoring/*': bypassTo('/public/MessageMonitoring.html'),
                '/Monitoring/*': bypassTo('/public/MessageMonitoring.html'),
                '/Organizations/*': bypassTo('/public/Organizations.html'),
                '*/Reports/*': bypassTo('/public/Reports.html'),
                '*/Supplier/*': bypassTo('/public/SupplierWeb.html'),
                '/Playground': bypassTo('/public/Playground.html'),
                '/AdminTools/Tasks*': bypassTo('/public/RemoteTaskQueueMonitoring.html'),
                '/ValidationsDemo*': bypassTo('/public/ValidationsDemo.html'),
                '/ServiceHeader': bypassTo('/public/ServiceHeader.html'),
            },
            stats: {
                colors: true,
                hash: false,
                version: false,
                timings: true,
                assets: false,
                chunks: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                errors: true,
                errorDetails: true,
                warnings: true,
                publicPath: false
            }
        },
        postcss: [ autoprefixer ]
    };

    if (PROD) {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
            })
        );
    }
    else {
        config.entry['playground'] = [
            './src/Playground/index.js'
        ];
    }
    return config;
};

function localApi() {
    return {
        target: 'http://localhost.dev.kontur:2233/'
    }
}

function bypassNetSuiteApi() {
    // Написано экспериментальным путём (для webpack-dev-server 1.14), возможно есть решение лучше
    return {
        target: 'https://rest.na1.netsuite.com',
        secure: false,
        headers: {
            ['content-type']: "application/json",
            ['Authorization']: "NLAuth nlauth_account=3883090, nlauth_email=vip@edi.kontur.ru, nlauth_signature=LYKtITWlqbP6Aw, nlauth_role=3",
        },
        changeOrigin: true,
        bypass: function(req, res, proxyOptions) {
            req.url = 'https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?deploy=1' + '&' + req.url.replace('/IncidentsProxy/?', '');
        }
    };
}

function remoteApi(host) {
    return {
        target: 'https://' + host +'/',
        secure: false,
        headers: {
            host: host
        },
        bypass: function(req, res, proxyOptions) {
            if (fs.existsSync('auth.sid')) {
                var auth = fs.readFileSync('auth.sid', { encoding: 'utf8' });
                auth = auth.replace('\n', '');
                var cookie = req.headers.cookie;
                req.headers.cookie = cookie + '; auth.sid=' + auth;
            }
        }
    };
}

function bypassTo(pathToHtml) {
    return {
        secure: false,
        bypass: function(req) {
            return pathToHtml;
        }
    }
}

function getApiMode(argv) {
    for (const arg of argv) {
        if (arg.startsWith('--api=')) {
            return arg.substr('--api='.length);
        }
    }
    return 'real';
}

function getEnv(argv) {
    for (const arg of argv) {
        if (arg.startsWith('--env=')) {
            return arg.substr('--env='.length);
        }
    }
    return 'dev';
}

function getOutputFilename(hashNames, ext) {
    return (hashNames ? '[name].[hash].' : '[name].') + ext;
}
