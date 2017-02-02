# React UI
[![Build Status](https://travis-ci.org/skbkontur/retail-ui.svg?branch=master)](https://travis-ci.org/skbkontur/retail-ui)

### Тестирование
Тестирование происходит с использованием [jest](https://facebook.github.io/jest/) и
[gemini](https://gemini-testing.github.io/).
Для запуска тестов на gemini необходимо проставить переменные окружения
`SAUCE_USERNAME` и `SAUCE_ACCESS_KEY`.<br />
Для запуска только __jest__ тестов можно выполнить `npm run test-unit`

### Помощь в развитии
Мы рады любой сторонней помощи. Не стесняйтесь писать в [issues](https://github.com/skbkontur/retail-ui/issues)
баги и идеи для развития библиотеки.<br />
Присылайте пулл-реквесты. Даже если в них нет поддержки IE8. Мы доделаем (:

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
