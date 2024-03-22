По умолчанию `<Clickable>` рендерится в виде кнопки с тегом `<button>`.

<br/>
<br/>

Это можно изменить при помощи пропов `as` и `view`:

— `as ('button' | 'a' | ReactElement)` — изменяет корневой тег, а также при отсутствии `view` задаёт внешний вид;

— `view ('button' | 'link')` — изменяет внешний вид контрола.

Шорткаты:
- Для получения обычной ссылки достаточно передать `href` в компонент
- Для получения обычной кнопки дополнительные пропы передавать в компонент не нужно
```jsx harmony
import { Gapped, Clickable, clickableStyles } from '@skbkontur/react-ui';
import { XIcon } from '@skbkontur/icons/icons/XIcon';

const bgStyle = {
  backgroundImage: `linear-gradient(to right, rgba(130, 130, 130, 0.5) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(130, 130, 130, 0.5) 1px, transparent 1px)`,
  backgroundSize: `16px 16px`,
  backgroundPosition: `-8px -8px`,
  padding: 16
};

const Component = ({ children, cursor, isSafe, style, ...rest }) => {
  return <a style={{ cursor: cursor, color: isSafe ? 'green' : 'red', ...style }} {...rest}>{children}</a>
};

<>
  <p>Ссылки</p>
  <Gapped gap={15}>
    <Clickable href="/">Default</Clickable>
    <Clickable href="/" use="success">Success</Clickable>
    <Clickable href="/" use="danger">Danger</Clickable>
    <Clickable href="/" use="grayed">Grayed</Clickable>
    <Clickable href="/" error>Error</Clickable>
    <Clickable href="/" disabled>Disabled</Clickable>
  </Gapped>

  <p>Кнопки</p>
  <Gapped vertical>
    <Gapped>
      <Clickable use="default">Default</Clickable>
      <Clickable use="primary">Primary</Clickable>
      <Clickable use="success">Success</Clickable>
      <Clickable use="danger">Danger</Clickable>
      <Clickable use="pay">Pay</Clickable>
      <Clickable use="text">Text</Clickable>
      <Clickable use="backless">Backless</Clickable>
      <Clickable borderless>Borderless</Clickable>
      <Clickable warning>Warning</Clickable>
      <Clickable error>Error</Clickable>
      <Clickable use="default" disabled>Disabled</Clickable>
    </Gapped>
    <Gapped style={bgStyle}>
      <Clickable use="default">Default</Clickable>
      <Clickable use="primary">Primary</Clickable>
      <Clickable use="success">Success</Clickable>
      <Clickable use="danger">Danger</Clickable>
      <Clickable use="pay">Pay</Clickable>
      <Clickable use="text">Text</Clickable>
      <Clickable use="backless">Backless</Clickable>
      <Clickable borderless>Borderless</Clickable>
      <Clickable warning>Warning</Clickable>
      <Clickable error>Error</Clickable>
      <Clickable use="default" disabled>Disabled</Clickable>
    </Gapped>
  </Gapped>

  <p>Гибриды</p>
  <Gapped vertical>
    <Gapped>
      <Clickable as="button" view="link">Кнопка, но выглядит как ссылка</Clickable>
      <Clickable as={Component} cursor="help" isSafe view="link" href="/">
        Кастомный компонент со своими пропами, выглядит как ссылка
      </Clickable>
    </Gapped>

    <Gapped>
      <Clickable view="button" href="/" >Ссылка, но выглядит как кнопка</Clickable>
      <Clickable
        as="button"
        view="custom"
      >
        <div
          style={{
          background: '#3498db',
          color: 'white',
          padding: '10px 7.5px',
          borderRadius: '5px'
        }}
        >
          Кастомный элемент с тегом кнопки и базовыми возможностями Clickable
        </div>
      </Clickable>
    </Gapped>
  </Gapped>
</>
```

В проп `as` помимо тегов вы можете передавать компоненты.

Это очень полезно например, когда вы хотите использовать `<Link />` из `react-router-dom`, при этом сохранив возможности и внешний вид `<Clickable />`, расширив их возможностями `<Link />`. Все пропы из компонента переданного в `as` можно передавать на корень `<Clickable />`, так же как и при передаче обычного тега в `as`.
```jsx harmony
const Button = ({ children, cursor, style, ...rest }) => {
  return (
    <button style={{ cursor: cursor, ...style }} {...rest}>
      {children}
    </button>
  )
};

<Clickable as={Button} cursor="help" view="button">
  Кастомный компонент со своими пропами
</Clickable>
```

