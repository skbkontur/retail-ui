# React UI

[![Build Status](https://tc.skbkontur.ru/app/rest/builds/buildType:FrontendInfrastructure_Packages_RunAll/statusIcon)](https://tc.skbkontur.ru/project.html?projectId=FrontendInfrastructure_Packages_ReactUI&tab=projectOverview)

- [Варианты использования](#Варианты-использования)
  - [Квик-старт](#Квик-старт) **@skbkontur/react-ui** собранная версия библиотеки
  - [Слоу-старт](#Слоу-старт) **retail-ui** исходники для самостоятельной сборки, для переопределения `.less`-переменных
- [FAQ](#FAQ)

## <a name="Варианты-использования"></a>Варианты использования

### <a name="Квик-старт"></a>Квик-старт

```bash
yarn add @skbkontur/react-ui
```

И используем компонентики у себя в проекте:

```jsx static
import Button from '@skbkontur/react-ui/Button';
import Toast from '@skbkontur/react-ui/Toast';

const MyApp = () => (
  <div>
    Click this button <Button onClick={() => Toast.push('Hey!')}>Click me</Button>
  </div>
);
```

Если ругается, что `regeneratorRuntime` не определен, то необходимо подключить `regenerator-runtime` или `@babel/polyfill`, например в `index.html`

Квик-старт подойдёт, если Вебпак настроен на сборку. Например, вы используете `create-react-app`. В противном случае добавьте в конфиг Вебпака `style-`, `css-` и `file-loader`

### <a name="Слоу-старт"></a>Слоу-старт

```bash
yarn add retail-ui
```

Необходимо установить как зависимости и добавить в [конфиг Вебпака](https://webpack.js.org/configuration/) следующие лоадеры:

```js static
module: {
  rules: [
    {
      test: /\.jsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['proposal-object-rest-spread', 'proposal-class-properties'],
          },
        },
      ],
      include: /retail-ui/,
    },
    {
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { modules: 'global' },
        },
        'less-loader',
      ],
    },
    {
      test: /\.(png|woff|woff2|eot)$/,
      use: ['file-loader'],
    },
  ];
}
```

### Хотим другой цвет кнопки!

Тут придется юзать слоу-старт. В конфиге нужно указать:

```js static
resolve: {
  alias: {
    'react-ui-theme': path.join(__dirname, 'path-to-my-theme-variables.less')
  }
}
```

Список переменных можно глянуть в `components/variables.less`

### Глобальные css-стили приложения портят внешний вид контролов

Если библиотека используется в проекте с легаси, где стилизация сделана прямо по названиям тегов, то внешний вид контролов из библиотеки может сильно испортиться

Если нет возможности разобрать легаси, то можно увеличить специфичность селекторов в библиотеке, тогда стили контролов будут приоритетнее стилей из легаси проекта

Специфичность достигается за счет n-кратного повторения css-класса `react-ui` в селекторе стилей. Количество повторений задается через переменную `@specificity-level`, значение по умолчанию равно нулю, то есть по умолчанию css-класс `react-ui` никак ни на что не будет влиять

Чтобы специфичность заработала в легаси проекте, react-блок, в котором используются компоненты из библиотеки, должен быть обернут в тег с css-классом `react-ui`

Пример настройки специфичности

```less
/* ... */
@specificity-level: 5;
/* ... */
```

## <a name="FAQ"></a>FAQ

### Сломались стили при использовании css-loader 2.x

Во 2-й версии, `css-loader` изменились опции по умолчаниию и был отключена [опции `modules`](https://github.com/webpack-contrib/css-loader/releases/tag/v2.0.0). Чтобы исправить и вернуть предыдущее поведение, надо явно задать в опциях `modules: 'global'`

### Как использовать retail-ui с storybook 5.x?

В 5-й версии изменилось [API сторибука для кастомизации настроек webpack](https://github.com/storybooks/storybook/blob/v5.0.0/MIGRATION.md#webpack-config-simplifcation).
Для упрощения работы `Storybook` с CRA был изменен конфиг webpack по умолчанию. Это порождает проблемы вида [storybooks/storybook#4891](https://github.com/storybooks/storybook/issues/4891).
в конфигурации по умолчанию `css-loader` идет без опций, в то время как `retail-ui` требует указания опции `modules: global`.

**Решение**: Полностью заменить `config.module.rules` конфигурацией из вашего webpack конфига. Или можно воспользоваться библиотекой [`webpack-merge`](https://github.com/survivejs/webpack-merge) для более умной замены правила `/\.css$/`

### Не могу прокинуть css-класс компонентам. Как кастомизировать?

Никак.

### Помощь в развитии

Мы рады любой сторонней помощи. Не стесняйтесь писать в [issues](https://github.com/skbkontur/retail-ui/issues)
баги и идеи для развития библиотеки.<br />
