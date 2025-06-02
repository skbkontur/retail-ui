### Базовый пример меню

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

### Ширина

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

### Максимальная высота

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

### Выпадашка слева по центру

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

### Меню c шапкой и подвалом

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

### Иконка и автовыравнивание текста

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator, DropdownMenu } from '@skbkontur/react-ui';
import { CheckAIcon16Regular } from '@skbkontur/icons/icons/CheckAIcon/CheckAIcon16Regular';;

<DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
  <MenuHeader>MenuHeader</MenuHeader>
  <MenuItem icon={<CheckAIcon16Regular />}>MenuItem1</MenuItem>
  <MenuItem icon={<CheckAIcon16Regular />}>MenuItem2</MenuItem>
  <MenuItem>MenuItem3</MenuItem>
</DropdownMenu>;
```

### Иконка и отключенное автовыравнивание текста

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator, DropdownMenu } from '@skbkontur/react-ui';
import { CheckAIcon16Regular } from '@skbkontur/icons/icons/CheckAIcon/CheckAIcon16Regular';;

<DropdownMenu preventIconsOffset caption={<Button use="primary">Открыть меню</Button>}>
  <MenuHeader>MenuHeader</MenuHeader>
  <MenuItem icon={<CheckAIcon16Regular />}>MenuItem1</MenuItem>
  <MenuItem icon={<CheckAIcon16Regular />}>MenuItem2</MenuItem>
  <MenuItem>MenuItem3</MenuItem>
</DropdownMenu>
```

### Отключенная анимация

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

### Подпись
В `caption` можно передать любой элемент.

```jsx harmony
import { UiMenuBars3HIcon16Regular } from '@skbkontur/icons/icons/UiMenuBars3HIcon/UiMenuBars3HIcon16Regular';
import { MenuItem } from '@skbkontur/react-ui';

<DropdownMenu
  caption={
    <span style={{ display: 'inline-block' }} tabIndex="0">
      <UiMenuBars3HIcon16Regular size={32} />
    </span>
  }
  menuWidth="300px"
>
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</DropdownMenu>;
```

### Чекбокс внутри MenuItem

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

### Условный рендер элементов меню
(с сохранением поведения [MenuItem](#/Components/MenuItem))

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

С использованием фиче-флага menuItemsAtAnyLevel. Mожно использовать различные обертки для пунктов меню.

```jsx harmony
import {
    DropdownMenu,
    Button,
    MenuHeader,
    MenuItem,
    MenuSeparator,
    ReactUIFeatureFlagsContext,
    Gapped
} from '@skbkontur/react-ui';

const groupedMenuItems = (
  <div>
    <MenuItem>MenuItem1</MenuItem>
    <MenuItem>MenuItem2</MenuItem>
    <MenuItem isNotSelectable>Not Selectable</MenuItem>
  </div>
);

<Gapped>
  <ReactUIFeatureFlagsContext.Provider value={{ menuItemsAtAnyLevel: true }}>
    <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
      <>
        <MenuHeader>Заголовок меню</MenuHeader>
        <MenuSeparator />
        <div>
          {groupedMenuItems}
        </div>
      </>
      <MenuItem>MenuItem3</MenuItem>
    </DropdownMenu>
  </ReactUIFeatureFlagsContext.Provider>
</Gapped>;
```


