```jsx
let items = [Select.static(() => <Select.Item>Not selectable</Select.Item>), 'One', 'Two', 'Three', Select.SEP, 'Four'];

let initialState = {};

<Select items={items} value={state.value} onChange={(_, value) => setState({ value })} />;
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript
interface SelectLocale {
  placeholder?: React.ReactNode;
}

const ru_RU = {
  placeholder: 'ничего не выбрано',
};

const en_GB = {
  placeholder: 'nothing selected',
};
```
