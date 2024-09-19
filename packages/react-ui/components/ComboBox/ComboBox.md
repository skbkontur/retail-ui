### Комбобокс с валидацией

```jsx harmony
import { Tooltip } from '@skbkontur/react-ui';

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

let maybeReject = x => (Math.random() * 3 < 1 ? Promise.reject() : Promise.resolve(x));

let getItems = q =>
  Promise.resolve(
    [
      { value: 1, label: 'First' },
      { value: 2, label: 'Second' },
      { value: 3, label: 'Third' },
      { value: 4, label: 'Fourth' },
      { value: 5, label: 'Fifth' },
      { value: 6, label: 'Sixth' },
    ].filter(x => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
  )
    .then(delay(500))
    .then(maybeReject);

const [selected, setSelected] = React.useState({ value: 3, label: 'Third' });
const [error, setError] = React.useState(false);

let handleValueChange = value => {
  setSelected(value);
  setError(false);
};

let handleUnexpectedInput = () => {
  setSelected(null);
  setError(true);
};

let handleFocus = () => setError(false);

<Tooltip closeButton={false} render={() => 'Item must be selected!'} trigger={error ? 'opened' : 'closed'}>
  <ComboBox
    error={error}
    getItems={getItems}
    onValueChange={handleValueChange}
    onFocus={handleFocus}
    onUnexpectedInput={handleUnexpectedInput}
    placeholder="Enter number"
    value={selected}
  />
</Tooltip>;
```

### Очистка комбобокса
Очистить значение в `ComboBox`'е можно с помощью пустой строки, `null` или `undefined`
```jsx harmony
import { Group, ComboBox, Button } from '@skbkontur/react-ui';

const [value, setValue] = React.useState({ value: 2, label: 'Second' });

const getItems = q => {
  return Promise.resolve(
    [
      { value: 1, label: 'First' },
      { value: 2, label: 'Second' },
      { value: 3, label: 'Third' },
      { value: 4, label: 'Fourth' },
      { value: 5, label: 'Fifth' },
      { value: 6, label: 'Sixth' },
    ].filter(x => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
  )
};

<Group>
  <ComboBox
    getItems={getItems}
    onValueChange={setValue}
    placeholder="Введите число"
    value={value}
  />
  <Button onClick={() => setValue(null)}>Null</Button>
  <Button onClick={() => setValue(undefined)}>Undefined</Button>
  <Button onClick={() => setValue('')}>Пустая строка</Button>
</Group>
```

### ComboBox with popular values, complex menu items and total count message

```jsx harmony
import { getCities } from '@skbkontur/react-ui/components/ComboBox/__mocks__/getCities';
import { Gapped, MenuSeparator } from '@skbkontur/react-ui';
import {MenuFooter} from "@skbkontur/react-ui/components/MenuFooter";

let popularItems = [
  { Id: 956, City: 'Махачкала' },
  { Id: 4974, City: 'Верхняя-Пышма' },
  { Id: 4980, City: 'Екатеринбург' },
];

const [value, setValue] = React.useState(null);

let mapCity = ({ Id, City }) => ({
  value: Id,
  label: City,
});

let hasSelectedItem = itemsSets => itemsSets.some(items => items.find(item => value.value === item.Id));

let shouldInsertSelectedItem = (query, items) => value && !query && !hasSelectedItem([items, popularItems]);

let getPopularItems = query => (query ? [] : popularItems.map(mapCity));
let renderSeparator = query => (query ? [] : <MenuSeparator />);
let getSelectedItem = (query, items) => (!shouldInsertSelectedItem(query, items) ? [] : value);

let prepareItems = (query, items) =>
  (!shouldInsertSelectedItem(query, items) ? items : items.slice(0, -1)).map(mapCity);

let renderTotalCount = (foundCount, totalCount) =>
  foundCount < totalCount ? (
    <MenuFooter>
      Показано {foundCount} из {totalCount} найденных городов.
    </MenuFooter>
  ) : (
    []
  );

let getItems = query =>
  getCities(query).then(({ foundItems, totalCount }) =>
    [].concat(
      getPopularItems(query),
      renderSeparator(query),
      getSelectedItem(query, foundItems),
      prepareItems(query, foundItems),
      renderTotalCount(foundItems.length, totalCount),
    ),
  );

let renderItem = item => (
  <Gapped>
    <div style={{ width: 40 }}>{item.value}</div>
    <div style={{ width: 210, whiteSpace: 'normal' }}>{item.label}</div>
  </Gapped>
);

<ComboBox
  onValueChange={setValue}
  getItems={getItems}
  placeholder="Начните вводить название"
  value={value}
  renderItem={renderItem}
/>;
```

### Переопределение `renderValue`, `renderItem` и `itemWrapper`

