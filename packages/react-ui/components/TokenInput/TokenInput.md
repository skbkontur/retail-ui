```jsx harmony
import { Token } from '@skbkontur/react-ui';
import { TokenInputType } from '@skbkontur/react-ui/components/TokenInput';

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

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
    onValueChange={itemsNew => setState({ selectedItems: itemsNew })}
    renderToken={(item, tokenProps) => (
      <Token key={item.toString()} colors={tokenColors[item] || tokenColors.default} {...tokenProps}>
        {item}
      </Token>
    )}
  />
</div>;
```

#### Локали по умолчанию

```typescript static
interface TokenInputLocale {
  addButtonComment?: string;
  addButtonTitle?: string;
}

const ru_RU = {
  addButtonComment: 'Нажмите запятую или пробел',
  addButtonTitle: 'Добавить',
};

const en_GB = {
  addButtonComment: 'Type comma or space',
  addButtonTitle: 'Add',
};
```
