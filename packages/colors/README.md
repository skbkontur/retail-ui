# Библиотека цветов

Kontur Colors — библиотека цветов для продуктов Контура

**Возможности**

- Содержит цветовые схемы для каждого брендового цвета
- Построена на семантических токенах
- Поддерживает тёмные темы
- Выбор цвета текста по воспринимаемому контрасту
- Полностью синхронизирована с переменными Figma

**Совместимость с любыми веб-фреймворками**

- Работает на CSS-переменных `var(--k-color-token-name)` доступных через JS/SCSS/Less
- Конфигурация сразу нескольких схем через HTML-атрибуты `data-k-brand`, `data-k-accent`, `data-k-theme`
- [Расширенный JS API](./?path=/docs/colors-colors-api--docs) для генерации палитр любых оттенков и создания кастомных токенов

## Установка

```bash
npm i @skbkontur/colors
```

## Подключение

<br />

### 1. Подключение CSS

Подключить CSS-файл с одной или несколькими цветовыми схемами продукта: `brand-[цвет]_accent-[gray|brand].css`

```css
/* Список всех цветовых схем. Выберите одну или несколько */
@import '@skbkontur/colors/tokens/brand-red_accent-gray.css';
@import '@skbkontur/colors/tokens/brand-orange_accent-gray.css';
@import '@skbkontur/colors/tokens/brand-mint_accent-brand.css';
@import '@skbkontur/colors/tokens/brand-mint_accent-gray.css';
@import '@skbkontur/colors/tokens/brand-blue_accent-brand.css';
@import '@skbkontur/colors/tokens/brand-blue_accent-gray.css';
@import '@skbkontur/colors/tokens/brand-blue-deep_accent-brand.css';
@import '@skbkontur/colors/tokens/brand-blue-deep_accent-gray.css';
@import '@skbkontur/colors/tokens/brand-green_accent-brand.css';
@import '@skbkontur/colors/tokens/brand-green_accent-gray.css';
@import '@skbkontur/colors/tokens/brand-violet_accent-brand.css';
@import '@skbkontur/colors/tokens/brand-violet_accent-gray.css';
@import '@skbkontur/colors/tokens/brand-purple_accent-brand.css';
@import '@skbkontur/colors/tokens/brand-purple_accent-gray.css';
```

### 2. Конфигурация в HTML

Настройка контекста через 3 data-атрибута:

- **data-k-brand** — брендовый цвет `red | orange | green | mint | blue | blueDeep | violet | purple`
- **data-k-accent** — акцентный цвет `gray | brand`
- **data-k-theme** — тема `light | dark` (по умолчанию light)

```html
<div data-k-brand="orange" data-k-accent="gray" data-k-theme="light">
  <div class="block">Блок Контур.Экстерна</div>

  <div data-k-brand="blue" data-k-accent="brand" data-k-theme="light">
    <div class="banner">Рекламный баннер Контур.Эльбы</div>
  </div>
</div>
```

## Подключение в виджетах

Цвета задает продукт, в который встроен виджет: подключать CSS и указывать data-атрибуты не нужно. Если в продукте нет colors, сработают fallback-значения. Их добавит PostCSS-плагин [@skbkontur/postcss-plugin-k-colors-fallback](https://widgets.skbkontur.ru/widget-platform/RC/tools/postcss-plugins/k-colors-fallback/)

```bash
npm i -D @skbkontur/colors @skbkontur/postcss-plugin-k-colors-fallback
```

Добавьте плагин в `css.postcss.plugins` в `widget/vite.config.ts` и укажите цветовую схему для fallback-значений

```ts
import { getColors } from '@skbkontur/colors/get-colors';
import fallbackPlugin from '@skbkontur/postcss-plugin-k-colors-fallback';

export default {
  css: {
    postcss: {
      plugins: [
        fallbackPlugin({
          tokens: getColors({ brand: 'red', accent: 'gray', theme: 'light' }),
        }),
      ],
    },
  },
};
```

В JS/TS импортируйте токены из `@skbkontur/colors/tokens-default/light`: в них fallback-значения уже есть

В npm-loader плагин не работает (он собирается через tsc), там fallback-значения в CSS указывайте вручную

## Использование

### CSS

Токены доступны в виде CSS-переменных `var(--k-color-token-name)`

```css
.block {
  color: var(--k-color-text-on-accent-default-primary);
  background: var(--k-color-shape-default-accent-faint);
}
```

### JS/TS

Переменные `colors.tokenName` содержат ссылки на `var(--k-color-token-name)`

```js
import * as colors from '@skbkontur/colors';

const text = `
  <div style="color: ${colors.textNeutralHeavy}">
    Блок с текстом
  </div>
`;
```

### SCSS

Переменные `colors.$token-name` содержат ссылки на `var(--k-color-token-name)`

```css
@use '@skbkontur/colors/colors.scss' as *;

.class {
  color: $color-text-neutral-heavy;
}
```

### Less

Переменные `$token-name` содержат ссылки на `var(--k-color-token-name)`

```css
@import '@skbkontur/colors/colors.less';

.class {
  color: $color-text-neutral-heavy;
}
```

> Поддержка Tailwind экспериментальная: имя файла и состав могут измениться.

### Tailwind 4 (экспериментально)

Подключите inline-тему после Tailwind. Она регистрирует все цветовые токены с префиксом `k-` и ссылается на те же CSS-переменные. CSS-файл выбранной цветовой схемы по-прежнему должен быть подключён.

```css
@import 'tailwindcss';
@import '@skbkontur/colors/tailwind.experimental.css';
@import '@skbkontur/colors/tokens/brand-orange_accent-gray.css';
```

### Tailwind 3.3+ (экспериментально)

Начиная с Tailwind 3.3 те же цвета можно зарегистрировать через экспортируемые JS-переменные. Используйте ESM-конфигурацию `tailwind.config.mjs`:

```js
import * as colors from '@skbkontur/colors';

const konturColors = Object.fromEntries(
  Object.values(colors).map((value) => [value.replace(/^var\(--k-color-(.+)\)$/, 'k-$1'), value]),
);

export default {
  theme: {
    extend: {
      colors: konturColors,
    },
  },
};
```

CSS-файл выбранной цветовой схемы также должен быть подключён:

```css
@import '@skbkontur/colors/tokens/brand-orange_accent-gray.css';
```

В обеих версиях Tailwind токены доступны во всех цветовых utilities:

```html
<div data-k-brand="orange" data-k-accent="gray" data-k-theme="light">
  <p class="text-k-text-neutral-heavy bg-k-surface-base border-k-line-neutral-pale">Текст</p>
</div>
```

<br />

## Colors API: генерация палитр и кастомные токены

Библиотека Colors содержит JS API для продвинутых сценариев:

- Генерация палитр для произвольных HEX-цветов, а не только брендовых
- Создание/расширение цветовых палитр с собственными семантическими токенами
- Генерация цветов в форматах для разных платформ (oklch, hex, rgba и др.)
- Перекраска интерфейсов в любой цвет на лету

Функция `getColors` позволяет получать цвета для произвольных `brand`, `accent` и `theme`. Настраивать образцы оттенков `warning`, `error`. Указывать формат цвета, задавать кастомные токены со ссылками на сгенерированные палитры и другие параметры.

```js static
import { getColors } from '@skbkontur/colors';

const colors = getColors({ brand: 'orange', accent: 'gray', theme: 'light' });

const text = `
  <div style="color: ${colors.textNeutralHeavy}">
    Блок с текстом
  </div>
`;
```
