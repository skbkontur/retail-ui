```jsx harmony
import {DARK_THEME} from "@skbkontur/react-ui/lib/theming/themes/DarkTheme";
import {ThemeContext} from "@skbkontur/react-ui";

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
var darkAbsStyle = {
  ...absStyle,
  borderColor: '#fff'
};

<ThemeContext.Consumer>
  {(theme) => (
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
        <div style={theme === DARK_THEME ? darkAbsStyle : absStyle}>
          <ScrollContainer>
            {items(3).map((i) => (
              <div key={i}>{i}</div>
            ))}
          </ScrollContainer>
        </div>
      </div>
      <div style={divStyle}>
        <div style={theme === DARK_THEME ? darkAbsStyle : absStyle}>
          <ScrollContainer maxHeight={150}>
            {items(30).map((i) => (
              <div key={i}>{i}</div>
            ))}
          </ScrollContainer>
        </div>
      </div>
    </div>
  )}
</ThemeContext.Consumer>
```

Горизонтальный scrollbar.

```jsx harmony
import {DARK_THEME} from "@skbkontur/react-ui/lib/theming/themes/DarkTheme";
import {ThemeContext} from "@skbkontur/react-ui";

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
var darkAbsStyle = {
  ...absStyle,
  borderColor: '#fff'
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

<ThemeContext.Consumer>
  {(theme) => (
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
      <div style={{...divStyle, background: '#888'}}>
        <ScrollContainer invert>
          {items(20).map((i) => (
            <div style={innerStyle} key={i}>
              {i}
            </div>
          ))}
        </ScrollContainer>
      </div>
      <div style={divStyle}>
        <div style={theme === DARK_THEME ? darkAbsStyle : absStyle}>
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
        <div style={theme === DARK_THEME ? darkAbsStyle : absStyle}>
          <ScrollContainer maxHeight={150} maxWidth={200}>
            {items(30).map((i) => (
              <div style={innerStyle} key={i}>
                {i}
              </div>
            ))}
          </ScrollContainer>
        </div>
      </div>
    </div>
  )}
</ThemeContext.Consumer>
```
