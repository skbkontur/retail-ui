```jsx harmony
let items = [Select.static(() => <Select.Item>Not selectable</Select.Item>), 'One', 'Two', 'Three', Select.SEP, 'Four'];

let initialState = {};

<Select items={items} value={state.value} onValueChange={value => setState({ value })} />;
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript
interface SelectLocale {
  placeholder?: React.ReactNode;
}

const ru_RU = {
  placeholder: 'Ничего не выбрано',
};

const en_GB = {
  placeholder: 'Nothing selected',
};
```
