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
    idle: 'grayIdle',
    active: 'grayActive'
  },
  Second: {
    idle: 'blueIdle',
    active: 'blueActive'
  },
  Third: {
    idle: 'greenIdle',
    active: 'greenActive'
  },
  Fourth: {
    idle: 'yellowIdle',
    active: 'yellowActive'
  },
  Fifth: {
    idle: 'redIdle',
    active: 'redActive'
  },
  Sixth: {
    idle: 'white',
    active: 'black'
  },
  default: {
    idle: 'defaultIdle',
    active: 'defaultActive'
  }
};

<div style={{ width: '300px' }}>
  <TokenInput
    type={TokenInputType.Combined}
    getItems={getItems}
    selectedItems={state.selectedItems}
    onChange={itemsNew => setState({ selectedItems: itemsNew })}
    renderTokenComponent={(token, value) => {
      return token({ colors: tokenColors[value] || tokenColors.default });
    }}
  />
</div>;
```
