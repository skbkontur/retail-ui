Кастомизация компонентов с помощью библиотеки [`emotion`](https://github.com/emotion-js/emotion)

ThemeProvider - компонент, передающий объект темы вниз по дереву с помощью полифила [`create-react-context.`](https://github.com/jamiebuilds/create-react-context)

Принимает в качестве пропов `children: React.ReactNode` и `value` типа `IThemeIn`:

```typescript
import defaultThemeVariables from './components/variables.less';
import flatThemeVariables from './components/variables.flat.less';

type ThemeType = typeof defaultThemeVariables & typeof flatThemeVariables;
type ThemeInType = Partial<ThemeType>;

interface IThemeIn extends ThemeInType {}
```

В качестве базовой темы выступает объект, полученный из переменных `variables.less`. Объект, переданный в `value` будет смерджен с объектом базовой темой.

Помимо базовой темы, есть плоская тема, собранная из переменных `variables.flat.less`.
Объект плоской темы можно импортировать и передавать в ThemeProvider:

```jsx
const { default: flatTheme } = require('../../lib/theming/themes/FlatTheme.ts');
const { ShowcaseGroup } = require('./Playground/ShowcaseGroup.tsx');

const FlatComponents = () => (
  <ThemeProvider value={flatTheme}>
    <ShowcaseGroup />
  </ThemeProvider>
);

<FlatComponents />;
```

### Варианты кастомизации:

Несколько тем одновременно:
<br/>

```jsx
const { default: flatTheme } = require('../../lib/theming/themes/FlatTheme.ts');
const { ShowcaseGroup } = require('./Playground/ShowcaseGroup.tsx');

const CombinedComponents = () => (
  <>
    <ShowcaseGroup title="Default" />
    <ThemeProvider value={flatTheme}>
      <div>
        <ShowcaseGroup title="Flat" />
      </div>
    </ThemeProvider>
  </>
);

<CombinedComponents />;
```

Вложенные темы:
<br/>

```jsx
const { default: flatTheme } = require('../../lib/theming/themes/FlatTheme');
const { default: defaultTheme } = require('../../lib/theming/themes/DefaultTheme');
const { default: darkTheme } = require('./Playground/darkTheme.ts');
const { ShowcaseGroup } = require('./Playground/ShowcaseGroup.tsx');

const wrapperStyles = {
  border: '1px solid rgb(188, 187, 187)',
  padding: '0 15px 15px',
  marginTop: 25,
};

const NestedThemes = () => (
  <ThemeProvider value={flatTheme}>
    <div style={{ ...wrapperStyles, width: 750 }}>
      <ShowcaseGroup title="Flat Theme" />
      <ThemeProvider value={defaultTheme}>
        <div style={wrapperStyles}>
          <ShowcaseGroup title="Default Theme" />
          <ThemeProvider value={darkTheme}>
            <div style={{ ...wrapperStyles, background: '#000', color: '#fff' }}>
              <ShowcaseGroup title="Dark Theme" />
            </div>
          </ThemeProvider>
        </div>
      </ThemeProvider>
    </div>
  </ThemeProvider>
);

<NestedThemes />;
```

### Playground

Разные варианты стилизации компонентов:

```jsx
const { ThemeProviderPlayground } = require('./__stories__/ThemeProvider.stories.tsx');

<ThemeProviderPlayground />;
```

### Переход с кастомизации с помощью `less`

Для перехода с кастомизации посредстовом переопределения less-переменных, необходимо превратить less-переменные в объект темы.
Это можно сделать с помощью <a target="_blank" href="#">скрипта</a>

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

Далее объект из theme.js можно передавать в ThemeProvider:

```typescript
import ReactDOM from 'react-dom';
import React from 'react';
import ThemeProvider from '${retail-ui|@skbkontur/react-ui}/components/ThemeProvider';

import App from './components/App';
import theme from './theme/theme.js';

ReactDOM.render(
  <ThemeProvider value={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app'),
);
```

В случае, если приложение не является полноценным React-приложением, и тему нужно переопределить единоразово, то можно воспользоваться методом `overrideDefaultTheme` в `ThemeFactory`:

```typescript
// точка входа в приложение
...
import theme from './theme/theme.js';
import ThemeFactory from '${retail-ui|@skbkontur/react-ui}/lib/theming/ThemeFactory.ts';

ThemeFactory.overrideDefaultTheme(theme);
...
```

### Список кастомизируемых компонентов

Посмотреть, какие компоненты можно кастомизировать, а также увидеть, какие переменные используются в каждом из них, можно в [таблице](#/Theming/ThemeVariablesShowcase)
