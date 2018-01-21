```js
const Tooltip = require("../Tooltip").default;

let delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

let maybeReject = x =>
  Math.random() * 3 < 1 ? Promise.reject() : Promise.resolve(x);

let getItems = q =>
  Promise.resolve(
    [
      { value: 1, label: "First" },
      { value: 2, label: "Second" },
      { value: 3, label: "Third" },
      { value: 4, label: "Fourth" },
      { value: 5, label: "Fifth" },
      { value: 6, label: "Sixth" }
    ].filter(
      x =>
        x.label.toLowerCase().includes(q.toLowerCase()) ||
        x.value.toString(10) === q
    )
  )
    .then(delay(500))
    .then(maybeReject);

let initialState = {
  selected: { value: 3, label: "Third" },
  error: false
};

let handleChange = (_, item) => setState({ selected: item, error: false });

let handleUnexpectedInput = () => setState({ error: true, selected: null });

let handleFocus = () => setState({ error: false });

<Tooltip
  closeButton={false}
  render={() => "Item must be selected!"}
  trigger={state.error ? "opened" : "closed"}
>
  <ComboBox
    error={state.error}
    getItems={getItems}
    onChange={handleChange}
    onFocus={handleFocus}
    onUnexpectedInput={handleUnexpectedInput}
    placeholder="Enter number"
    value={state.selected}
  />
</Tooltip>;
```
