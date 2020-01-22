Простой пример

```typescript jsx
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import { MenuSeparator } from '@skbkontur/react-ui/components/MenuSeparator';
import { MenuHeader } from '@skbkontur/react-ui/components/MenuHeader';
import { Button } from '@skbkontur/react-ui/components/Button';

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

С указанием ширины меню

```typescript jsx
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import { MenuSeparator } from '@skbkontur/react-ui/components/MenuSeparator';
import { MenuHeader } from '@skbkontur/react-ui/components/MenuHeader';
import { Button } from '@skbkontur/react-ui/components/Button';

<DropdownMenu caption={<Button use="primary">Открыть меню</Button>} menuWidth={350}>
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

С указанием максимальной высоты меню

```typescript jsx
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import { MenuSeparator } from '@skbkontur/react-ui/components/MenuSeparator';
import { MenuHeader } from '@skbkontur/react-ui/components/MenuHeader';
import { Button } from '@skbkontur/react-ui/components/Button';

<DropdownMenu caption={<Button use="primary">Открыть меню</Button>} menuMaxHeight={150}>
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

В `caption` можно передать любой элемент

```typescript jsx
import MenuIcon from '@skbkontur/react-icons/Menu';
import {MenuItem} from '@skbkontur/react-ui/components/MenuItem';

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
