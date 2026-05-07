# Библиотека типографики

NPM-пакет со стилями типографики из [Kontur.Typography](https://www.figma.com/design/8NdXy4RQisot40DZI5aG9S/%E2%9A%A1%EF%B8%8F-Kontur-Typography?node-id=251-9&p=f&t=F08piH72ZqK1P8Ab-0).

- Доступно в виде React-компонента, CSS-классов и миксинов для SCSS/Less
- Управление параметрами текста: отступам (spacing), жирностью (weight) и межстрочными интервалами (wide)

## Установка

```bash
npm i @skbkontur/typography
```

## Использование

Доступны 5 вариантов использования

<br />

#### React компонент

<ArgTypes />

```jsx static
import { Text } from '@skbkontur/typography';

const Component = () => (
  <Text as="p" size={24} spacing wide>
    Текст
  </Text>
);
```

#### CSS

```js static
import '@skbkontur/typography/text.css'; // Подключение в точке входа приложения

const Component = () => <p className="t-24 t-spacing t-wide">Текст</p>;
```

#### CSS Modules

```js static
import text from '@skbkontur/typography/Text.module.css';

const Component = () => <p className={`${text.t24} ${text.spacing} ${text.wide}`}>Текст</p>;
```

#### SCSS mixin

```css static
@use '@skbkontur/typography/text' as *;

.component {
  @include t(40, $spacing: false, $wide: false);
}
```

#### Less mixin

```css static
@import '@skbkontur/typography/text';

.component {
  .t(24, @spacing: false, @wide: false);
}
```
