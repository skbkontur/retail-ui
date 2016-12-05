# React UI
[![Build Status](https://travis-ci.org/skbkontur/retail-ui.svg?branch=master)](https://travis-ci.org/skbkontur/retail-ui)
[![Test Coverage](https://codeclimate.com/github/skbkontur/retail-ui/badges/coverage.svg)](https://codeclimate.com/github/skbkontur/retail-ui/coverage)

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
      include: /retail-ui/
    },
    {
      test: /\.less$/,
      loaders: ['style', 'css', 'less'],
      include: /retail-ui/
    },
    {test: /\.(png|woff|woff2|eot)$/, loader: "file-loader"}
  ]
  /* ... */
}
/* ... */ 
```
Или можно воспользоваться проектом: [retail-ui-starter](https://git.skbkontur.ru/catalogue/retail-ui-starter)
