```typescript jsx
import UndoIcon from '@skbkontur/react-icons/Undo';
import FunctionIcon from '@skbkontur/react-icons/Function';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

let initialState = { auto: false };

let auto = null;
let icon = null;
if (!state.auto) {
  auto = (
    <Button onClick={e => setState({ auto: true })}>
      <UndoIcon />
    </Button>
  );
} else {
  icon = <FunctionIcon />;
}

<Group width={300}>
  {auto}
  <Input mainInGroup leftIcon={icon} onChange={e => setState({ auto: false })} />
  <Button>Hey</Button>
  <Button>Ma</Button>
</Group>;
```
