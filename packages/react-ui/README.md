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

### StrictMode

Начиная с версий @skbkontur/react-ui@3.10.0 и @skbkontur/react-ui-validations@1.7.0, библиотека поддерживает работу в StrictMode.

Некоторым компонентам библиотеки необходимо иметь доступ до корневой DOM-ноды своих
children. Ранее для этого использовался метод findDomNode, который в StrictMode запрещён.
Теперь получение DOM-ноды реализовано в библиотеке через ref, из-за чего появились некоторые
требования к компонентам, передаваемым в Hint, Tooltip, Popup или Tab:

- при передаче функциональных компонентов, они должны использовать `React.ForwardRef`;

```js static
import { Hint } from '@skbkontur/react-ui';

const CustomFunctionComponent = React.forwardRef(
  (props, ref) => <div ref={ref}>children text</div>
);

export const withFunctionChildren = () => (
  <React.StrictMode>
    <Hint pos="top" text="Something will never be changed" manual opened>
      <CustomFunctionComponent />
    </Hint>
  </React.StrictMode>
);
```

- при передаче классовых компонентов, их инстанс должен реализовывать метод `getRootNode`, возвращающий DOM-ноду.

```js static
import { Hint } from '@skbkontur/react-ui';

class CustomClassComponent extends React.Component {
  rootNode = React.createRef();

  render() {
    return <div ref={this.rootNode}>children text</div>;
  }

  getRootNode() {
    return this.rootNode.current;
  }
}

export const withClassChildren = () => (
  <React.StrictMode>
    <Hint pos="top" text="Something will never be changed" manual opened>
      <CustomClassComponent />
    </Hint>
  </React.StrictMode>
);
```

В случае несоблюдения требования, будет использоваться старый метод findDomNode, который не совместим с StrictMode.

Подробнее в [пулл-реквесте](https://github.com/skbkontur/retail-ui/pull/2518)

## FAQ

### Отключение анимаций во время тестирования

Анимации в компонентах отключаются любой из следующих переменных окружения:

```static
process.env.NODE_ENV === 'test'
process.env.REACT_UI_TEST
process.env.REACT_APP_REACT_UI_TEST
process.env.STORYBOOK_REACT_UI_TEST
```

### Прокидывание className и style компонентам

Начиная с версии 2.14.0, стало возможным передавать в компоненты свои css-классы для дополнительной стилизации. Однако, не стоит пользоваться этой возможностью для вмешательства во внутренние стили компонентов. Верстка компонентов может быть изменена в любой момент без предупреждения, что приведет к поломке ваших переопределенных стилей.

### Мобильная верстка

С версии 4.0 многие компоненты умеют адаптироваться под мобильные устройства. Подробнее об управлении этим поведением в [MOBILES.md](https://github.com/skbkontur/retail-ui/packages/react-ui/MOBILES.md).

### Помощь в развитии

Мы рады любой сторонней помощи. Не стесняйтесь писать в [issues](https://github.com/skbkontur/retail-ui/issues)
баги и идеи для развития библиотеки.<br />
