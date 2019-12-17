```jsx
const { default: UndoIcon } = require('@skbkontur/react-icons/Undo');
const { default: FunctionIcon } = require('@skbkontur/react-icons/Function');
const { default: Button } = require('../Button');
const { default: Input } = require('../Input');

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
