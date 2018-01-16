# React UI
[![Build Status](https://travis-ci.org/skbkontur/retail-ui.svg?branch=master)](https://travis-ci.org/skbkontur/retail-ui)


- [Changelog](https://github.com/skbkontur/retail-ui/blob/master/CHANGELOG.md)

### Квик-старт
```bash
yarn add @skbkontur/react-ui
```
И используем компонентики у себя в проекте:
```js
/* ... */
import Button from '@skbkontur/react-ui/Button'
import Toast from '@skbkontur/react-ui/Toast'

const MyApp = () => (
  <div>
    Click this button
    {' '}
    <Button onClick={() => Toast.push('Hey!')}>Click me</Button>
  </div>
)
```
Если ругается, что `regeneratorRuntime` не определен,
то необходимо подключить `regenerator-runtime` или `babel-polyfill`,
например в `index.html`

Квик-старт подойдёт, если вебпак настроен на сборку. Например, вы используете `create-react-app`. В противном случае добавьте в конфиг Вебпака `style-`, `css-` и `file-loader`.

### Слоу-старт
Необходимо в [конфиг webpack](https://webpack.js.org/configuration/) добавить следующие лоадеры:
```javascript
/* ... */
module: {
  /* ... */
  loaders: [
    {
      test: /\.jsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'react'
            ],
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties'
            ]
          }
        }
      ],
      include: /retail-ui/
    },
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      include: /retail-ui/
    },
    {
      test: /\.(png|woff|woff2|eot)$/,
      use: ['file-loader']
    }
  ]
  /* ... */
}
/* ... */
```

### Хотим другой цвет кнопки!
Тут придется юзать слоу-старт.
В конфиге нужно указать
```javascript
/* ... */
resolve: {
  /* ... */
  alias: {
    'react-ui-theme.less': 'path-to-my-theme-variables.less'
  }
  /* ... */
}
/* ... */
```
Список переменных можно глянуть в `components/variables.less`

### Не могу прокинуть css-класс компонентам. Как кастомизировать?
Никак.

### Тестирование
Тестирование происходит с использованием [jest](https://facebook.github.io/jest/) и
[gemini](https://gemini-testing.github.io/).
Для запуска тестов на gemini необходимо проставить переменные окружения
`SAUCE_USERNAME` и `SAUCE_ACCESS_KEY`.<br />
Для запуска только __jest__ тестов можно выполнить `npm run unit-test`

### Помощь в развитии
Мы рады любой сторонней помощи. Не стесняйтесь писать в [issues](https://github.com/skbkontur/retail-ui/issues)
баги и идеи для развития библиотеки.<br />
Присылайте пулл-реквесты. Даже если в них нет поддержки IE8. Мы доделаем (:
