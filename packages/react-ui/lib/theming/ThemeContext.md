Темизация компонентов через контекст `React.Context<Theme>`.

Тема задается с помошью `Provider`:

```jsx static
<ThemeContext.Provider value={theme}>...</ThemeContext.Provider>
```

```jsx harmony
import { Button, ThemeContext, FLAT_THEME } from '@skbkontur/react-ui';

<ThemeContext.Provider value={FLAT_THEME}>
  <Button>React UI</Button>
</ThemeContext.Provider>;
```

Использовать тему в компоненте можно через `Consumer`:

```jsx static
<ThemeContext.Consumer>
    {theme => ... }
</ThemeContext.Consumer>
```

```jsx harmony
import { ThemeContext, Button } from '@skbkontur/react-ui';

class ButtonLinkWrapper extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          return (
            <Button use="link" {...this.props}>
              {this.props.children}
              <span style={{ color: theme.textColorDefault }}> ↗</span>
            </Button>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

<ButtonLinkWrapper>ButtonLinkWrapper</ButtonLinkWrapper>;
```

`useContext` в функциональных компонентах:

```typescript static
const theme = useContext(ThemeContext);
```

```jsx harmony
import { useContext } from 'react';
import { ThemeContext, Button } from '@skbkontur/react-ui';

function ButtonLinkWrapper(props) {
  const theme = useContext(ThemeContext);

  return (
    <Button use="link" {...props}>
      {props.children}
      <span style={{ color: theme.textColorDefault }}> ↗</span>
    </Button>
  );
}

<ButtonLinkWrapper>ButtonLinkWrapper</ButtonLinkWrapper>;
```

или задать `contextType` для класса:

```typescript static
static contextType = ThemeContext;
...
const theme = this.context;
```

```jsx harmony
import { ThemeContext, Button } from '@skbkontur/react-ui';

class ButtonLinkWrapper extends React.Component {
  render() {
    const theme = this.context;

    return (
      <Button use="link" {...this.props}>
        {this.props.children}
        <span style={{ color: theme.textColorDefault }}> ↗</span>
      </Button>
    );
  }
}

ButtonLinkWrapper.contextType = ThemeContext;

<ButtonLinkWrapper>ButtonLinkWrapper</ButtonLinkWrapper>;
```

