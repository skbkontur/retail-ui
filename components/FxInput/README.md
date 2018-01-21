```js
let initialState = { auto: false };

function handleChange(event) {
  setState({ auto: false, value: event.target.value });
}

function handleRestore() {
  setState({ auto: true, value: "auto" });
}

<FxInput
  auto={state.auto}
  value={state.value}
  onChange={handleChange}
  onRestore={handleRestore}
/>;
```
