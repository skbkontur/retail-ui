По умолчанию `<Clickable />` предоставляет лишь небольшой набор полезных стилей. Для того, чтобы изменить внешний вид элемента вы можете использовать набор встроенных стилей, либо передать собственные классы.

```jsx harmony
import { Clickable, clickableStyles, useTheme } from '@skbkontur/react-ui';

const { theme, setTheme } = useTheme();

console.log(theme);

<>
  <Clickable
    className={clickableStyles.buttonDefault()}
    render={(props) => <button {...props}>Кнопка</button>}
  />
  <button onClick={() => setTheme('2022DarkTheme')}>change theme to dark</button>
</>
```

`<Clickable />` позволяет изменять корневой элемент с помощью пропа `render`.

```jsx harmony
import { Clickable, clickableStyles } from '@skbkontur/react-ui';

<>
  <Clickable render={(props) => <button {...props}>Кнопка</button>} />
  <Clickable render={(props) => <a {...props} href="/">Ссылка</a>} />
</>
```

Чтобы получить `ref` вам нужно прокинуть его на элемент в функции `render`.

```jsx harmony
import { Clickable } from '@skbkontur/react-ui';

const ref = React.useRef(null);

<>
  <Clickable render={(props) => <button ref={ref} {...props}>Кнопка</button>}/>
  <Clickable render={(props) => <button data-tid="test" onClick={() => ref.current.style = 'color: green'} {...props}>Изменить цвет текста соседней кнопки</button>}/>
</>
```
