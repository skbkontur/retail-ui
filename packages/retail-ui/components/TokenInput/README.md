```jsx
const { TokenInputType } = require('./TokenInput');
let delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

let getItems = q =>
  Promise.resolve(
    ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'].filter(
      x => x.toLowerCase().includes(q.toLowerCase()) || x.toString(10) === q
    )
  ).then(delay(500));

let tokenColors = {
  First: {
    idle: 'l-gray',
    active: 'd-gray'
  },
  Second: {
    idle: 'l-blue',
    active: 'd-blue'
  },
  Third: {
    idle: 'l-green',
    active: 'd-green'
  },
  Fourth: {
    idle: 'l-yellow',
    active: 'd-yellow'
  },
  Fifth: {
    idle: 'l-red',
    active: 'd-red'
  },
  Sixth: {
    idle: 'white',
    active: 'black'
  },
  default: {
    idle: 'i-default',
    active: 'a-default'
  }
};

<div style={{ width: '300px' }}>
  <TokenInput
    type={TokenInputType.Combined}
    getItems={getItems}
    selectedItems={state.selectedItems}
    onChange={itemsNew => setState({ selectedItems: itemsNew })}
    renderTokenComponent={(token, value) => {
      return token(tokenColors[value] || tokenColors.default);
    }}
  />
</div>;
```
