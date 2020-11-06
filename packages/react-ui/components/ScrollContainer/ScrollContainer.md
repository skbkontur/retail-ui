```jsx harmony
function items(count) {
  var items = [];
  for (var i = 0; i < count; ++i) {
    items.push(i);
  }
  return items;
}

var divStyle = {
  display: 'inline-block',
  border: '1px solid #f99',
  height: 200,
  margin: 1,
  position: 'relative',
  verticalAlign: 'top',
  width: 200,
};
var absStyle = {
  border: '1px solid #000',
  boxSizing: 'border-box',
  position: 'absolute',
  width: '100%',
};

<div>
  <div style={divStyle}>
    <ScrollContainer>
      {items(20).map(i => (
        <div key={i}>{i}</div>
      ))}
    </ScrollContainer>
  </div>
  <div style={{ ...divStyle, background: '#888' }}>
    <ScrollContainer invert>
      {items(20).map(i => (
        <div key={i}>{i}</div>
      ))}
    </ScrollContainer>
  </div>
  <div style={divStyle}>
    <div style={absStyle}>
      <ScrollContainer>
        {items(3).map(i => (
          <div key={i}>{i}</div>
        ))}
      </ScrollContainer>
    </div>
  </div>
  <div style={divStyle}>
    <div style={absStyle}>
      <ScrollContainer maxHeight={150}>
        {items(30).map(i => (
          <div key={i}>{i}</div>
        ))}
      </ScrollContainer>
    </div>
  </div>
</div>;
```

На данный момент кастомизируется только вертикальный scrollbar. Горизонтальный, при наличии, остается нативным.

```jsx harmony
function items(count) {
  var items = [];
  for (var i = 0; i < count; ++i) {
    items.push(i);
  }
  return items;
}

var containerStyle = {
  display: 'inline-block',
  border: '1px solid #f99',
  height: 200,
  margin: 1,
  width: 200,
};

var innerStyle = {
  width: 400,
};

<div style={containerStyle}>
  <ScrollContainer>
    {items(20).map(i => (
      <div style={innerStyle} key={i}>
        {i}
      </div>
    ))}
  </ScrollContainer>
</div>;
```
