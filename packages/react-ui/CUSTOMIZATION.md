## Резюме

Для кастомизации компонентов используется ThemeContext:
- чтобы задать тему `ThemeContext.Provider`;
- использовать тему в своих компонентах `ThemeContext.Consumer`.

Механизм работы: динамические стили генерируются в зависимости от темы в процессе render'а с помощью <a href="https://www.npmjs.com/package/emotion" target="_blank">emotion</a>, полученные классы добавляются в `className` соответствующих элементов.

## Мотивация

На данный момент существует 2 версии библиотеки:

- _retail-ui_ (собирается в целевом проекте) - с возможностью кастомизации на этапе сборки через переопределение переменных в less-файле;
- _@skbkontur/react-ui_ (собранная версия) - без возможности кастомизации.

Цели <a href="https://github.com/skbkontur/retail-ui/pull/1333" target="_blank">PR #1333</a>:

- предоставить возможность кастомизировать контролы в _@skbkontur/react-ui_ и отказаться от поддержки _retail-ui_;
- предоставить возможность менять тему в рантайме и/или для части сервиса;
- упростить использование переменных из темы в своих компонентах;
- обеспечить бесшовное обновление для пользователей _retail-ui_;
- предоставить разработчикам виджетов (виджет продуктов, чат, мастер импорта и т.п.) возможность использовать тему сервиса-потребителя;

## Реализация

### Механизм работы кастомизации

1. Из файла с переменными (variables.less для стандартной темы, variables.flat.less - для плоской) все значения - после "накатывания" переопределенных в сервисе-потребителе значений - экспортируются в camelCase:

    ```less
    @blue_dark: #1e5aa4;
    @error-main: #d70c17;
    // ...
    @import (optional) '~react-ui-theme';
    // ...
    @value blueDark: @blue_dark;
    @value errorMain: @error-main;
    ```

    Это позволит пользователям _retail-ui_ "просто обновиться" - их переопределенные переменные будут учтены на 2ом шаге при сборке тем.

2. В библиотеке из коробки определены два файла с темами: _lib/theming/themes/DefaultTheme.ts_ и _lib/theming/themes/FlatTheme.ts_.
   В этих файлах определяются вычисляемые (зависящие от других) переменные, например:

    ```typescript
    import DEFAULT_VARIABLES from '../../../components/variables.less';
    import { defineInternalTheme } from './lib/theming/ThemeHelpers';

    const DEFAULT_THEME = defineInternalTheme(DEFAULT_VARIABLES, {
      borderColorFocus: {
        get() {
          return this.blueLight;
        },
      },
      tabColorError: {
        get() {
          return this.btnDangerBg;
        },
      },
      tabColorHoverError: {
        get() {
          return ColorFunctions.lighten(this.tabColorError, '25%');
        },
      },
      inputFocusShadow: {
        get() {
          return `0 0 0 1px ${this.borderColorFocus}`;
        },
      },
    });
    ```

    Так же создаются 2 интерфейса (_lib/theming/Theme.ts_):

    ```typescript
    import { DEFAULT_THEME } from '@skbkontur/react-ui/lib/theming/themes/DefaultTheme';
    import { FLAT_THEME } from '@skbkontur/react-ui/lib/theming/themes/FlatTheme';

    type ThemeType = typeof DEFAULT_THEME & typeof FLAT_THEME;
    type ThemeInType = Partial<ThemeType>;

    export interface Theme extends ThemeType {}
    export interface ThemeIn extends ThemeInType {}
    ```

    **\*ВАЖНО:** файл FlatTheme.ts не используется напрямую ни в одном компоненте и не попадет в итоговый bundle, если не будет использован в явном виде (см. \*Использование плоской темы\_).

3. В статическом классе `ThemeFactory` (_lib/theming/ThemeFactory.ts_) определяется `defaultTheme`.
   `ThemeFactory` так же предоставляет следующие методы:

    ```typescript
    class ThemeFactory {
      // создание новой темы:
      // - создается новый объект с прототипом defaultTheme;
      // - накатываются поля (или дескрипторы для вычисляемых полей) из theme.
      public static create(theme: ThemeIn): Theme;

      // проверяет, является ли тема полной или частичной
      // используется внутри ThemeProvider, чтобы понять, нужно ли создавать тему
      public static isFullTheme(theme: ThemeIn): theme is Theme;

      // возвращает дефолтную тему
      public static getDefaultTheme(): Theme;

      // переопределяет дефолтную тему
      // смотри "Использование плоской темы" и "Кастомизация в legacy-приложениях"
      public static overrideDefaultTheme(theme: ThemeIn): void;

      // вспомогательный метод, позволяющий получить все ключи в теме (включая прототип)
      public static getKeys(theme: Theme): string[];
    }
    ```

    В любой созданной теме дефолтная тема лежит в прототипе, что позволяет получить доступ к базовому значению, например:

    ```typescript
    const darkTheme = {
      get borderColorError() {
        const baseValue = Object.getPrototypeOf(this).borderColorError;
        return ColorFunctions.darken(baseValue, '20%');
      },
    };
    ```

