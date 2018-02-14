```js
let intialState = {};

<Switcher
  label="Switch the switcher"
  items={["One", "Two", "Three"]}
  value={state.value}
  onChange={(_, value) => setState({ value })}
/>;
```
