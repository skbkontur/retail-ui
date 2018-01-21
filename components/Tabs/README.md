```js
let initialState = { active: "fuji" };

<Tabs value={state.active} onChange={(_, v) => setState({ active: v })}>
  <Tabs.Tab id="fuji">🌋 Fuji</Tabs.Tab>
  <Tabs.Tab id="tahat">⛰ Tahat</Tabs.Tab>
  <Tabs.Tab id="alps">🗻 Alps</Tabs.Tab>
</Tabs>;
```
