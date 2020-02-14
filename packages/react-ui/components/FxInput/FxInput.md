```jsx harmony
let initialState = { auto: false };

function handleValueChange(value) {
  setState({ auto: false, value });
}

function handleRestore() {
  setState({ auto: true, value: 'auto' });
}

<FxInput auto={state.auto} value={state.value} onValueChange={handleValueChange} onRestore={handleRestore} />;
```
