Базовый пример элемента меню.

```jsx harmony
  <MenuItem>
    Basic
  </MenuItem>
```

Отключённый элемент меню.
<br/>
К такому элементу не применяются стили при наведении и его нельзя затаргетить с клавиатуры.

```jsx harmony
  <MenuItem disabled>
    Disabled
  </MenuItem>
```

Элемент меню с описанием.

```jsx harmony
  <MenuItem comment="This is description text">
    Menu item with description
  </MenuItem>
```

Элемент меню с иконкой.
```jsx harmony
  import OkIcon from '@skbkontur/react-icons/Ok';

  <MenuItem icon={<OkIcon />}>
    Menu item with an icon
  </MenuItem>
```

Элемент меню обёрнутый в компонент ссылки.

```jsx harmony
  import { Link } from '@skbkontur/react-ui';

  <MenuItem
    href="http://tech.skbkontur.ru/react-ui/"
    component={({ href, ...rest }) => {
      return <Link to={href} {...rest} />
    }}
    >
    Awesome link
  </MenuItem>;
```
