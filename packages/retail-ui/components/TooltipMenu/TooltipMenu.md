Простой пример

```jsx
import MenuItem from '@skbkontur/react-ui/MenuItem';
import MenuSeparator from '@skbkontur/react-ui/MenuSeparator';
import MenuHeader from '@skbkontur/react-ui/MenuHeader';
import Button from '@skbkontur/react-ui/Button';

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

С указанием ширины меню

```jsx
import MenuItem from '@skbkontur/react-ui/MenuItem';
import MenuSeparator from '@skbkontur/react-ui/MenuSeparator';
import MenuHeader from '@skbkontur/react-ui/MenuHeader';
import Button from '@skbkontur/react-ui/Button';

<TooltipMenu caption={<Button use="primary">Открыть меню</Button>} menuWidth={350}>
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

С указанием максимальной высоты меню

```jsx
import MenuItem from '@skbkontur/react-ui/MenuItem';
import MenuSeparator from '@skbkontur/react-ui/MenuSeparator';
import MenuHeader from '@skbkontur/react-ui/MenuHeader';
import Button from '@skbkontur/react-ui/Button';

<TooltipMenu caption={<Button use="primary">Открыть меню</Button>} menuMaxHeight={150}>
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

В `caption` можно передать любой элемент

```jsx
import MenuItem from '@skbkontur/react-ui/MenuItem';
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

Только справа

```jsx
import MenuItem from '@skbkontur/react-ui/MenuItem';
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

Меню только сверху выравненное по правому краю `caption`

```jsx
import MenuItem from '@skbkontur/react-ui/MenuItem';
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
