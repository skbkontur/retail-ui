### Подключение
**Webpack**

Необходимо в [конфиг webpack](http://webpack.github.io/docs/configuration.html#module-loaders) добавить следующие лоадеры:
```javascript
/* ... */
module: {
  /* ... */
  loaders: [
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0', 'react']
      },
      include: /react-ui-validations/
    },
    {
      test: /\.less$/,
      loaders: ['style', 'css', 'less'],
      include: /react-ui-validations/
    }
  ]
  /* ... */
}
/* ... */
```