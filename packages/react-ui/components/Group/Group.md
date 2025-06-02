### Базовый пример
```jsx harmony
import { MathFunctionIcon16Regular } from '@skbkontur/icons/icons/MathFunctionIcon/MathFunctionIcon16Regular';
import { SearchLoupeIcon16Regular } from '@skbkontur/icons/icons/SearchLoupeIcon/SearchLoupeIcon16Regular';
import { Button, Input } from '@skbkontur/react-ui';

const [value, setValue] = React.useState('Foo');

<Group width={300}>
  <Button>
    <MathFunctionIcon16Regular />
  </Button>
  <Input value={value} width="100%" onValueChange={setValue} />
  <Button>
    <SearchLoupeIcon16Regular />
  </Button>
  <Button>Bar</Button>
</Group>;
```
