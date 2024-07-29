# Библиотека цветов

NPM-пакет для доступа к цветам из общей Figma-библиотеки [Kontur.Colors](https://www.figma.com/file/XuiIin3JAOEcHHPihtthOJ/%E2%9A%A1%EF%B8%8F-Kontur-Colors?node-id=0%3A1&t=pL38Ju5ZOo3VC6vt-0)


## Установка

```bash
npm i @skbkontur/colors
```

## Использование

- JS/TS токены содержатся в объекте `KonturColors`
- В Less виде препроцессорных `@переменных`
- В CSS в виде глобальных `--css-переменных` в `:root { ... }`

#### JS/TS

```js static
import { KonturColors } from '@skbkontur/colors';

const text = `<div style="color: ${KonturColors.blueDark90}">Цвет blueDark90</div>`;
```

#### React

```jsx static
import { KonturColors } from '@skbkontur/colors';

const Component = () => {
    return <div style={{ color: KonturColors.blueDark90 }}>Цвет blueDark90</div>
}
```

#### CSS

```css
@import '@skbkontur/colors/colors.css';

.class {
    color: var(--blueDark90);
}
```

#### Less

```less
@import '@skbkontur/colors/colors.less';

.class {
    color: @blueDark90;
}
```

## Палитра

```jsx
import { KonturColors } from '@skbkontur/colors';
import { Toast } from '@skbkontur/react-ui';
import { css } from '@skbkontur/react-ui/lib/theming/Emotion';

const styles = {
  colors: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  `,
  colorGroup: css`
    break-inside: avoid;
    margin-bottom: 64px;
  `,
  colorBlock: css`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    border: none;
    text-align: left;
    background: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: .1s ease;

    &:hover {
      background: rgba(0,0,0,.06);
    }

    &:active {
      background: rgba(0,0,0,.1);
    }
  `,
  colorTile: css`
    display: block;
    height: 32px;
    width: 32px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    flex-shrink: 0;
  `,
  groupTitle: css`
    display: block;
    font-size: 20px;
    font-weight: 600;
    margin: 0 8px 12px;
  `,
  title: css`
    display: block;
    padding: 1px 0 0 8px;
  `,
  colorName: css`
    display: block;
    font-size: 14px;
    line-height: 1.2;
  `,
  colorValue: css`
    display: block;
    fontSize: 12px;
    color: #8b8b8b;
  }`
};

const colorGroups = Object.entries(KonturColors)
  .reduce((acc, [colorKey, colorValue]) => {
    const firstWord =
      ['greenMint', 'blueDark'].find((color) => colorKey.match(color)) || colorKey.match(/^[a-z]+/)[0];

    acc[firstWord] = { ...acc[firstWord], [colorKey]: colorValue };

    return acc;
  }, {});

<div className={styles.colors}>
  {Object.entries(colorGroups).map(([group, colors]) => {
    return (
      <div className={styles.colorGroup}>
        <div className={styles.groupTitle}>{group}</div>

        {Object.keys(colors).map((colorName) => {
          const colorValue = KonturColors[colorName];
          return (
            <button
              className={styles.colorBlock}
              onClick={() => {
                navigator.clipboard.writeText(colorName)
                Toast.push('Цвет скопирован', null, 1000);
              }}
            >
              <span className={styles.colorTile} style={{ backgroundColor: colorValue }} />
              <span>
                <span className={styles.colorName}>{colorName}</span>
                <span className={styles.colorValue}>{colorValue}</span>
              </span>
            </button>
          );
        })}
      </div>
    )
  })}
</div>
```

## Разработка

- Токены выгружаются в формате `camelCase`
- `src/colors.ts` — файл с токенами
- `npm run build` — сборка пакета в `/dist`
