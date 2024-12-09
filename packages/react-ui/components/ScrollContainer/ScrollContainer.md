### Базовый пример
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
  border: '1px solid',
  boxSizing: 'border-box',
  position: 'absolute',
  width: '100%',
};

<div>
  <div style={divStyle}>
    <ScrollContainer>
      {items(20).map((i) => (
        <div key={i}>{i}</div>
      ))}
    </ScrollContainer>
  </div>
  <div style={{ ...divStyle, background: '#888' }}>
    <ScrollContainer invert>
      {items(20).map((i) => (
        <div key={i}>{i}</div>
      ))}
    </ScrollContainer>
  </div>
  <div style={divStyle}>
    <div style={absStyle}>
      <ScrollContainer>
        {items(3).map((i) => (
          <div key={i}>{i}</div>
        ))}
      </ScrollContainer>
    </div>
  </div>
  <div style={divStyle}>
    <div style={absStyle}>
      <ScrollContainer maxHeight={150}>
        {items(30).map((i) => (
          <div key={i}>{i}</div>
        ))}
      </ScrollContainer>
    </div>
  </div>
</div>;
```

### Горизонтальный scrollbar

```jsx harmony
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
  border: '1px solid',
  boxSizing: 'border-box',
  position: 'absolute',
  width: '100%',
};

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

<div>
  <div style={divStyle}>
    <ScrollContainer>
      {items(5).map((i) => (
        <div style={innerStyle} key={i}>
          {i}
        </div>
      ))}
    </ScrollContainer>
  </div>
  <div style={{ ...divStyle, background: '#888' }}>
    <ScrollContainer invert>
      {items(20).map((i) => (
        <div style={innerStyle} key={i}>
          {i}
        </div>
      ))}
    </ScrollContainer>
  </div>
  <div style={divStyle}>
    <div style={absStyle}>
      <ScrollContainer maxHeight={150}>
        {items(3).map((i) => (
          <div style={innerStyle} key={i}>
            {i}
          </div>
        ))}
      </ScrollContainer>
    </div>
  </div>
  <div style={divStyle}>
    <div style={absStyle}>
      <ScrollContainer maxHeight={150} maxWidth={200}>
        {items(30).map((i) => (
          <div style={innerStyle} key={i}>
            {i}
          </div>
        ))}
      </ScrollContainer>
    </div>
  </div>
</div>;
```

### Смещение скроллбара

```jsx harmony
const containerStyle = {
  display: 'inline-block',
  border: '1px solid #f99',
  height: 200,
  margin: 1,
  width: 200,
};

const offsetY = {
  top: 8,
  bottom: 8,
  right: 8,
};

<div style={containerStyle}>
  <ScrollContainer offsetY={offsetY}>
    {Array(30).fill(null).map((_,i) => (
      <div key={i}>
        {i}
      </div>
    ))}
  </ScrollContainer>
</div>
```

### Скрытие если нет активности пользователя
Проп `showScrollBar` со значением `scroll` скрывает скроллбар при отсутствии активности пользователя. Задержку на скрытие скроллбара можно регулировать пропом `hideScrollBarDelay` (по умолчанию 500ms)

```jsx harmony
var divStyle = {
  display: 'inline-block',
  border: '1px solid #f99',
  height: 200,
  margin: 1,
  position: 'relative',
  verticalAlign: 'top',
  width: 200,
};
<div style={divStyle}>
  <ScrollContainer showScrollBar={'scroll'}>
    {Array(30).fill(null).map((_,i) => (
      <div key={i}>
        {i}
      </div>
    ))}
  </ScrollContainer>
</div>
```

### Показ скролбара при наведении
Проп `showScrollBar` со значением `hover` позволяет показывать скроллбар только когда курсор находится над скролл контейнером

```jsx harmony
var divStyle = {
  display: 'inline-block',
  border: '1px solid #f99',
  height: 200,
  margin: 1,
  position: 'relative',
  verticalAlign: 'top',
  width: 200,
};


<span>
  <div style={divStyle}>
    <ScrollContainer showScrollBar={'hover'}>
      {Array(30).fill(null).map((_,i) => (
        <div key={i}>
          {i}
        </div>
      ))}
    </ScrollContainer>
  </div>
</span>
```
