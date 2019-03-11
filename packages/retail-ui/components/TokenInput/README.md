```jsx
const { default: Token } = require('../Token');
const { TokenInputType } = require('./TokenInput');
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

const getItems = q =>
  Promise.resolve(
    ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'].filter(
      x => x.toLowerCase().includes(q.toLowerCase()) || x.toString(10) === q,
    ),
  ).then(delay(500));

const tokenColors = {
  First: {
    idle: 'grayIdle',
    active: 'grayActive',
  },
  Second: {
    idle: 'blueIdle',
    active: 'blueActive',
  },
  Third: {
    idle: 'greenIdle',
    active: 'greenActive',
  },
  Fourth: {
    idle: 'yellowIdle',
    active: 'yellowActive',
  },
  Fifth: {
    idle: 'redIdle',
    active: 'redActive',
  },
  Sixth: {
    idle: 'white',
    active: 'black',
  },
  default: {
    idle: 'defaultIdle',
    active: 'defaultActive',
  },
};

<div style={{ width: '300px' }}>
  <TokenInput
    type={TokenInputType.Combined}
    getItems={getItems}
    selectedItems={state.selectedItems}
    onChange={itemsNew => setState({ selectedItems: itemsNew })}
    renderToken={(item, { isActive, onClick, onRemove }) => (
      <Token
        key={item.toString()}
        colors={tokenColors[item] || tokenColors.default}
        isActive={isActive}
        onClick={onClick}
        onRemove={onRemove}
      >
        {item}
      </Token>
    )}
  />
</div>;
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript
const ru_RU = {
  TokenInput: {
    addButtonComment: 'Нажмите Enter или поставьте запятую',
    addButtonTitle: 'Добавить',
  },
};

const en_EN = {
  TokenInput: {
    addButtonComment: 'Press Enter or type comma',
    addButtonTitle: 'Add',
  },
};
```
