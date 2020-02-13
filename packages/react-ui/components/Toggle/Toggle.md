```jsx harmony
let initialState = { checked: false };

let toggle = () => setState(state => ({ checked: !state.checked }));

<div>
  <Toggle checked={state.checked} onValueChange={toggle} /> {state.checked ? 'On' : 'Off'}
</div>;
```
