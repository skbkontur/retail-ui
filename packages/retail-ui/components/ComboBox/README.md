Combobox with error handling

```jsx
let delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

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

let initialState = {
  selected: { value: 3, label: 'Third' },
  error: false,
};

let handleChange = (_, item) => setState({ selected: item, error: false });

let handleUnexpectedInput = () => setState({ error: true, selected: null });

let handleFocus = () => setState({ error: false });

<Tooltip closeButton={false} render={() => 'Item must be selected!'} trigger={state.error ? 'opened' : 'closed'}>
  <ComboBox
    error={state.error}
    getItems={getItems}
    onChange={handleChange}
    onFocus={handleFocus}
    onUnexpectedInput={handleUnexpectedInput}
    placeholder="Enter number"
    value={state.selected}
  />
</Tooltip>;
```

ComboBox with popular values, complex menu items and total count message

```jsx
const getCities = require('./__mocks__/getCities.js').default;

let popularItems = [
  { Id: 956, City: 'Махачкала' },
  { Id: 4974, City: 'Верхняя-Пышма' },
  { Id: 4980, City: 'Екатеринбург' },
];

let handleChange = (_, value) => setState({ value });

let initialState = {
  value: null,
};

let mapCity = ({ Id, City }) => ({
  value: Id,
  label: City,
});

let hasSelectedItem = itemsSets => itemsSets.some(items => items.find(item => state.value.value === item.Id));

let shouldInsertSelectedItem = (query, items) => state.value && !query && !hasSelectedItem([items, popularItems]);

let getPopularItems = query => (query ? [] : popularItems.map(mapCity));
let renderSeparator = query => (query ? [] : <MenuSeparator />);
let getSelectedItem = (query, items) => (!shouldInsertSelectedItem(query, items) ? [] : state.value);

let prepareItems = (query, items) =>
  (!shouldInsertSelectedItem(query, items) ? items : items.slice(0, -1)).map(mapCity);

let renderTotalCount = (foundCount, totalCount) =>
  foundCount < totalCount ? (
    <MenuHeader>
      Показано {foundCount} из {totalCount} найденных городов.
    </MenuHeader>
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
  onChange={handleChange}
  getItems={getItems}
  placeholder="Начните вводить название"
  value={state.value}
  renderItem={renderItem}
/>;
```

Переопределение renderValue и renderItem:

```js
const OkIcon = require('@skbkontur/react-icons/Ok').default;
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

const getItems = q =>
  Promise.resolve(
    [
      { approved: true, value: 1, label: 'Леонид Долецкий', email: 'first@skbkontur.ru' },
      { approved: true, value: 2, label: 'Владислав Нашкодивший', email: 'second@skbkontur.ru' },
      { approved: false, value: 3, label: 'Розенкранц Харитонов', email: 'third@skbkontur.ru' },
      { approved: false, value: 4, label: 'Надежда Дубова', email: 'fourth@skbkontur.ru' },
      { approved: true, value: 5, label: 'Владислав Сташкеевич', email: 'fifth@skbkontur.ru' },
      { approved: true, value: 6, label: 'Василиса Поволоцкая', email: 'sixth@skbkontur.ru' },
    ].filter(x => x.label.toLowerCase().includes(q.toLowerCase()) || x.value.toString(10) === q),
  ).then(delay(500));

const initialState = {
  selected: { approved: false, value: 3, label: 'Розенкранц Харитонов', email: 'third@skbkontur.ru' },
  error: false,
};

const handleChange = (_, item) => setState({ selected: item, error: false });

const handleUnexpectedInput = () => setState({ error: true, selected: null });

const handleFocus = () => setState({ error: false });

const customRenderItem = item => (
  <div
    style={{
      display: 'flex',
    }}
  >
    <div
      style={{
        minWidth: '55%',
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

const customRenderValue = item => (
  <div
    style={{
      display: 'flex',
    }}
  >
    <div
      style={{
        minWidth: '55%',
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

<Tooltip closeButton={false} render={() => 'Item must be selected!'} trigger={state.error ? 'opened' : 'closed'}>
  <ComboBox
    error={state.error}
    getItems={getItems}
    onChange={handleChange}
    onFocus={handleFocus}
    onUnexpectedInput={handleUnexpectedInput}
    placeholder="Enter number"
    value={state.selected}
    renderItem={customRenderItem}
    renderValue={customRenderValue}
    width="400px"
  />
</Tooltip>;
```

С подсветкой результата поиска:

```jsx
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

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

const initialState = {
  selected: { value: 3, label: 'Third' },
  error: false,
};

const handleChange = (_, item) => setState({ selected: item, error: false });

const handleUnexpectedInput = () => setState({ error: true, selected: null });

const handleFocus = () => setState({ error: false });

const renderItem = item => {
  if (item.highlightedLabel) {
    return item.highlightedLabel;
  }

  return item.label;
};

<Tooltip closeButton={false} render={() => 'Item must be selected!'} trigger={state.error ? 'opened' : 'closed'}>
  <ComboBox
    error={state.error}
    getItems={getItems}
    onChange={handleChange}
    onFocus={handleFocus}
    onUnexpectedInput={handleUnexpectedInput}
    placeholder="Enter number"
    value={state.selected}
    renderItem={renderItem}
  />
</Tooltip>;
```

Добавление элементов в меню

```jsx
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

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
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderAddButton = this.renderAddButton.bind(this);
    this.refComboBox = this.refComboBox.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  render() {
    return (
      <ComboBox
        error={this.state.error}
        getItems={this.getItems}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        placeholder="Enter number"
        value={this.state.selected}
        onInputChange={this.handleInputChange}
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

  handleInputChange(query) {
    const isItemExists = this.state.items.find(x => x.label.toLowerCase() == query.toLowerCase());
    this.setState({ query, shouldRenderAddButton: !isItemExists });
  }

  handleChange(_, item) {
    this.setState({ selected: item, error: false, shouldRenderAddButton: false });
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

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript
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

const en_EN = {
  notFound: 'Not found',
  errorNetworkButton: 'Refresh',
  errorNetworkMessage: 'Something went wrong. Check your internet connection and try again',
};
```
