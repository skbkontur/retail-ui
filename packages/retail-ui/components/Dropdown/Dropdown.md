```jsx
import MenuItem from '@skbkontur/react-ui/MenuItem';
import MenuSeparator from '@skbkontur/react-ui/MenuSeparator';
import MenuHeader from '@skbkontur/react-ui/MenuHeader';

<Dropdown caption="Click">
  <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
  <MenuSeparator />
  <MenuHeader>Here goes the header</MenuHeader>
  <MenuItem onClick={() => alert('Pow')} comment="With comment.">
    Pow
  </MenuItem>
</Dropdown>;
```
