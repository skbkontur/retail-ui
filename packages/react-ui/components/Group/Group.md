Контрол `<Group>` умеет работать как с `<Button>`...

```jsx harmony
import FunctionIcon from '@skbkontur/react-icons/Function';
import SearchIcon from '@skbkontur/react-icons/Search';
import { Button, Input } from '@skbkontur/react-ui';

const [value, setValue] = React.useState('Foo');

<Group width={300}>
  <Button>
    <FunctionIcon />
  </Button>
  <Input value={value} width="100%" onValueChange={setValue} />
  <Button>
    <SearchIcon />
  </Button>
  <Button>Bar</Button>
</Group>;
```

...так и с `<Clickable>`

```jsx harmony
import FunctionIcon from '@skbkontur/react-icons/Function';
import SearchIcon from '@skbkontur/react-icons/Search';
import { Clickable, Input } from '@skbkontur/react-ui';


const [value, setValue] = React.useState('Foo');

<Group width={300}>
  <Clickable>
    <FunctionIcon />
  </Clickable>
  <Input value={value} width="100%" onValueChange={setValue} />
  <Clickable>
    <SearchIcon />
  </Clickable>
  <Clickable>Bar</Clickable>
</Group>
```
