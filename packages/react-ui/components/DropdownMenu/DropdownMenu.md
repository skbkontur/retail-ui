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
import { MenuItem, Checkbox, Button } from '@skbkontur/react-ui';

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
  <MenuItem
    onClick={(e) => {
      e.preventDefault();
      setChecked(!checked);
    }}
  >
    <Checkbox checked={checked}>с чекбоксом</Checkbox>
  </MenuItem>
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

Условный рендер элементов меню (с сохранением поведения [`MenuItem`](#/Components/MenuItem)).

```jsx harmony
import {Button, MenuItem, Gapped, MenuSeparator} from '@skbkontur/react-ui';

const [showItems, setShowItems] = React.useState(false);

const hiddenItems = [
  <MenuSeparator />,
  <MenuItem>А я скрываюсь</MenuItem>,
  <MenuItem>И я</MenuItem>,
  <MenuItem>Я с вами</MenuItem>,
];


<Gapped>
  <Button onClick={() => setShowItems(!showItems)}>
    {showItems ? 'Спрятать' : 'Показать'} элементы
  </Button>

  <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
    <MenuItem>Меня видно всегда</MenuItem>
    <MenuItem>Меня тоже</MenuItem>
    <MenuItem>Ага, и меня!</MenuItem>
    {showItems && hiddenItems}
  </DropdownMenu>
</Gapped>
```
