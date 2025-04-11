### Базовый пример меню с заголовками

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

### Размер

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped vertical>
  <MenuFooter size={'small'}>Маленький</MenuFooter>
  <MenuFooter size={'medium'}>Средний</MenuFooter>
  <MenuFooter size={'large'}>Большой</MenuFooter>
</Gapped>
```
