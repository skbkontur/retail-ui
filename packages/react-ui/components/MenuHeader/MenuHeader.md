Базовый пример меню с заголовками.

```jsx harmony
import { Button, MenuItem, DropdownMenu } from '@skbkontur/react-ui';

<DropdownMenu
  menuMaxHeight="10rem"
  caption={<Button use="primary">Сотрудники компании</Button>}
  >
  <MenuHeader>Разработчики</MenuHeader>
  <MenuItem>Вася</MenuItem>
  <MenuItem>Петя</MenuItem>
  <MenuItem>Маша</MenuItem>
  <MenuHeader>Дизайнеры</MenuHeader>
  <MenuItem>Галя</MenuItem>
  <MenuItem>Гриша</MenuItem>
  <MenuItem>Гена</MenuItem>
  <MenuHeader>Продакты</MenuHeader>
  <MenuItem>Валя</MenuItem>
  <MenuItem>Аля</MenuItem>
  <MenuItem>Артём</MenuItem>
</DropdownMenu>
```