Вы можете использовать любой тег в качестве основы для `<Clickable>` (с помощью `as`), но в таком случае вам придётся самостоятельно реализовывать доступность контрола. Поэтому мы рекомендуем использовать только `a` и `button`, если у вас нет весомой причины для использования другого тега.
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Clickable as="div" view="button">
    Это div, но он выглядит как кнопка
  </Clickable>
  <Clickable as="div" view="link">
    Это span, но он выглядит как ссылка
  </Clickable>
</Gapped>
```

В чём польза от кастомного вида (`view="custom"`) по сравнению с оборачиванием в нативную кнопку или ссылку?

Мы уже сбросили все мешающие стили, сделали компонент доступным для пользователей с ограниченными возможностями, а также позаботились о таких приятных мелочах как: корректная обработка отключенного состояния, `data-tid` на корне и обработка `rel` на основе значения из `href`.
```jsx harmony
<Clickable
  style={{
    display: 'inline-block',
    align: 'center',
    background: '#151515',
    color: 'white',
    boxShadow: '-12px 12px 0 0 #ED6742',
    padding: '20px 10px',
    borderRadius: '15px',
    margin: '30px',
  }}
  href="https://kontur.ru/"
  view="custom"
  >
  <div style={{ fontSize: '20px' }}>Контур</div>
  <div style={{ fontSize: '25px', fontWeight: '500' }}>Экосистема для бизнеса</div>
</Clickable>
```

У `<Clickable>` могут быть иконки сразу с обеих сторон, наличие/отсутствие иконок также влияет на отображение в состоянии загрузки.
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';
import { XIcon16Regular } from '@skbkontur/icons/XIcon16Regular';

const [isLoading, setIsLoading] = React.useState(false);

<Gapped gap={20} vertical>
  <Clickable use={isLoading ? 'danger' : 'success'} onClick={() => setIsLoading(!isLoading)}>
    {isLoading ? 'Остановить загрузку!!!' : 'Начать загрузку!'}
  </Clickable>

  <Gapped gap={15}>
    <Clickable loading={isLoading} href="/" leftIcon={<XIcon16Regular />}>
      Иконка слева
    </Clickable>
    <Clickable loading={isLoading} href="/" leftIcon={<XIcon16Regular />} rightIcon={<XIcon16Regular />}>
      Иконка и там, и там
    </Clickable>
    <Clickable loading={isLoading} href="/" rightIcon={<XIcon16Regular />}>
      Иконка справа
    </Clickable>
    <Clickable loading={isLoading} href="/">
      Без иконки
    </Clickable>
  </Gapped>

  <Gapped gap={15}>
    <Clickable loading={isLoading} leftIcon={<XIcon16Regular />}>
      Иконка слева
    </Clickable>
    <Clickable loading={isLoading} leftIcon={<XIcon16Regular />} rightIcon={<XIcon16Regular />}>
      Иконка и там, и там
    </Clickable>
    <Clickable loading={isLoading} rightIcon={<XIcon16Regular />}>
      Иконка справа
    </Clickable>
    <Clickable loading={isLoading}>
      Без иконки
    </Clickable>
  </Gapped>
</Gapped>
```

`<Clickable>` в виде кнопки может быть в одном из трёх размеров: `small`, `medium` или `large`.
```jsx harmony
<div style={{
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    width: "330px"
  }}>
  <Clickable size="small">Маленькая</Clickable>
  <Clickable size="medium">Средняя</Clickable>
  <Clickable size="large">Большая</Clickable>
</div>
```

`Clickable` в виде кнопки может превращаться в кнопки-ссылки, размер стрелок меняется в зависимости от размера кнопки.
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Clickable arrow="left">Стрелка влево</Clickable>
  <Clickable arrow="right">Стрелка вправо</Clickable>
</Gapped>
```

Пример ссылок ведущих на внешние ресурсы.

_Примечание_:

Если в контрол `<Clickable>` передана ссылка, ведущая на внешний ресурс, то `<Clickable>` неявно добавит атрибут `rel` со значением необходимым для внешних ссылок, при этом не трогая атрибут `target`.

Открытие ссылки в новой вкладке остаётся на усмотрение разработчика.

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Clickable href="https://kontur.ru/">
    Откроется <span style={{ color: "#e3071c" }}>в этой</span> вкладке
  </Clickable>
  <Clickable target="_blank" href="https://kontur.ru/">
    Откроется <span style={{ color: "#3f9726" }}>в новой</span> вкладке
  </Clickable>
</Gapped>
```
