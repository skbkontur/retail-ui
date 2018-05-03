```jsx
const { default: Icon } = require('../Icon');
const { default: Button } = require('../Button');
const { default: Input } = require('../Input');

let initialState = { auto: false };

let auto = null;
let icon = null;
if (!state.auto) {
  auto = (
    <Button onClick={e => setState({ auto: true })}>
      <Icon name="Undo" />
    </Button>
  );
} else {
  icon = <Icon name="Function" />;
}

<Group width={300}>
  {auto}
  <Input
    mainInGroup
    leftIcon={icon}
    onChange={e => setState({ auto: false })}
  />
  <Button>Hey</Button>
  <Button>Ma</Button>
</Group>;
```
