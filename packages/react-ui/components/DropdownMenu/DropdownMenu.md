Базовый пример меню.

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</DropdownMenu>;
```

В проп `caption` помимо компонента можно передать функцию, возвращающую компонент, с помощью которой можно управлять текущим состоянием меню.

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<DropdownMenu caption={({ opened, openMenu, closeMenu, toggleMenu }) => {
    return (
      <>
        <p>Сейчас меню { opened ? 'окрыто' : 'закрыто' }</p>
        <Button onClick={toggleMenu}>Переключить меню</Button>
        <Button onClick={openMenu}>Открыть меню</Button>
        <Button onClick={closeMenu}>Закрыть меню</Button>
      </>
    )
  }}>
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</DropdownMenu>;
```

Меню с заданной шириной.

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<DropdownMenu caption={<Button use="primary">Открыть меню c заданной шириной</Button>} menuWidth={350}>
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</DropdownMenu>;
```

Меню с заданной максимальной высотой.

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<DropdownMenu caption={<Button use="primary">Открыть меню c заданной высотой</Button>} menuMaxHeight={150}>
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</DropdownMenu>;
```

Меню с выпадашкой слева по центру.

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<DropdownMenu positions={["left middle"]} caption={<Button use="primary">Открыть меню</Button>}>
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</DropdownMenu>;
```

Меню c шапкой и подвалом.

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<DropdownMenu
  header={<p>Это шапка в виде обычного текста</p>}
  footer={<Button>А это подвал в виде кнопки</Button>}
  caption={<Button use="primary">Открыть меню</Button>}
  >
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</DropdownMenu>;
```

С иконками и включенным по-умолчанию автоматическим выравниванием текста.

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator, DropdownMenu } from '@skbkontur/react-ui';
import OkIcon from '@skbkontur/react-icons/Ok';

<DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
  <MenuHeader>MenuHeader</MenuHeader>
  <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
  <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
  <MenuItem>MenuItem3</MenuItem>
</DropdownMenu>;
```

С иконками и отключенным автоматическим выравниванием текста.

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator, DropdownMenu } from '@skbkontur/react-ui';
import OkIcon from '@skbkontur/react-icons/Ok';

<DropdownMenu preventIconsOffset caption={<Button use="primary">Открыть меню</Button>}>
  <MenuHeader>MenuHeader</MenuHeader>
  <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
  <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
  <MenuItem>MenuItem3</MenuItem>
</DropdownMenu>
```

Меню с отключенной анимацией.

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<DropdownMenu
  disableAnimations
  caption={<Button use="primary">Открыть меню без анимации</Button>}
  >
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</DropdownMenu>;
```

В `caption` можно передать любой элемент.

```jsx harmony
import MenuIcon from '@skbkontur/react-icons/Menu';
import { MenuItem } from '@skbkontur/react-ui';

<DropdownMenu
  caption={
    <span style={{ display: 'inline-block' }} tabIndex="0">
      <MenuIcon size={32} />
    </span>
  }
  menuWidth="300px"
>
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</DropdownMenu>;
```

Пример с чекбоксом внутри MenuItem.

```jsx harmony
import { MenuItem, Checkbox, Button, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';

const [checked, setChecked] = React.useState(false);

let close;

const renderCaption = ({ openMenu, closeMenu }) => {
  close = closeMenu;
  return (
    <Button onClick={openMenu} use="primary">
      Открыть меню
    </Button>
  );
};

<DropdownMenu caption={renderCaption}>
  <MenuItem onClick={(e) => e.preventDefault()}>Просто пункт</MenuItem>
  <ThemeContext.Provider value={ThemeFactory.create({ menuItemHoverBg: 'initial' })}>
    <MenuItem
      onClick={(e) => {
        e.preventDefault();
        setChecked(!checked);
      }}
    >
      <Checkbox checked={checked}>с чекбоксом</Checkbox>
    </MenuItem>
  </ThemeContext.Provider>
  <MenuItem
    onClick={(e) => {
      e.preventDefault();
      close();
    }}
  >
    Закрыть
  </MenuItem>
</DropdownMenu>
```
