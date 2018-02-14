```js
let items = ["Grey Face", "Grey Space", "Kappa", "Keepo", "Resident Sleeper"];

let initialState = { value: "Kappa" };

<Autocomplete
  source={items}
  value={state.value}
  onChange={(_, value) => setState({ value })}
/>;
```
