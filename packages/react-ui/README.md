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

Нужно использовать [ThemeContext](https://tech.skbkontur.ru/react-ui/#/Customization/ThemeContext). Список переменных
можно глянуть в [ThemeShowcase](https://tech.skbkontur.ru/react-ui/#/Customization/ThemeShowcase)

### StrictMode

Начиная с версий `@skbkontur/react-ui@3.10.0` и `@skbkontur/react-ui-validations@1.7.0`, библиотека поддерживает работу
в React.StrictMode.

Некоторым компонентам библиотеки необходимо иметь доступ до корневой DOM-ноды своих children. Ранее для этого
использовался метод findDomNode, который в StrictMode запрещён. Теперь получение DOM-ноды реализовано в библиотеке через
ref, из-за чего появились некоторые требования к компонентам, передаваемым в Hint, Tooltip, Popup или Tab:

- при передаче функциональных компонентов, они должны использовать `React.ForwardRef`:

```js static
import { Hint } from '@skbkontur/react-ui';

const CustomFunctionComponent = React.forwardRef(
  (props, ref) => <div ref={ref}>children text</div>
);

export const WithFunctionChildren = () => (
  <React.StrictMode>
    <Hint pos="top" text="Something will never be changed" manual opened>
      <CustomFunctionComponent/>
    </Hint>
  </React.StrictMode>
);
```

- при использовании хука `useImperativeHandle`, возвращаемый объект должен реализовывать метод `getRootNode`,
  возвращающий DOM-ноду:

```js static
import { Hint } from '@skbkontur/react-ui';

const ImperativeHandleComponent = React.forwardRef(function FN(_, ref) {
  const rootNode = React.useRef < HTMLDivElement > (null);
  React.useImperativeHandle(ref, () => ({
    foo: 'bar',
    getRootNode: () => rootNode.current,
  }));
  return <div ref={rootNode}>children text</div>;
});

export const WithImperativeHandleChildren = () => (
  <React.StrictMode>
    <Hint pos="top" text="Something will never be changed" manual opened>
      <ImperativeHandleComponent/>
    </Hint>
  </React.StrictMode>
);
```

- при передаче классовых компонентов, их инстанс должен реализовывать метод `getRootNode`, возвращающий DOM-ноду:

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

export const WithClassChildren = () => (
  <React.StrictMode>
    <Hint pos="top" text="Something will never be changed" manual opened>
      <CustomClassComponent/>
    </Hint>
  </React.StrictMode>
);
```

В случае несоблюдения требования, будет использоваться старый метод findDomNode, который не совместим с StrictMode.

Подробнее в [пулл-реквесте](https://github.com/skbkontur/retail-ui/pull/2518)

## FAQ

### Выпадашки и несколько react-рутов

Реакт позволяет создавать несколько рутов. Они могут находится как в независимых ветках, так и быть вложенными.

Даже если один рут находится внутри другого контекст между ними не прокидывается. Это вызывает проблемы в работе
различных выпадашек, типа `Tooltip`, `Select`, `Modal` и других. Начиная с версии `4.26.0` основные сценарии
исправленны.

Однако, при удалении html-элемента, в котором был реакт-рут, необходимо явно размонтировать этот рут перед удалением:

```tsx static
React.useLayoutEffect(
  () => () => {
    if (React.version === 17) {
      rootRef.current && ReactDOM.unmountComponentAtNode(rootRef.current);
    } else if (React.version === 18) {
      setTimeout(() => reactRoot.current?.unmount());
    }
  },
  [],
);
```

---


Когда реакт-руты находятся в независимых ветках, выпадашки не могут автоматически определить своё положение.

Для этого необходимо использовать внутренний компонент `ZIndex`:

```tsx static
import { ZIndex } from '@skbkontur/react-ui/internal/ZIndex';

<ZIndex priority={9001}>
  <div id="root-2" />
</ZIndex>
```

Приоритет `9001` сделает все выпадашки внутри `root-2` выше выпадашек из других рутов. За исключением компонента `Toast`
— он будет всё ещё выше всех.

Если требуется перекрыть и его, то в приоритет надо передать `10001`.

---

В пример ниже несколько Тултипов открываются друг в друге. Каждый вложенный получает `z-index` на основе родительского.

Эта информация передётся через контекст, поэтому Тултип в том же руте но смонтированный рядом получит "дефолтный" `z-index`.

Но если обёрнуть его в компонент `ZIndex`, то контекст можно задать вручную.

```jsx harmony
import ReactDOM from 'react-dom';
import { Tooltip, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';

import { ZIndex } from '@skbkontur/react-ui/internal/ZIndex';

function Root({ children }) {
  const rootRef = React.useRef(null);
  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    if (rootRef.current) {
      const App = () => children;
      children &&
      ReactDOM.render(
        <ThemeContext.Provider value={theme}>
          <App />
        </ThemeContext.Provider>,
        rootRef.current,
      );
    }
  }, []);

  React.useLayoutEffect(
    () => () => {
      rootRef.current && ReactDOM.unmountComponentAtNode(rootRef.current);
    },
    [],
  );

  return <div ref={rootRef} style={{ display: 'inline-block' }} />;
}

function MyTooltip({ pos, color = '#fff', ...props }) {
  const theme = React.useContext(ThemeContext);
  const myTheme = ThemeFactory.create({ tooltipBg: color }, theme);

  return (
    <ThemeContext.Provider value={myTheme}>
      <Tooltip
        pos={pos}
        allowedPositions={[pos]}
        trigger="opened"
        disableAnimations
        {...props}
      />
    </ThemeContext.Provider>
  );
}

<div style={{ display: 'flex', paddingTop: 60 }}>
  <MyTooltip
    render={() => (
      <MyTooltip
        render={() => (
          <MyTooltip
            render={() => 'root 1'}
            pos="right middle"
          >
            root 1
          </MyTooltip>
        )}
        pos="right middle"
      >
        root 1
      </MyTooltip>
    )}
    pos="top left"
  >
    root 1
  </MyTooltip>
  <div style={{ width: 80 }} />
  <MyTooltip render={() => 'root 1'} pos="top center" color="gray">
    root 1
  </MyTooltip>
  <div style={{ width: 20 }} />
  <ZIndex priority={9001}>
    <Root>
      <MyTooltip render={() => 'root 2'} pos="top center">
        root 2
      </MyTooltip>
    </Root>
  </ZIndex>
</div>
```

### Отключение анимаций во время тестирования

Анимации в компонентах отключаются любой из следующих глобальных переменных:

```static
REACT_UI_TEST
process.env.NODE_ENV === 'test'
process.env.REACT_UI_TEST
process.env.REACT_APP_REACT_UI_TEST
process.env.STORYBOOK_REACT_UI_TEST
```

### Прокидывание className и style компонентам

Начиная с версии 2.14.0, стало возможным передавать в компоненты свои css-классы для дополнительной стилизации. Однако,
не стоит пользоваться этой возможностью для вмешательства во внутренние стили компонентов. Верстка компонентов может
быть изменена в любой момент без предупреждения, что приведет к поломке ваших переопределенных стилей.

### Мобильная верстка

С версии 4.0 многие компоненты умеют адаптироваться под мобильные устройства. Подробнее об управлении этим поведением
в [MOBILES.md](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/MOBILES.md).

### Помощь в развитии

Мы рады любой сторонней помощи. Не стесняйтесь писать в [issues](https://github.com/skbkontur/retail-ui/issues)
баги и идеи для развития библиотеки.<br />