4. Перед тем как использовать собственные значение, нужно c помощью `ThemeFactory.create` создать объект `Theme`, и получившуюся тему передать в `ThemeContext.Provider`.

    ```jsx harmony static
    import { Button, ButtonProps, Gapped, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';

    const myTheme = ThemeFactory.create({ btnBorderRadius: '10px' });

    export const MyComponent = (props: { ok: ButtonProps, cancel: ButtonProps }) => {
      return (
        <ThemeContext.Provider value={myTheme}>
          <Gapped>
            <Button {...props.ok}>My round OK button</Button>
            <Button {...props.cancel}>My round Cancel button</Button>
          </Gapped>
        </ThemeContext.Provider>
      );
    };
    ```

5. Для каждого компонента, в less стилях которого использовались (напрямую или косвенно) переменные из variables.less, с помощью codemode создан файл динамических стилей. Например (_ToastView.styles.ts_):

    ```typescript
    export const jsStyles = {
      root(t: Theme) {
        return css`
          background: ${t.toastBg};
          color: ${t.toastColor};
        `;
      },

      link(t: Theme) {
        return css`
          color: ${t.toastLinkColor};
        `;
      },

      close(t: Theme) {
        return css`
          color: ${t.toastCloseColor};

          &:hover {
            color: ${t.toastCloseHoverColor};
          }
        `;
      },
    };
    ```

    Из less файлов соответствующие стили были удалены.

    Собственно стили в рантейме добавляются в `<head></head>` вашей страницы (по мере использования) библиотекой [emotion](https://www.npmjs.com/package/emotion#css). Используемая функция `css` возвращает строку - имя созданного класса - которое в дальнейшем попадает в `className` соответствующего элемента.

    В react-ui используется отдельный инстанс emotion'а созданный с помощью [create-emotion](https://www.npmjs.com/package/create-emotion) - с ключом 'react-ui'. Это сделано по двум причинам:

    - чтобы избежать конфликтов с проектами, которые используют или захотят использовать emotion;
    - чтобы задать сгенерированным классам дополнительным `scope` для specificityLevel (см. Specificity Level).

6. В каждом кастомизируемом компоненте `render()` завернут в `ThemeContext.Consumer`:

    ```jsx harmony static
    class MyComponent extends React.Component<{}, {}> {
      public render() {
        return (
          <ThemeContext.Consumer>
            {theme => {
              this.theme = theme;
              return this.renderMain();
            }}
          </ThemeContext.Consumer>
        );
      }
    }
    ```

    Это позволяет использовать `this.theme` внутри любого рендерящего метода, например (_Spinner.tsx_):

    ```jsx harmony static
    import styles from './Spinner.less';
    import { jsStyles } from './Spinner.styles';
    import { cx } from '../../lib/theming/Emotion';

    private _renderCloud = (type) => {
      const { props, theme } = this;
      const bgClassName = jsStyles.cloudBg(this.theme);
      const strokeClassName = cx(
        styles.cloudStroke,
        props.dimmed ? jsStyles.cloudStrokeDimmed(theme) : jsStyles.cloudStroke(theme)
      );

      return (
        <svg className={styles.cloud}>
          <path className={bgClassName} />
          <path className={strokeClassName} />
        </svg>
      );
    };

    private _renderCircle = (type) => {
      const { props, theme } = this;
      const strokeClassName = props.dimmed ?
        jsStyles.circleStrokeDimmed(theme) :
        jsStyles.circleStroke(theme);

      return (
        <svg className={cx(styles.circle, jsStyles.circle(theme))}>
          <circle className={strokeClassName} />
        </svg>
      );
    };
    ```

7\. PROFIT :)

### Использование плоской темы

Плоскую тему можно было "включить" вызвав метод `Uprgades.enableFlatDesign()`.
На данный момент существует два механизма "включения" плоской темы:

1. Путь джедая:
   В начале времен, где-то в _App.(j|t)sx_

    ```jsx harmony static
    import { ThemeContext } from '@skbkontur/react-ui';
    import { FLAT_THEME } from '@skbkontur/react-ui/lib/theming/themes/FlatTheme';

    const App = (
      <ThemeContext.Provider value={FLAT_THEME}>
        <div />
      </ThemeContext.Provider>
    );
    ```

2. Для ленивых:

    - выделить и скопировать "ThemeFactory.overrideDefaultTheme(FlatTheme)"
    - ctrl+shift+f -> "Uprgades.enableFlatDesign()" -> enter;
    - вставить "ThemeFactory.overrideDefaultTheme(FlatTheme)";
    - alt+enter 2 раза (add import statement).

    Должно получиться:

    ```typescript
    import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';
    import { FLAT_THEME } from '@skbkontur/react-ui/lib/theming/themes/FlatTheme';

    // вместо:
    // Uprgades.enableFlatDesign();
    ThemeFactory.overrideDefaultTheme(FLAT_THEME);
    ```

