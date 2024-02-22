Сам по себе `<Clickable />` ничего не рендерит. Компонент становится разметкой, которую вы передаёте в качестве детей.
```jsx harmony
import { Gapped, Clickable, clickableStyles } from '@skbkontur/react-ui';

const bgStyle = {
  backgroundImage: `linear-gradient(to right, rgba(130, 130, 130, 0.5) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(130, 130, 130, 0.5) 1px, transparent 1px)`,
  backgroundSize: `16px 16px`,
  backgroundPosition: `-8px -8px`,
  padding: 16
};

<>
  <p>Ссылки</p>
  <Gapped>
    <Clickable as="a" href="/">По умолчанию</Clickable>
    <Clickable as="a" href="/" use="success">Успех</Clickable>
    <Clickable as="a" href="/" use="danger">Опасность</Clickable>
    <Clickable as="a" href="/" use="grayed">Серая</Clickable>
  </Gapped>

  <p>Кнопки</p>
  <Gapped style={bgStyle}>
    <Clickable>По умолчанию</Clickable>
    <Clickable use="primary">Основная</Clickable>
    <Clickable use="success">Успех</Clickable>
    <Clickable use="danger">Опасность</Clickable>
    <Clickable use="pay">Плати</Clickable>
    <Clickable use="text">Текст</Clickable>
    <Clickable use="backless">Без фона</Clickable>
  </Gapped>

  <p>Гибриды</p>
  <Gapped>
    <Clickable as="button" view="link" use="success">Успешная кнопка, но выглядит как ссылка</Clickable>
    <Clickable as="a" href="/" view="button" use="danger">Опасная ссылка, но выглядит как кнопка</Clickable>
    <Clickable as="div" view="button" use="pay">Платный div, но выглядит как кнопка</Clickable>
  </Gapped>
</>
```

Если вы прокидываете элемент отличный от `a` или `button` — вам нужно вручную указать `view`
Если вы прокинете в компонент неинтерактивный элемент - библиотека автоматически добавит ему необходимые атрибуты для обеспечения доступности. Это нежелательный сценарий, но библиотека никак не ограничивает вас. Вы можете использовать любой тег, в качестве ребёнка.
```jsx harmony
import { Clickable } from '@skbkontur/react-ui';

<Clickable as="div">
div
</Clickable>
// <div onClick={() => alert('Это на самом деле <div />!')}>Как бы кнопка</div>
```
