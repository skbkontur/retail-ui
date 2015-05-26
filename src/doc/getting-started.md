Webpack
=======

```
$ npm install webpack extract-text-webpack-plugin babel-loader style-loader css-loader less-loader file-loader
```

webpack.config.js:

```
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var publicPath = null;
var plugins = [];
var devtool = undefined;
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
          JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  );
} else {
  publicPath = '/dist/';
  devtool = 'inline-source-map';
}


module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './app',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: publicPath,
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?loose&optional=es7.classProperties',
        include: [
          path.join(__dirname, 'src'),
          /retail-ui\/components/,
        ],
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {test: /\.less$/, loader: 'less-loader'},
      {test: /\.(png|woff|eot)$/, loader: "file-loader"},
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      ui: 'retail-ui/components'
    },
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new webpack.PrefetchPlugin("react"),
  ].concat(plugins),
  devtool: devtool,
};
```

package.json:

```
{
  "scripts": {
    "start": "webpack-dev-server",
    "build": "NODE_ENV=production webpack"
  }
}
```

Запуск dev-сервера:

```
$ npm start
```

Сборка приложения:

```
$ npm run build
```
