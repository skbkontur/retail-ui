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

Показ определенного количества токенов
```jsx harmony
import { Token, MenuHeader } from '@skbkontur/react-ui';
import { TokenInputType } from '@skbkontur/react-ui/components/TokenInput';
const kladr = require('../ComboBox/__mocks__/./kladr.json');

const maxItems = 5;

const [value, setValue] = React.useState(null);

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

const getCities = (query) => {
  const items = kladr.map(x => x.City).filter(x => x.toLowerCase().includes(query.toLowerCase()) || x.toString(10) === query);
  const result = items.slice(0, maxItems);
  return Promise.resolve({
    foundItems: result,
    totalCount: items.length,
  }).then(delay(300));
};

const renderTotalCount = (foundCount, totalCount) =>
  foundCount < totalCount ? (
    <MenuHeader>
      Показано {foundCount} из {totalCount} найденных городов.
    </MenuHeader>
  ) : (
    []
  );

const getItems = query =>
  getCities(query).then(({ foundItems, totalCount }) =>
    [].concat(
      foundItems,
      renderTotalCount(foundItems.length, totalCount),
    ),
  );

<div style={{ width: '300px' }}>
  <TokenInput
    type={TokenInputType.Combined}
    value={value}
    onValueChange={setValue}
    getItems={getItems}
    placeholder="Начните вводить название"
    renderToken={(item, tokenProps) => (
      <Token key={item.toString()} {...tokenProps} >
        {item}
      </Token>
    )}
  />
</div>;
```

Пример с кастомным типом элементов меню
```jsx harmony
import { Token } from '@skbkontur/react-ui';
import { TokenInputType } from '@skbkontur/react-ui/components/TokenInput';

const [selectedItems, setSelectedItems] = React.useState([]);

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));
const getGenericItems = () => [
  { id: '111', value: 'aaa' },
  { id: '222', value: 'bbb' },
  { id: '333', value: 'ccc' },
  { id: '444', value: 'ddd' },
];
const renderItem = (item) => item.value;
const renderValue = (value) => value.value;
const valueToItem = (item) => ({
  value: item,
});
const getModelItems = async (query) => {
  await delay(400);
  return getGenericItems().filter((s) => s.value.includes(query));
}

<div style={{ width: '300px' }}>
  <TokenInput
    selectedItems={selectedItems}
    renderItem={renderItem}
    renderValue={renderValue}
    valueToItem={valueToItem}
    getItems={getModelItems}
    onValueChange={setSelectedItems}
    placeholder="placeholder"
    type={TokenInputType.Combined}
    renderToken={(item, tokenProps) => (
      <Token
        key={item.id}
        {...tokenProps}
      >
        {item.value}
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
