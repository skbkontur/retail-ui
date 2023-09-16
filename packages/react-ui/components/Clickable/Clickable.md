`<Clickable />` отрендерит всё, что вы передали ему в качестве детей.
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
```jsx harmony
import { Clickable, clickableStyles, useTheme } from '@skbkontur/react-ui';

const { setTheme, toggleTheme } = useTheme();

<>
  <Clickable className={clickableStyles.buttonDefault()}>
    <button>Кнопка</button>
  </Clickable>
  <button onClick={() => toggleTheme()}>change theme to dark</button>
</>
```

Компонент использует внутри себя пропы `style`, `className`, `data-tid` и `ref`. Чтобы у вас не возникло проблем с использованием компонента вам следует передавать эти пропы на `<Clickable />`, а не на корневого ребёнка, либо научить ваш кастомный React-компонент работать с ними

_В качестве правила большого пальца: не прокидывайте на корневого ребёнка пропы доступные `<Clickable />`._
```jsx harmony
import { Clickable } from '@skbkontur/react-ui';

const CustomChildComponent = React.forwardRef(({ style, children, ...rest }, ref) => {
  return (
    // Деструктурируем проп `style`, чтобы у `<Clickable />` был доступ к нему.
    <button ref={ref} style={{ backgroundColor: 'blue', ...style}} {...rest}>
      {children}
    </button>
  )
});

<Clickable>
  <CustomChildComponent>Кастомный React-компонент</CustomChildComponent>
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
