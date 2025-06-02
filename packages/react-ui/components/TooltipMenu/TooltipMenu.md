### Базовый пример

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<TooltipMenu caption={<Button use="primary">Открыть меню</Button>}>
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>;
```

### Управление состоянием тултип-меню
В проп `caption` помимо компонента можно передать функцию, возвращающую компонент, с помощью которой можно управлять текущим состоянием тултип-меню.

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<TooltipMenu caption={({ opened, openMenu, closeMenu, toggleMenu }) => {
    return (
      <>
        <p>Сейчас тултип-меню { opened ? 'окрыто' : 'закрыто' }</p>
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
</TooltipMenu>;
```

### Ширина

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<TooltipMenu
  caption={<Button use="primary">Открыть меню с заданной шириной</Button>}
  menuWidth={350}
  >
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>;
```

### Максимальная высота

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<TooltipMenu
  caption={<Button use="primary">Открыть меню с заданной высотой</Button>}
  menuMaxHeight={150}
  >
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>;
```

### Отключенная анимация

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<TooltipMenu
  disableAnimations
  caption={<Button use="primary">Открыть меню без анимации</Button>}
  >
  <MenuHeader>Заголовок меню</MenuHeader>
  <MenuSeparator />
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>;
```

### Подпись
В `caption` можно передать любой элемент.

```jsx harmony
import { MenuItem } from '@skbkontur/react-ui';
import { UiMenuBars3HIcon16Regular } from '@skbkontur/icons/icons/UiMenuBars3HIcon/UiMenuBars3HIcon16Regular';

<TooltipMenu
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
</TooltipMenu>;
```

### Тултип-меню всегда всплывающее справа от `caption`

```jsx harmony
import { MenuItem } from '@skbkontur/react-ui';
import { LightbulbIcon16Regular } from '@skbkontur/icons/icons/LightbulbIcon/LightbulbIcon16Regular';

<TooltipMenu
  caption={
    <span style={{ display: 'inline-block' }} tabIndex="0">
      <LightbulbIcon16Regular size={32} />
    </span>
  }
  menuWidth="300px"
  positions={['right top', 'right middle', 'right bottom']}
>
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>;
```

### Тултип-меню всегда всплывающее сверху от `caption` и выравненное по правому краю `caption`

```jsx harmony
import { MenuItem } from '@skbkontur/react-ui';
import { LightbulbIcon16Regular } from '@skbkontur/icons/icons/LightbulbIcon/LightbulbIcon16Regular';

<TooltipMenu
  caption={
    <span style={{ display: 'inline-block' }} tabIndex="0">
      <LightbulbIcon16Regular size={32} />
    </span>
  }
  menuWidth="300px"
  positions={['top right']}
>
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>;
```

### Тултип-меню c шапкой и подвалом

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<TooltipMenu
  header={<p>Это шапка в виде обычного текста</p>}
  footer={<Button>А это подвал в виде кнопки</Button>}
  caption={<Button use="primary">Открыть меню</Button>}
  >
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>;
```

### Иконки и автовыравнивание

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator, TooltipMenu } from '@skbkontur/react-ui';
import { PlusIcon16Regular } from '@skbkontur/icons/icons/PlusIcon/PlusIcon16Regular';

<TooltipMenu caption={<Button use="primary">Открыть меню</Button>}>
  <MenuHeader>MenuHeader</MenuHeader>
  <MenuItem icon={<PlusIcon16Regular />}>MenuItem1</MenuItem>
  <MenuItem icon={<PlusIcon16Regular />}>MenuItem2</MenuItem>
  <MenuItem>MenuItem3</MenuItem>
</TooltipMenu>;
```

### Иконки и автовыравнивание

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator, TooltipMenu } from '@skbkontur/react-ui';
import { PlusIcon16Regular } from '@skbkontur/icons/icons/PlusIcon/PlusIcon16Regular';

<TooltipMenu preventIconsOffset caption={<Button use="primary">Открыть меню</Button>}>
  <MenuHeader>MenuHeader</MenuHeader>
  <MenuItem icon={<PlusIcon16Regular />}>MenuItem1</MenuItem>
  <MenuItem icon={<PlusIcon16Regular />}>MenuItem2</MenuItem>
  <MenuItem>MenuItem3</MenuItem>
</TooltipMenu>
```

### Условный рендер элементов тултип-меню
(с сохранением поведения [MenuItem](#/Components/MenuItem)).

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

  <TooltipMenu caption={<Button use="primary">Открыть меню</Button>}>
    <MenuItem>Меня видно всегда</MenuItem>
    <MenuItem>Меня тоже</MenuItem>
    <MenuItem>Ага, и меня!</MenuItem>
    {showItems && hiddenItems}
  </TooltipMenu>
</Gapped>
```
