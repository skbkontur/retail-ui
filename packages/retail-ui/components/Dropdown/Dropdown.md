```typescript jsx
import { Dropdown } from '@skbkontur/react-ui/components/Dropdown';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';
import { MenuSeparator } from '@skbkontur/react-ui/components/MenuSeparator';
import { MenuHeader } from '@skbkontur/react-ui/components/MenuHeader';

<Dropdown caption="Click">
  <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
  <MenuSeparator />
  <MenuHeader>Here goes the header</MenuHeader>
  <MenuItem onClick={() => alert('Pow')} comment="With comment.">
    Pow
  </MenuItem>
</Dropdown>;
```