Кастомизация компонентов с помощью библиотеки [`emotion`](https://github.com/emotion-js/emotion)

```typescript
import defaultThemeVariables from './components/variables.less';
import flatThemeVariables from './components/variables.flat.less';

type ThemeType = typeof defaultThemeVariables & typeof flatThemeVariables;
type ThemeInType = Partial<ThemeType>;

interface ThemeIn extends ThemeInType {}
```

В качестве базовой темы выступает объект, полученный из переменных `variables.less`. Объект, переданный в `value` будет смерджен с объектом базовой темой.

Помимо базовой темы, есть плоская тема, собранная из переменных `variables.flat.less`.
Объект плоской темы можно импортировать и передавать в ThemeContext.Provider:

```jsx harmony
import { ThemeContext } from '@skbkontur/react-ui';
import { FLAT_THEME as flatTheme } from '@skbkontur/react-ui/lib/theming/themes/FlatTheme';
import { ShowcaseGroup } from '@skbkontur/react-ui/internal/ThemePlayground/ShowcaseGroup';

const FlatComponents = () => (
  <ThemeContext.Provider value={flatTheme}>
    <ShowcaseGroup />
  </ThemeContext.Provider>
);

<FlatComponents />;
```

### Варианты кастомизации:

Несколько тем одновременно:
<br/>

```jsx harmony
import { ThemeContext } from '@skbkontur/react-ui';
import { FLAT_THEME as flatTheme } from '@skbkontur/react-ui/lib/theming/themes/FlatTheme';
import { ShowcaseGroup } from '@skbkontur/react-ui/internal/ThemePlayground/ShowcaseGroup';

const CombinedComponents = () => (
  <>
    <ShowcaseGroup title="Default" />
    <ThemeContext.Provider value={flatTheme}>
      <div>
        <ShowcaseGroup title="Flat" />
      </div>
    </ThemeContext.Provider>
  </>
);

<CombinedComponents />;
```

Вложенные темы:
<br/>

```jsx harmony
import { ThemeContext } from '@skbkontur/react-ui';
import { FLAT_THEME as flatTheme } from '@skbkontur/react-ui/lib/theming/themes/FlatTheme';
import { DEFAULT_THEME as defaultTheme } from '@skbkontur/react-ui/lib/theming/themes/DefaultTheme';
import { darkTheme } from '@skbkontur/react-ui/internal/ThemePlayground/darkTheme';
import { ShowcaseGroup } from '@skbkontur/react-ui/internal/ThemePlayground/ShowcaseGroup';

const wrapperStyles = {
  border: '1px solid rgb(188, 187, 187)',
  padding: '0 15px 15px',
  marginTop: 25,
};

const NestedThemes = () => (
  <ThemeContext.Provider value={flatTheme}>
    <div style={{ ...wrapperStyles, width: 750 }}>
      <ShowcaseGroup title="Flat Theme" />
      <ThemeContext.Provider value={defaultTheme}>
        <div style={wrapperStyles}>
          <ShowcaseGroup title="Default Theme" />
          <ThemeContext.Provider value={darkTheme}>
            <div style={{ ...wrapperStyles, background: '#000', color: '#fff' }}>
              <ShowcaseGroup title="Dark Theme" />
            </div>
          </ThemeContext.Provider>
        </div>
      </ThemeContext.Provider>
    </div>
  </ThemeContext.Provider>
);

<NestedThemes />;
```

### Переход с кастомизации с помощью `less`

Для перехода с кастомизации посредстовом переопределения less-переменных, необходимо превратить less-переменные в объект темы.
Это можно сделать с помощью <a target="_blank" href="https://raw.githubusercontent.com/skbkontur/retail-ui/master/packages/react-ui-codemod/customization/variablesConverter.js">скрипта</a>

Скрипту необходимо передать два параметра: `variables` - путь до файла с перменными и `output` - путь до файла, в который нужно записать объект темы. Если по пути, переданному в `output`, файла не существует, файл будет создан. В противном случае, он будет перезаписан.

Перед запуском скрипт необходимо скачать и положить в папку с проектом. В процессе конвертации используется пакет [less.js](https://www.npmjs.com/package/less), который скрипт возьмет из зависимостей проекта.

Пример использования:

```shell
node variablesConverter.js variables=../../less/myVariables.less output=../theme/theme.js
```

Для следующего содержимого myVariables.less:

```less
@btn-danger-bg: #e14c30;
@warning-main: #f69c00;
@error-main: #d70c17;
@border-color-gray-dark: rgba(0, 0, 0, 0.28);
@border-color-gray-light: rgba(0, 0, 0, 0.15);
@tab-color-hover-error: lighten(@btn-danger-bg, 20%);
@toggle-bg-warning: @warning-main;
@toggle-bg-error: @error-main;
```

Сгенерируется файл theme.js:

```typescript
export default {
  btnDangerBg: '#e14c30',
  warningMain: '#f69c00',
  errorMain: '#d70c17',
  borderColorGrayDark: 'rgba(0, 0, 0, 0.28)',
  borderColorGrayLight: 'rgba(0, 0, 0, 0.15)',
  tabColorHoverError: '#ee9989',
  toggleBgWarning: '#f69c00',
  toggleBgError: '#d70c17',
};
```

Далее объект из `theme.js` нужно обернуть в `ThemeFactory.create` и можно передавать в ThemeContext.Provider:

```jsx static
import ReactDOM from 'react-dom';
import React from 'react';
import { ThemeContext, ThemeFactory } from '@skbkontur/react-ui';

import App from './components/App';
import theme from './theme/theme';

ReactDOM.render(
  <ThemeContext.Provider value={ThemeFactory.create(theme)}>
    <App />
  </ThemeContext.Provider>,
  document.getElementById('app'),
);
```

В случае, если приложение не является полноценным React-приложением, и тему нужно переопределить единоразово, то можно воспользоваться методом `overrideDefaultTheme` в `ThemeFactory`:

```typescript static
// точка входа в приложение
...
import theme from './theme/theme';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';

ThemeFactory.overrideDefaultTheme(theme);
...
```

### Список кастомизируемых компонентов

Посмотреть, какие компоненты можно кастомизировать, а также увидеть, какие переменные используются в каждом из них, можно в [таблице](#/Customization/ThemeShowcase)
