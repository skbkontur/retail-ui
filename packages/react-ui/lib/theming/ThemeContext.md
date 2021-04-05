Для кастомизации компонентов используется ThemeContext, реализуемый через `React.Context<Theme>`

Механизм работы: динамические стили генерируются в зависимости от темы в процессе render'а с помощью <a href="https://www.npmjs.com/package/emotion" target="_blank">emotion</a>, полученные классы добавляются в `className` соответствующих элементов.

Тема задается с помощью `ThemeContext.Provider`:

```jsx static
import { ThemeContext } from '@skbkontur/react-ui';

<ThemeContext.Provider value={theme}>{/* ... */}</ThemeContext.Provider>;
```

Использовать тему в компоненте можно через `ThemeContext.Consumer`:

```jsx static
import { ThemeContext, Button } from '@skbkontur/react-ui';

<ThemeContext.Consumer>
  {theme => /* ... */ }
</ThemeContext.Consumer>
```

`useContext` в функциональных компонентах:

```typescript static
const theme = useContext(ThemeContext);
```

или задать `contextType` для класса:

```typescript static
public static contextType = ThemeContext;
public context: Theme = this.context;
```

Список существующих тем:

| Имя                 | Описание          |
| ------------------- | ----------------- |
| `DEFAULT_THEME`     | Тема по умолчанию |
| `FLAT_THEME`        | Плоская тема      |
| `DEFAULT_THEME_8PX` | 8px тема          |
| `FLAT_THEME_8PX`    | Плоская 8px тема  |

## Примеры использования

### Подключение плоской темы

```jsx harmony
import { ThemeContext, FLAT_THEME } from '@skbkontur/react-ui';
import { ShowcaseGroup } from '@skbkontur/react-ui/internal/ThemePlayground/ShowcaseGroup';

<ThemeContext.Provider value={FLAT_THEME}>
  <ShowcaseGroup title="Flat Theme" />
</ThemeContext.Provider>;
```

### Создание собственной темы

Собственные значения нужно передать в `ThemeFactory.create` и получившуюся тему можно использовать в `ThemeContext.Provider`. `ThemeFactory` расширяет переданный объект, задавая в качестве прототипа объект темы по умолчанию.

```jsx harmony
import { ThemeContext, ThemeFactory } from '@skbkontur/react-ui';
import { ShowcaseGroup } from '@skbkontur/react-ui/internal/ThemePlayground/ShowcaseGroup';

const myTheme = ThemeFactory.create({ btnBorderRadiusSmall: '10px' });

<ThemeContext.Provider value={myTheme}>
  <ShowcaseGroup title="My Theme" />
</ThemeContext.Provider>;
```

Вторым аргументом `ThemeFactory.create` может принимать объект, который будет использован в качестве базовой темы.

```jsx static
import { ThemeFactory } from '@skbkontur/react-ui';
import { FLAT_THEME } from '@skbkontur/react-ui/lib/theming/themes/FlatTheme';

const myFlatTheme = ThemeFactory.create({ btnBorderRadiusSmall: '10px' }, FLAT_THEME);
```

### Использование темы в своих компонентах

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

### Добавление своих переменных

Если вы хотите дополнить одну из тем новыми переменными для своих компонентов, то вы можете использовать отдельный контекст в расширенным объектом темы.

```jsx harmony
import { useContext } from 'react';
import { ThemeFactory, Button } from '@skbkontur/react-ui';

const MyThemeContext = React.createContext(ThemeFactory.create({ myTextColor: 'orange' }));

MyThemeContext.displayName = 'MyThemeContext';

function ButtonLinkWrapper(props) {
  const theme = useContext(MyThemeContext);

  return (
    <Button use="link" {...props}>
      {props.children}
      <span style={{ color: theme.myTextColor }}> ↗</span>
    </Button>
  );
}

<ButtonLinkWrapper>ButtonLinkWrapper</ButtonLinkWrapper>;
```

### Кастомизация в legacy-приложениях

В случае, если контролы рендерятся через какую-то общую обертку, достаточно добавить в нее `ThemeContext.Provider` с вашей темой. В противном случае, вам подойдет метод `ThemeFactory.overrideDefaultTheme()`.

```typescript static
import theme from './theme/theme';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';

ThemeFactory.overrideDefaultTheme(theme);
```

### Варианты кастомизации:

Несколько тем одновременно:
<br/>

```jsx harmony
import { ThemeContext, FLAT_THEME as flatTheme } from '@skbkontur/react-ui';
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
import { ThemeContext, FLAT_THEME as flatTheme, DEFAULT_THEME as defaultTheme } from '@skbkontur/react-ui';
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

## Дополнительно

### ColorFunctions.ts / DimensionFunctions.ts

Несколько функций по работе с цветом вынесены из less в js, их можно использовать в своих темах (_ColorFunctions.ts_):

```typescript static
lighten(colorString: string, amount: number | string, method?: 'absolute' | 'relative'): string
darken(colorString: string, amount: number | string, method?: 'absolute' | 'relative'): string
contrast(colorString: string, darkString?: string, lightString?: string, threshold: number = 0.43): string
red(colorString: string): string
green(colorString: string): string
blue(colorString: string): string
alpha(colorString: string): string
isValid(colorString: string): boolean // проверяет, можно ли распарсить строку в цвет
```

Документацию по их работе можно найти на сайте [less](http://lesscss.org/functions/#color-operations).
В качестве colorString можно передать цвет в одном из форматов: `keyword`, `hex`, `rgb(r, g, b)`, `rgba(r, g, b, a)`, `hsl(h, s, l)`, `hsla(h, s, l, a)`.
В качестве `amount` можно передать строку вида 'N%' или число от 0 до 1.
Все значения больше или меньше возможных обрезаются. Например, для `rgba(300, -100, 123, 20)` `r=255, g=0, b=123, a=1`.
Если распарсить `colorString` не получилось - выбрасывается исключение.
Если это возможно, результат возвращается в том же виде, что и входная строка:

```typescript static
lighten('hsl(90, 0.8, 0.2)', '20%') === 'hsl(90, 0.8, 0.4)';
lighten('rgba(50, 50, 50, 0.2)', '20%') === 'rgba(102, 102, 102, 0.2)';
lighten('#80e619', 0.2) === '#b3f075';
lighten('crimson', '20%') === '#f16581';
```

Для работы с размерами предусмотрена одна функция (_DimensionFunctions.ts_):

```typescript static
shift(value: string, shift: string): string

// пример
DimensionFunctions.shift('100%', '-20') === '80%'
DimensionFunctions.shift('2em', '+2') === '4em'
DimensionFunctions.shift('12', '+1') === '13px'  //если единица измерения не указана - используется px
DimensionFunctions.shift('10.2', '12.333451') === '22.5335px' //дробная часть округляется до 4 знаков
```

### Список кастомизируемых компонентов

Посмотреть, какие компоненты можно кастомизировать, а также увидеть, какие переменные используются в каждом из них, можно в [таблице](#/Customization/ThemeShowcase)
Информация собирается в рантайме с помощью `Proxy`, поэтому в IE таблица не отображается.

### Playground

Внутренний компонент `Playground` (_components/internal/ThemePlayground/Playground.tsx_) можно использовать для построения своей темы.
Для удобства в редакторе добавлено действие "вывести тему в консоль".
