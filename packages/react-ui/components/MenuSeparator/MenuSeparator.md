Пример меню с разделителями.

```jsx harmony
import { Button, MenuHeader, MenuItem, DropdownMenu } from '@skbkontur/react-ui';

<DropdownMenu caption={<Button use="primary">Открыть меню с разделителями</Button>}>
  <MenuItem>У меня есть разделитель</MenuItem>
  <MenuSeparator />
  <MenuItem>У меня тоже!</MenuItem>
  <MenuSeparator />
  <MenuItem>А у меня нет :(</MenuItem>
  <MenuItem>Как и у меня :(</MenuItem>
</DropdownMenu>;
```