### Отказ от less

Так как одной из целей является отказ от поддержки _retail-ui_, проектам, которые сейчас используют `alias` на 'react-ui-theme' в _webpack.config.js_, нужно будет в течение месяца переехать на _@skbkontur/react-ui_:

1. yarn remove retail-ui && yarn add @skbkontur/react-ui

2. заменить по всему проекту `from 'retail-ui/` на `from '@skbkontur/react-ui`

3. сконвертировать свои less-переменные в js-объект с помощью _react-ui-codemodes/customization/variablesConverter.js_ (подробнее в readme по кастомизации на [tech.skbkontur.ru](https://tech.skbkontur.ru/react-ui/))

4. использовать получившийся объект одним из способов, описанных в "Использование плоской темы".

### Кастомизация в legacy-приложениях

В случае, если контролы рендерятся через какую-то общую обертку, достаточно добавить в нее `ThemeContext.Provider` с вашей темой. В противном случае, вам подойдет метод `ThemeFactory.overrideDefaultTheme()`.

### Specificity Level

Переменная @specificity-level в less отвечала за повышение специфичности стилей библиотеки и, по факту, работала только для `MenuItem`. С целью поддержки обратной совместимости она по прежнему берется из variables.less по умолчанию, но в дальнейшем будет удалена.
Вместо нее следует использовать метод `Upgrades.setSpecificityLevel(value: number)`, вызвав его в самом начале жизненного цикла вашего приложения.
В <a href="https://github.com/skbkontur/retail-ui/pull/1333" target="_blank">PR #1333</a> specificity level включается для всех динамических стилей.

## Дополнительно

### ColorFunctions.ts / DimensionFunctions.ts

Несколько функций по работе с цветом вынесены из less в js, их можно использовать в своих темах (_ColorFunctions.ts_):

```typescript
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

```typescript
lighten('hsl(90, 0.8, 0.2)', '20%') === 'hsl(90, 0.8, 0.4)';
lighten('rgba(50, 50, 50, 0.2)', '20%') === 'rgba(102, 102, 102, 0.2)';
lighten('#80e619', 0.2) === '#b3f075';
lighten('crimson', '20%') === '#f16581';
```

Для работы с размерами предусмотрена одна функция (_DimensionFunctions.ts_):

```typescript
shift(value: string, shift: string): string

// пример
DimensionFunctions.shift('100%', '-20') === '80%'
DimensionFunctions.shift('2em', '+2') === '4em'
DimensionFunctions.shift('12', '+1') === '13px'  //если единица измерения не указана - используется px
DimensionFunctions.shift('10.2', '12.333451') === '22.5335px' //дробная часть округляется до 4 знаков
```

### Витрина переменных

Внутренний компонент `ThemeShowcase` (_components/internal/ThemeShowcase/ThemeShowcase.tsx_) используется для отображения того, какие переменные в каких компонентах задействованы.
Информация собирается в рантейме с помощью `Proxy`, поэтому в IE таблица не отображается.

### Playground

Внутренний компонент `Playground` (_components/internal/ThemePlayground/Playground.tsx_) можно использовать для построения своей темы.
Для удобства в редакторе добавлено действие "вывести тему в консоль".

### Performance

При построении `ThemeShowcase` проход по всем динамическим стилям всех компонентов 2 раза (со стандартной и плоской темами) - т.е. около 1700 вызовов занимает меньше 10ms.

### Upgrades.enableSizeMedium16px()

В контролах `Button`, `Input`, `Textarea` для размера `medium` по умолчанию используется размер шрифта равный 14px. В некоторых сервисах использовался `Upgrades.enableSizeMedium16px()`, чтобы переопределить размер шрифта на 16px.
В <a href="https://github.com/skbkontur/retail-ui/pull/1333" target="_blank">PR #1333</a> в тему добавлены 9 переменных:

- `fontSizeSmall = 14px`
- `fontSizeMedium = 14px`
- `fontSizeLarge = 16px`
- `btnFontSizeSmall = fontSizeSmall`
- `btnFontSizeMedium = fontSizeMedium` (в плоской теме переопределено на 16px для обратной совместимости)
- `btnFontSizeLarge = fontSizeLarge`
- `inputFontSizeSmall = fontSizeSmall`
- `inputFontSizeMedium = fontSizeMedium`
- `inputFontSizeLarge = fontSizeLarge`

Если вам нужно использовать 16px для `size === 'medium'` - переопределите соответствующую переменную одним из способов, описанных выше.

### ComboBoxOld, DatePickerOld

В old-компонентах кастомизация не поддерживается.
