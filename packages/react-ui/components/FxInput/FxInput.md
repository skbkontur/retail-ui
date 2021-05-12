```jsx harmony
const [auto, setAuto] = React.useState(false);
const [value, setValue] = React.useState();

function handleValueChange(value) {
  setAuto(false);
  setValue(value);
}

function handleRestore() {
  setAuto(true);
  setValue('auto');
}

<FxInput auto={auto} value={value} onValueChange={handleValueChange} onRestore={handleRestore} />;
```
