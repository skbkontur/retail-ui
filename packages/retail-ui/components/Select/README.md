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

#### Локали по умолчанию (см. `LocaleContext`)
```typescript
const ru_RU = {
  Select: {
    placeholder: 'ничего не выбрано'
  }
};

const en_EN = {
  Select: {
    placeholder: 'nothing selected'
  }
};
```
