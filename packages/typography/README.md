# Библиотека типографики

NPM-пакет со стилями типографики продуктов Контура

## Установка

```bash
npm i @skbkontur/typography
```

## Использование

Доступно **5 вариантов** использования: в виде React-компонента, глобальный CSS, CSS-модули и миксины для SCSS/Less

<br />

### 1. React компоненты

Компоненты разделены по семантике на `<Heading>` для заголовков и `<Text>` для основного текста.

<details>
  <summary>Открыть таблицу с пропами</summary>

**Heading**

<ArgTypes of={Heading} />

**Text**

  <ArgTypes of={Text} />
</details>

```jsx static
import { Heading, Text } from '@skbkontur/typography';

const Component = () => (
  <>
    <Heading as="h2" use="heading-xs">
      Заголовок
    </Heading>
    <Text as="p" use="body-m">
      Текст
    </Text>
  </>
);
```

### 2. CSS класс

- `.t-*` — стиль текста
- `.t-[regular|medium|bold]` — классы для изменения начертиния
- `.t-reset` — класс для обнуления внешних отступов

```jsx static
import '@skbkontur/typography/t.css'; // Подключение в точке входа приложения

const Component = () => (
  <>
    <h2 className="t-heading-xl">Заголовок</h2>
    <p className="t-body-wide-m">Текст</p>
  </>
);
```

### 3. CSS Modules

- `t.*` — стиль текста
- `t.[regular|medium|bold]` — классы для изменения начертания
- `t.reset` — класс для сброса внешних отступов

```jsx static
import t from '@skbkontur/typography/t.module.css';

const Component = () => (
  <>
    <h2 className={t.headingXl}>Заголовок</h2>
    <p className={t.bodyWideM}>Текст</p>
  </>
);
```

### 4. SCSS mixin

- `@include t-*()` — стиль текста
- `$weight: [regular|medium|bold]` — начертание
- `$reset: [true|false]` — сброс внешних отступов (по умолчанию false)

```css static
@use '@skbkontur/typography/t.scss' as *;

.header {
  @include t-heading-xl;
}

.component {
  @include t-body-m($weight: bold);
}
```

### 5. Less mixin

- `.t-*()` — стиль текста
- `@weight: [regular|medium|bold]` — начертание
- `@reset: [true|false]` — сброс внешних отступов (по умолчанию false)

```css static
@import '@skbkontur/typography/t.less';

.header {
  .t-heading-xl();
}

.paragraph {
  .t-body-m(@weight: bold);
}
```
