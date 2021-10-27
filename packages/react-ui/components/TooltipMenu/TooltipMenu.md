Базовый пример тултип-меню.

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

Тултип-меню с заданной шириной.

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

Тултип-меню с заданной максимальной высотой.

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

Тултип-меню с отключенной анимацией

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

В `caption` можно передать любой элемент.

```jsx harmony
import { MenuItem } from '@skbkontur/react-ui';
import MenuIcon from '@skbkontur/react-icons/Menu';

<TooltipMenu
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
</TooltipMenu>;
```

Тултип-меню всегда всплывающее справа от `caption`.

```jsx harmony
import { MenuItem } from '@skbkontur/react-ui';
import LightbulbIcon from '@skbkontur/react-icons/Lightbulb';

<TooltipMenu
  caption={
    <span style={{ display: 'inline-block' }} tabIndex="0">
      <LightbulbIcon size={32} />
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

Тултип-меню всегда всплывающее сверху от `caption` и выравненное по правому краю `caption`.

```jsx harmony
import { MenuItem } from '@skbkontur/react-ui';
import LightbulbIcon from '@skbkontur/react-icons/Lightbulb';

<TooltipMenu
  caption={
    <span style={{ display: 'inline-block' }} tabIndex="0">
      <LightbulbIcon size={32} />
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

Тултип-меню c шапкой и подвалом.

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';

<TooltipMenu
  header={<MenuHeader>Это шапка</MenuHeader>}
  footer={<MenuHeader>А это подвал</MenuHeader>}
  caption={<Button use="primary">Открыть меню</Button>}
  >
  <MenuItem>Раз</MenuItem>
  <MenuItem>Два</MenuItem>
  <MenuItem>Три</MenuItem>
</TooltipMenu>;
```

Условный рендер элементов тултип-меню (с сохранением поведения [`MenuItem`](#/Components/MenuItem)).

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
