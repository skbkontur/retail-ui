```js
const { default: Loader } = require("../Loader");
const { default: Icon } = require("../Icon");

let Item = TopBar.Item;

let pageStyle = {
  background: "#e6e6e6",
  height: 400,
  border: "1px solid #dedfdf",
  overflow: "hidden"
};

let contentStyle = {
  background: "white",
  padding: 15,
  height: 280
};

<div style={pageStyle}>
  <TopBar
    userName="Alexander The Great"
    suffix="ui"
    onLogout={() => alert("Logout!")}
    leftItems={[
      <Item>
        <Icon name="Baby" color="#666" />
      </Item>
    ]}
  />
  <Loader active caption="neverending...">
    <div style={contentStyle} />
  </Loader>
</div>;
```
