# Библиотека типографики

NPM-пакет со стилями типографики из [Kontur.Typography](https://www.figma.com/design/8NdXy4RQisot40DZI5aG9S/%E2%9A%A1%EF%B8%8F-Kontur-Typography?node-id=251-9&p=f&t=F08piH72ZqK1P8Ab-0).

- Доступно в виде React-компонента, миксинов для SCSS/Less и CSS-классов (Global/Modules)
- Управление отступами и поддержка текстов [в широкой колонке](https://www.figma.com/design/8NdXy4RQisot40DZI5aG9S/%E2%9A%A1%EF%B8%8F-Kontur-Typography?node-id=251-10&t=W8he2Dsk3jSvN3ck-4)

## Установка

```bash
npm i @skbkontur/typography
```

## Использование

#### React компонент

```jsx static
import { Text } from '@skbkontur/typography';

const Component = () => (
  <Text tag="p" size={24} wideColumn noSpacing>
    Параграф 24px в широкой колонке без отступов
  </Text>
);
```

#### CSS класс (глобально)

```js static
import '@skbkontur/typography/Text.css'; // Подключение в App.tsx / App.jsx

const Component = () => <h2 className="t48 noSpacing">Заголовок 48px без отступов</h2>;
```

#### CSS Modules

```js static
import text from '@skbkontur/typography/Text.module.css';

const Component = () => <h2 className={text.t48}>Заголовок 48px</h2>;
```

#### SCSS mixin

```css static
@use '@skbkontur/typography/text' as *;

.component {
  @include t(40, $spacing: true, $wideColumn: false);
}
```

#### Less mixin

```css static
@import '@skbkontur/typography/text';

.component {
  .t(24, @spacing: true, @wideColumn: false);
}
```

## Разработка

- Токены типографики расположены в файле `src/TextTokens.ts`
- `npm run prebuild` — сборка статики CSS/SCSS/Less
- `npm run build` — сборка пакета
