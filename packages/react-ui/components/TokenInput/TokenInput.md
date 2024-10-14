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

У TokenInput есть 3 стандартных размера.

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

<div style={{ width: '300px' }}>
  <TokenInput
    size={'small'}
    getItems={getItems}
    selectedItems={selectedItems}
    onValueChange={setSelectedItems}
  />
  <TokenInput
    size={'medium'}
    getItems={getItems}
    selectedItems={selectedItems}
    onValueChange={setSelectedItems}
  />
  <TokenInput
    size={'large'}
    getItems={getItems}
    selectedItems={selectedItems}
    onValueChange={setSelectedItems}
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

Ограничение количества токенов в выпадающем списке

```jsx harmony
import { Token, MenuHeader } from '@skbkontur/react-ui';
import { TokenInputType } from '@skbkontur/react-ui/components/TokenInput';
import { Promise } from 'es6-promise';

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));
const cities = require('../ComboBox/__mocks__/./kladr.json');

const maxItems = 5;

const [totalCount, setTotalCount] = React.useState(cities.length);
const [value, setValue] = React.useState([]);

const getItems = (query) => {
  const items = cities
    .map((x) => x.City)
    .filter((x) => x.toLowerCase().includes(query.toLowerCase()) || x.toString() === query);
  const result = items.slice(0, maxItems);
  setTotalCount(items.length);

  return Promise.resolve(result).then(delay(500));
};

const renderTotalCount = (foundCount, totalCount) => (
  <span>
    Показано {foundCount} из {totalCount} найденных городов
  </span>
);

<div style={{ width: "300px" }}>
  <TokenInput
    type={TokenInputType.Combined}
    selectedItems={value}
    onValueChange={setValue}
    getItems={getItems}
    placeholder="Начните вводить название"
    renderTotalCount={renderTotalCount}
    totalCount={totalCount}
  />
</div>
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
    valueToString={renderValue}
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

#### Пример с дебаунсом функции getItems

Функция debounce из lodash некорректно работает с async/promise, поэтому лучше использовать кастомную функцию, как в примере ниже.

```jsx harmony
import { TokenInput } from "@skbkontur/react-ui";
import { TokenInputType } from "@skbkontur/react-ui/components/TokenInput";

const [value, setValue] = React.useState([]);

function debounceAsync(callback, wait) {
  let timeoutId = null;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise((resolve) => {
      const timeoutPromise = new Promise((resolve) => {
        timeoutId = setTimeout(resolve, wait);
      });
      timeoutPromise.then(async () => {
        resolve(await callback(...args));
      });
    });
  };
}

const items = ["kon", "kod", "kof", "kor", "kos"];

const getItems = async (query) => {
  console.log("query: ", query);
  return items.filter((item) => item.includes(query));
};

<TokenInput
  style={{ width: "300px" }}
  type={TokenInputType.Combined}
  selectedItems={value}
  onValueChange={setValue}
  getItems={debounceAsync(getItems, 300)}
  placeholder="Начните вводить название"
/>
```
Типизированная версия функции

```typescript static
function debounceAsync<T, Callback extends (...args: any[]) => Promise<T>>(
  callback: Callback,
  wait: number,
): (...args: Parameters<Callback>) => Promise<T> {
  let timeoutId: number | null = null;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise<T>((resolve) => {
      const timeoutPromise = new Promise<void>((resolve) => {
        timeoutId = setTimeout(resolve, wait);
      });
      timeoutPromise.then(async () => {
        resolve(await callback(...args));
      });
    });
  };
}
```

#### Локали по умолчанию

```typescript static
interface TokenInputLocale {
  addButtonComment?: string;
  addButtonTitle?: string;
}

const ru_RU = {
  addButtonComment: 'Нажмите запятую',
  addButtonTitle: 'Добавить',
};

const en_GB = {
  addButtonComment: 'Type comma',
  addButtonTitle: 'Add',
};
```
