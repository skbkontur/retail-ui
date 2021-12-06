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
