```jsx harmony
import { Token } from '@skbkontur/react-ui';
import { TokenInputType } from '@skbkontur/react-ui/components/TokenInput';

const [selectedItems, setSelectedItems] = React.useState([]);

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
    selectedItems={selectedItems}
    onValueChange={setSelectedItems}
    renderToken={(item, tokenProps) => (
      <Token key={item.toString()} colors={tokenColors[item] || tokenColors.default} {...tokenProps}>
        {item}
      </Token>
    )}
  />
</div>;
```

Заблокированный TokenInput с кастомными Token:

```jsx harmony
import { Token } from '@skbkontur/react-ui';
import { TokenInputType } from '@skbkontur/react-ui/components/TokenInput';

const [selectedItems, setSelectedItems] = React.useState(['aaa', 'bbb', 'ccc']);

async function getItems(query) {
  return ['aaa', 'bbb', 'ccc'].filter((s) => s.includes(query));
};

<TokenInput
  disabled
  type={TokenInputType.Combined}
  getItems={getItems}
  selectedItems={selectedItems}
  onValueChange={setSelectedItems}
  renderToken={(item, tokenProps) => (
    <Token key={item.toString()} {...tokenProps} disabled={item === 'bbb' || tokenProps.disabled} >
      {item}
    </Token>
  )}
/>
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