```jsx harmony
import OkIcon from '@skbkontur/react-icons/Ok';
import { Tooltip } from '@skbkontur/react-ui';

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

const getItems = q =>
  Promise.resolve(
    [
      { approved: true, value: 1, label: 'Леонид Долецкий', email: 'first@skbkontur.ru' },
      { approved: true, value: 2, label: 'Владислав Нашкодивший', email: 'second@skbkontur.ru' },
      { approved: false, value: 3, label: 'Розенкранц Харитонов', email: 'third@skbkontur.ru' },
      { approved: false, value: 4, label: 'Надежда Дубова', email: 'fourth@skbkontur.ru' },
      { approved: true, value: 5, label: 'Владислав Сташкеевич', email: 'fifth@skbkontur.ru' },
      { approved: true, value: 6, label: 'Василиса Александровна Поволоцкая', email: 'sixth@skbkontur.ru' },
    ].filter(x => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
  ).then(delay(500));

const [selected, setSelected] = React.useState({
  approved: false,
  value: 3,
  label: 'Розенкранц Харитонов',
  email: 'third@skbkontur.ru',
});
const [error, setError] = React.useState(false);

const handleValueChange = value => {
  setSelected(value);
  setError(false);
};

const handleUnexpectedInput = () => {
  setSelected(null);
  setError(true);
};

const handleFocus = () => setError(false);

const customRenderItem = item => (
  <div
    style={{
      display: 'flex',
    }}
  >
    <div
      style={{
        width: '55%',
        display: 'flex',
      }}
    >
      <span
        style={{
          minWidth: '20px',
        }}
      >
        {item.approved ? <OkIcon size={14} /> : null}
      </span>
      <span
        style={{
          flexGrow: '1',
        }}
      >
        {item.label}
      </span>
    </div>
    <div
      style={{
        opacity: '0.6',
        paddingLeft: '10px',
        boxSizing: 'border-box',
      }}
    >
      {item.email}
    </div>
  </div>
);

const customItemWrapper = item => {
  if (item.value === 3) {
    return (props) => <div {...props} />;
  }

  return (props) => <button {...props} />
}

const customRenderValue = item => (
  <div
    style={{
      display: 'flex',
    }}
  >
    <div
      style={{
        width: '55%',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      {item.label}
    </div>
    <div
      style={{
        opacity: '0.6',
        paddingLeft: '10px',
        boxSizing: 'border-box',
      }}
    >
      {item.email}
    </div>
  </div>
);

<Tooltip closeButton={false} render={() => 'Item must be selected!'} trigger={error ? 'opened' : 'closed'}>
  <ComboBox
    error={error}
    getItems={getItems}
    onValueChange={handleValueChange}
    onFocus={handleFocus}
    onUnexpectedInput={handleUnexpectedInput}
    placeholder="Enter number"
    value={selected}
    renderItem={customRenderItem}
    itemWrapper={customItemWrapper}
    renderValue={customRenderValue}
    width="400px"
  />
</Tooltip>;
```

### Подсветка результата поиска

```jsx harmony
import { Tooltip } from '@skbkontur/react-ui';

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

const getItems = query =>
  Promise.resolve(
    [
      { value: 1, label: 'First' },
      { value: 2, label: 'Second' },
      { value: 3, label: 'Third' },
      { value: 4, label: 'Fourth' },
      { value: 5, label: 'Fifth' },
      { value: 6, label: 'Sixth' },
    ]
      .filter(x => x.label.toLowerCase().includes(query.toLowerCase()) || x.value.toString(10) === query)
      .map(({ label, ...rest }) => {
        const start = label.toLowerCase().indexOf(query.toLowerCase());
        const end = start + query.length;

        return {
          ...rest,
          label,
          highlightedLabel:
            start >= 0 ? (
              <span>
                {label.substring(0, start)}
                <strong
                  style={{
                    fontSize: '1.1em',
                  }}
                >
                  {label.substring(start, end)}
                </strong>
                {label.substring(end)}
              </span>
            ) : null,
        };
      }),
  ).then(delay(500));

const [selected, setSelected] = React.useState({ value: 3, label: 'Third' });
const [error, setError] = React.useState(false);

let handleValueChange = value => {
  setSelected(value);
  setError(false);
};

let handleUnexpectedInput = () => {
  setSelected(null);
  setError(true);
};

let handleFocus = () => setError(false);

const renderItem = item => {
  if (item.highlightedLabel) {
    return item.highlightedLabel;
  }

  return item.label;
};

<Tooltip closeButton={false} render={() => 'Item must be selected!'} trigger={error ? 'opened' : 'closed'}>
  <ComboBox
    error={error}
    getItems={getItems}
    onValueChange={handleValueChange}
    onFocus={handleFocus}
    onUnexpectedInput={handleUnexpectedInput}
    placeholder="Enter number"
    value={selected}
    renderItem={renderItem}
  />
</Tooltip>;
```

### Добавление элементов в меню

