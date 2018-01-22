```js
const { default: Gapped } = require("../Gapped");

function render() {
  return <div>Hey there!</div>;
}

<Gapped vertical>
  <Tooltip render={render} pos="right top">
    <div style={{ height: 100, background: "#f99" }} />
  </Tooltip>

  <Tooltip render={render} pos="right top">
    <div style={{ width: 100, height: 100, background: "#f99" }} />
  </Tooltip>

  <Tooltip render={render} pos="top right">
    top right
  </Tooltip>

  <Tooltip render={render} pos="top center" trigger="click">
    top center (click)
  </Tooltip>

  <Tooltip render={render} pos="bottom left">
    bottom left
  </Tooltip>

  <Tooltip render={render} pos="right top">
    right top
  </Tooltip>

  <Tooltip render={render} pos="right middle">
    right middle
  </Tooltip>

  <Tooltip render={render}>
    <span style={{ border: "1px solid" }}>?</span>
  </Tooltip>
</Gapped>;
```
