```js
const { default: MenuItem } = require("../MenuItem");
const { default: MenuSeparator } = require("../MenuSeparator");
const { default: MenuHeader } = require("../MenuHeader");

<Dropdown caption="Click">
  <MenuItem onClick={() => alert("Clack")}>Clack</MenuItem>
  <MenuSeparator />
  <MenuHeader>Here goes the header</MenuHeader>
  <MenuItem onClick={() => alert("Pow")} comment="With comment.">
    Pow
  </MenuItem>
</Dropdown>;
```