```jsx harmony
import { MenuItem } from '@skbkontur/react-ui';

const delay = time => args => new Promise(resolve => setTimeout(resolve, time, args));

class ComboboxExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        { value: 1, label: 'First' },
        { value: 2, label: 'Second' },
        { value: 3, label: 'Third' },
        { value: 4, label: 'Fourth' },
        { value: 5, label: 'Fifth' },
        { value: 6, label: 'Sixth' },
      ],
      query: '',
      selected: { value: 3, label: 'Third' },
      error: false,
      shouldRenderAddButton: false,
    };

    this.comboBoxElement = null;

    this.getItems = this.getItems.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.renderAddButton = this.renderAddButton.bind(this);
    this.refComboBox = this.refComboBox.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  render() {
    return (
      <ComboBox
        error={this.state.error}
        getItems={this.getItems}
        onValueChange={this.handleValueChange}
        onFocus={this.handleFocus}
        placeholder="Enter number"
        value={this.state.selected}
        onInputValueChange={this.handleInputValueChange}
        renderAddButton={this.renderAddButton}
        ref={this.refComboBox}
      />
    );
  }

  getItems(q) {
    return Promise.resolve(
      this.state.items.filter(x => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
    ).then(delay(500));
  }

  handleInputValueChange(query) {
    const isItemExists = this.state.items.find(x => x.label.toLowerCase() == query.toLowerCase());
    this.setState({ query, shouldRenderAddButton: !isItemExists });
  }

  handleValueChange(value) {
    this.setState({ selected: value, error: false, shouldRenderAddButton: false });
  }

  handleFocus() {
    this.setState({ error: false });
  }

  renderAddButton() {
    if (!this.state.shouldRenderAddButton) {
      return null;
    }
    return (
      <MenuItem link onClick={this.addItem}>
        + Добавить "{this.state.query}"
      </MenuItem>
    );
  }

  refComboBox(element) {
    this.comboBoxElement = element;
  }

  addItem() {
    this.setState(currentState => {
      const newItem = {
        value: Math.max(...currentState.items.map(({ value }) => value)) + 1,
        label: currentState.query,
      };

      return {
        items: [...currentState.items, newItem],
        selected: newItem,
        error: false,
        shouldRenderAddButton: false,
      };
    });
  }
}

<ComboboxExample />;
```

### Сброс контрола
Если нужно сбросить контрол без изменения `value`, то можно использовать метод `reset`.

```jsx harmony
import { Button } from '@skbkontur/react-ui';

const [selected, setSelected] = React.useState({ value: 1, label: "First" });
const ref = React.useRef(null);

const handleReset = () => {
  if (ref.current) {
    ref.current.reset();
  }
};

const getItems = (q) =>
  Promise.resolve(
    [
      { value: 1, label: "First" },
      { value: 2, label: "Second" },
      { value: 3, label: "Third" }
    ].filter(
      (x) =>
        x.label.toLowerCase().includes(q.toLowerCase()) ||
        x.value.toString(10) === q
    )
  );

<div>
  <ComboBox
    ref={ref}
    getItems={getItems}
    onValueChange={setSelected}
    placeholder="Enter number"
    value={selected}
  />
  <Button onClick={handleReset}>Reset</Button>
</div>

```

### Локали по умолчанию

```typescript static
interface ComboBoxLocale {
  notFound?: string;
  errorNetworkButton?: string;
  errorNetworkMessage?: string;
}

const ru_RU = {
  notFound: 'Не найдено',
  errorNetworkButton: 'Обновить',
  errorNetworkMessage: 'Что-то пошло не так. Проверьте соединение с интернетом и попробуйте еще раз',
};

const en_GB = {
  notFound: 'Not found',
  errorNetworkButton: 'Refresh',
  errorNetworkMessage: 'Something went wrong. Check your internet connection and try again',
};
```

### Размер
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

const getItems = q => {
  return Promise.resolve(
    [
      { value: 1, label: 'Маленький' },
      { value: 2, label: 'Средний' },
      { value: 3, label: 'Большой' },
    ].filter(x => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
  )
};

const [valueSmall, setValueSmall] = React.useState('Маленький');
const [valueMedium, setValueMedium] = React.useState('Средний');
const [valueLarge, setValueLarge] = React.useState('Большой');

<Gapped vertical>
  <ComboBox
    getItems={getItems}
    onValueChange={setValueSmall}
    placeholder="Введите число"
    value={valueSmall}
    size={'small'}
  />
  <ComboBox
    getItems={getItems}
    onValueChange={setValueMedium}
    placeholder="Введите число"
    value={valueMedium}
    size={'medium'}
  />
  <ComboBox
    getItems={getItems}
    onValueChange={setValueLarge}
    placeholder="Введите число"
    value={valueLarge}
    size={'large'}
  />
</Gapped>
```
