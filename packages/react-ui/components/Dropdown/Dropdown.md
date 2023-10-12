```jsx harmony
import { Dropdown, MenuHeader, MenuItem, MenuSeparator } from '@skbkontur/react-ui';
<Dropdown caption="Click">
  <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
  <MenuSeparator />
  <MenuHeader>Here goes the header</MenuHeader>
  <MenuItem onClick={() => alert('Pow')} comment="With comment.">
    Pow
  </MenuItem>
</Dropdown>;
```

У Dropdown есть 3 стандартных размера.

```jsx harmony
import { Gapped, MenuItem, MenuSeparator, MenuHeader } from '@skbkontur/react-ui';

<Gapped vertical>
  <Dropdown caption="Маленький" size={'small'}>
    <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
    <MenuSeparator />
    <MenuHeader>Here goes the header</MenuHeader>
    <MenuItem onClick={() => alert('Pow')} comment="With comment.">
      Pow
    </MenuItem>
  </Dropdown>
  <Dropdown caption="Средний" size={'medium'}>
    <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
    <MenuSeparator />
    <MenuHeader>Here goes the header</MenuHeader>
    <MenuItem onClick={() => alert('Pow')} comment="With comment.">
      Pow
    </MenuItem>
  </Dropdown>
  <Dropdown caption="Большой" size={'large'}>
    <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
    <MenuSeparator />
    <MenuHeader>Here goes the header</MenuHeader>
    <MenuItem onClick={() => alert('Pow')} comment="With comment.">
      Pow
    </MenuItem>
  </Dropdown>
</Gapped>
```
