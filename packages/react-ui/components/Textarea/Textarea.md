```jsx harmony
const [value, setValue] = React.useState('');

<Textarea
  value={value}
  onValueChange={setValue}
  autoResize
  placeholder="Through faith we can reign in every area of life"
/>;
```

Счетчик введенных символов

```jsx harmony
const [value, setValue] = React.useState('');

<Textarea
  value={value}
  onValueChange={setValue}
  placeholder="Счетчик появляется при фокусе"
  lengthCounter={10}
  showLengthCounter
  counterHelp="Hello 👋"
/>;
```
