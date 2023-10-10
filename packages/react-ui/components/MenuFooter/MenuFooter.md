Базовый пример меню с заголовками.

```jsx harmony
import { Button, MenuItem, DropdownMenu } from '@skbkontur/react-ui';

<DropdownMenu
  menuMaxHeight="10rem"
  caption={<Button use="primary">Сотрудники компании</Button>}
  >
  <MenuItem>Вася</MenuItem>
  <MenuItem>Петя</MenuItem>
  <MenuItem>Маша</MenuItem>
  <MenuFooter>Всего 3 человека</MenuFooter>
</DropdownMenu>
```

У MenuFooter есть 3 стандартных размера.

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped vertical>
  <MenuFooter size={SizeType.Small}>Маленький</MenuFooter>
  <MenuFooter size={SizeType.Medium}>Средний</MenuFooter>
  <MenuFooter size={SizeType.Large}>Большой</MenuFooter>
</Gapped>
```
