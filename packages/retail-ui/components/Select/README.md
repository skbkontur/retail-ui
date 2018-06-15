```jsx


let items = [
  Select.static(() => <Select.Item>Not selectable</Select.Item>),
  'One',
  'Two',
  'Three',
  Select.SEP,
  'Four'
];

let initialState = {};

<Select
  items={items}
  value={state.value}
  onChange={(_, value) => setState({ value })}
/>;
```
