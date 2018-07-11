**Old version**

```jsx
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

**New version (recommended)**

```jsx
let Start = TopBar.Start;
let End = TopBar.End;
let ItemStatic = TopBar.ItemStatic;
let User = TopBar.User;
let Divider = TopBar.Divider;

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
  <TopBar>
    <Start>
      <ItemStatic>
        <Logotype suffix="ui" withWidget />
      </ItemStatic>
      <Item>
        <Icon name="Baby" color="#666" />
      </Item>
      <Item>
        <Icon name="Baby" color="#666" />
      </Item>
    </Start>
    <End>
      <Item>
        <Icon name="Baby" color="#666" />
      </Item>
      <User userName="Alexander The Great" />
      <Divider/>
      <Item onClick={() => alert("Logout!")}>Выйти</Item>
    </End>
  </TopBar>
  <Loader active caption="neverending...">
    <div style={contentStyle} />
  </Loader>
</div>;
```
