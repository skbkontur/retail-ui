# React UI

[![Build Status](https://tc.skbkontur.ru/app/rest/builds/buildType:FrontendInfrastructure_Packages_RunAll/statusIcon)](https://tc.skbkontur.ru/project.html?projectId=FrontendInfrastructure_Packages_ReactUI&tab=projectOverview)

- [Как использовать](#как-использовать)
- [FAQ](#faq)

### Как использовать

```bash
yarn add @skbkontur/react-ui
```

```jsx harmony static
import { Button, Toast } from '@skbkontur/react-ui';

const MyApp = () => (
  <div>
    Click this button <Button onClick={() => Toast.push('Hey!')}>Click me</Button>
  </div>
);
```

### Хотим другой цвет кнопки!

Нужно использовать [ThemeContext](https://tech.skbkontur.ru/react-ui/#/Customization/ThemeContext). Список переменных можно глянуть в [ThemeShowcase](https://tech.skbkontur.ru/react-ui/#/Customization/ThemeShowcase)

### Глобальные css-стили приложения портят внешний вид контролов

Если библиотека используется в проекте с легаси, где стилизация сделана прямо по названиям тегов, то внешний вид контролов из библиотеки может сильно испортиться

Если нет возможности разобрать легаси, то можно увеличить специфичность селекторов в библиотеке, тогда стили контролов будут приоритетнее стилей из легаси проекта

Специфичность достигается за счет n-кратного повторения css-класса `react-ui` в селекторе стилей. Количество повторений задается через переменную `specificityLevel`, значение по умолчанию равно нулю, то есть по умолчанию css-класс `react-ui` никак ни на что не будет влиять

Чтобы специфичность заработала в легаси проекте, react-блок, в котором используются компоненты из библиотеки, должен быть обернут в тег с css-классом `react-ui`

Пример настройки специфичности:

```js static
import { Upgrade } from '@skbkontur/react-ui/lib/Upgrades';

Upgrade.setSpecificityLevel(1);
```

Специфичность должна устанавливаться в коде раньше импорта любых компонентов из библиотеки.

## FAQ

### Есть ли способ отключить анимации во время тестирования?

Анимации в компонентах отключаются переменной окружения `process.env.NODE_ENV === 'test'`.

### Прокидывание className и style компонентам

Начиная с версии 2.14.0, стало возможным передавать в компоненты свои css-классы для дополнительной стилизации. Однако, не стоит пользоваться этой возможностью для вмешательства во внутренние стили компонентов. Верстка компонентов может быть изменена в любой момент без предупреждения, что приведет к поломке ваших переопределенных стилей.

### Помощь в развитии

Мы рады любой сторонней помощи. Не стесняйтесь писать в [issues](https://github.com/skbkontur/retail-ui/issues)
баги и идеи для развития библиотеки.<br />
