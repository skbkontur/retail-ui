# Библиотека цветов

В этой библиотеке собраны основные цвета, используемые в интерфейсах Контура. Вся палитра собрана [тут](https://www.figma.com/file/XuiIin3JAOEcHHPihtthOJ/%E2%9A%A1%EF%B8%8F-Kontur-Colors?node-id=0%3A1&t=pL38Ju5ZOo3VC6vt-0).

Установить библиотеку можно командой:

```bash
npm i @skbkontur/colors
```

Сейчас в библиотеке представлены расширения .less, .css, .ts (по запросу могут быть новые расширения)

Названия цветов - это camelCase варианция названия из фигмы.
Например, `Blue Dark / 30` из фигмы в библиотеке можно найти как:
- `@blueDark30` для colors.less
- `--blueDark30` для colors.css
- `Colors.blueDark30` для colors.ts

Пример использования colors.less

```less
// styles.less

@import '@skbkontur/colors/colors.less';

.class {
    color: @blue10;
}
```

Пример использования colors.css

```css
// styles.css

@import '@skbkontur/colors/colors.css';

.class {
    color: var(--blue10);
}
```

Пример использования colors.ts

```ts
// styles.ts

import { KonturColors } from '@skbkontur/colors';

someRenderMethod = () => {
    return (
        <div style={{color: KonturColors.blue10}}>some content</div>
    )
}
```


## Как работает
Все цвета описаны в файле `src/colors.ts`.
В файле `generate.ts` живёт сам код генерации файлов, а запускается генерация командой `npm run build`

## Палитра

```
import { KonturColors } from '@skbkontur/colors';

const styles = {
  storyWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    fontSize: '12px',
  },
  colorBlock: {
    width: '22%',
    alignItems: 'center',
    margin: '10px',
  },
  colorTile: {
    width: '100%',
    height: '30px',
    marginRight: '10px',
    border: '1px #000 solid',
  },
  wordBreak: {
    wordBreak: 'break-word',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

<div style={styles.storyWrapper}>
  {Object.keys(KonturColors).map((colorName) => {
    const colorValue = KonturColors[colorName];
    return (
      <>
        <div style={styles.colorBlock}>
          <div
            style={{
              ...styles.colorTile,
              backgroundColor: colorValue,
            }}
          />
          <div style={styles.title}>
            <div style={styles.wordBreak}>{colorName}</div>
            <div style={styles.wordBreak}>{colorValue}</div>
          </div>
        </div>
      </>
    );
  })}
</div>
```
