Сам по себе `<Clickable />` ничего не рендерит. Компонент становится разметкой, которую вы передаёте в качестве детей.
```jsx harmony
import { Clickable, clickableStyles } from '@skbkontur/react-ui';

<>
  <Clickable>
    <button>Кнопка</button>
  </Clickable>
  <Clickable>
    <a href="/">Ссылка</a>
  </Clickable>
</>
```

По умолчанию `<Clickable />` предоставляет лишь небольшой набор полезных стилей. Для того, чтобы изменить внешний вид элемента вы можете использовать набор классов предоставляемых библиотекой, либо передать в компонент собственные классы.

Для того, чтобы модифицировать состояния компонента вы можете использовать `data`-атрибуты, предоставляемые библиотекой.
```jsx harmony
import { Clickable, clickableStyles } from '@skbkontur/react-ui';

<Clickable>
  <button className={clickableStyles.buttonDefault()}>Кнопка</button>
</Clickable>
```

Для того, чтобы добавить стили для тёмной темы воспользуйтесь селектором `.dark *название вашего класса*`. Чтобы переключиться на тёмную тему используйте хук `useTheme`.
```jsx harmony
import { Clickable, clickableStyles, useTheme } from '@skbkontur/react-ui';

const { theme, toggleTheme } = useTheme({ useOSTheme: false });

<>
<p>Текущая тема: <span style={{ fontWeight: 'bold' }}>{theme}</span></p>
<Clickable>
  <button
    className={clickableStyles.buttonDefault()}
    onClick={() => toggleTheme()}
  >
    Переключить тему
  </button>
</Clickable>
</>
```


Если вы прокинете в компонент неинтерактивный элемент - библиотека автоматически добавит ему необходимые атрибуты для обеспечения доступности. Это нежелательный сценарий, но библиотека никак не ограничивает вас. Вы можете использовать любой тег, в качестве ребёнка.
```jsx harmony
import { Clickable } from '@skbkontur/react-ui';

<Clickable>
  <div onClick={() => alert('Это на самом деле <div />!')}>Как бы кнопка</div>
</Clickable>
```

Если вы передаёте React-компонент в `<Clickable />` - он должен уметь работать с `ref` и деструктурировать пропы, иначе часть функционала `<Clickable />` будет недоступна.
```jsx harmony
import { Clickable } from '@skbkontur/react-ui';

const CustomChildComponent = React.forwardRef((props, ref) => {
  return <button ref={ref} {...props}>{props.children}</button>
});

const ref = React.useRef();

<>
  <Clickable ref={ref}>
    <CustomChildComponent>Кнопка</CustomChildComponent>
  </Clickable>
  <button onClick={() => ref.current.style = 'background-color: red'}>
    Изменить цвет фона соседней кнопки
  </button>
</>
```
