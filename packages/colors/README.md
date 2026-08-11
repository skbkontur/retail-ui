# Библиотека цветов

Kontur Colors — библиотека цветов для продуктов Контура

**Возможности**

- Содержит цветовые схемы для каждого брендового цвета
- Построена на семантических токенах
- Поддерживает тёмные темы
- Доступность. Контрастность цветов по APCA W3
- Полностью синхронизирована с переменными Figma

**Совместимость с любыми веб-фреймворками**

- Работает на CSS-переменных `var(--k-color-token-name)` доступных через JS/SCSS/Less
- Конфигурация сразу нескольких схем через HTML-атрибуты `data-k-brand`, `data-k-accent`, `data-k-theme`
- [Расширеный JS API](./?path=/docs/colors-colors-api--docs) для генерации палитр любых оттенков и создания кастомных токенов

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
