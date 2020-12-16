```jsx harmony
let initialState = { value: '' };
<Textarea
  value={state.value}
  onValueChange={value => setState({ value })}
  autoResize
  placeholder="Through faith we can reign in every area of life"
/>;
```

Счетчик введенных символов

```jsx harmony
const initialState = { value: '' };
const handleValueChange = value => setState({ value });

<Textarea
  value={state.value}
  onValueChange={handleValueChange}
  placeholder="Счетчик появляется при фокусе"
  lengthCounter={10}
  showLengthCounter
  counterHelp="Hello 👋"
/>;
```
