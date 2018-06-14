```js
let initialState = { checked: false };

let toggle = () => setState(state => ({ checked: !state.checked }));

<div>
  <Toggle checked={state.checked} onChange={toggle} />{" "}
  {state.checked ? "On" : "Off"}
</div>;
```
