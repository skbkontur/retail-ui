Combobox with error handling

```jsx
let delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

let maybeReject = x =>
  Math.random() * 3 < 1 ? Promise.reject() : Promise.resolve(x);

let getItems = q =>
  Promise.resolve(
    [
      { value: 1, label: 'First' },
      { value: 2, label: 'Second' },
      { value: 3, label: 'Third' },
      { value: 4, label: 'Fourth' },
      { value: 5, label: 'Fifth' },
      { value: 6, label: 'Sixth' }
    ].filter(
      x =>
        x.label.toLowerCase().includes(q.toLowerCase()) ||
        x.value.toString(10) === q
    )
  )
    .then(delay(500))
    .then(maybeReject);

let initialState = {
  selected: { value: 3, label: 'Third' },
  error: false
};

let handleChange = (_, item) => setState({ selected: item, error: false });

let handleUnexpectedInput = () => setState({ error: true, selected: null });

let handleFocus = () => setState({ error: false });

<Tooltip
  closeButton={false}
  render={() => 'Item must be selected!'}
  trigger={state.error ? 'opened' : 'closed'}
>
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
  { Id: 4980, City: 'Екатеринбург' }
];

let handleChange = (_, value) => setState({ value });

let initialState = {
  value: null
};

let mapCity = ({ Id, City }) => ({
  value: Id,
  label: City
});

let hasSelectedItem = itemsSets =>
  itemsSets.some(items => items.find(item => state.value.value === item.Id));

let shouldInsertSelectedItem = (query, items) =>
  state.value && !query && !hasSelectedItem([items, popularItems]);

let getPopularItems = query => (query ? [] : popularItems.map(mapCity));
let renderSeparator = query => (query ? [] : <MenuSeparator />);
let getSelectedItem = (query, items) =>
  !shouldInsertSelectedItem(query, items) ? [] : state.value;

let prepareItems = (query, items) =>
  (!shouldInsertSelectedItem(query, items) ? items : items.slice(0, -1)).map(
    mapCity
  );

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
      renderTotalCount(foundItems.length, totalCount)
    )
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

```jsx
const delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

const getItems = q =>
  Promise.resolve(
    [
      { value: 1, label: 'First', email: 'first@skbkontur.ru' },
      { value: 2, label: 'Second', email: 'second@skbkontur.ru' },
      { value: 3, label: 'Third', email: 'third@skbkontur.ru' },
      { value: 4, label: 'Fourth', email: 'fourth@skbkontur.ru' },
      { value: 5, label: 'Fifth', email: 'fifth@skbkontur.ru' },
      { value: 6, label: 'Sixth', email: 'sixth@skbkontur.ru' }
    ].filter(
      x =>
        x.label.toLowerCase().includes(q.toLowerCase()) ||
        x.value.toString(10) === q
    )
  ).then(delay(500));

const initialState = {
  selected: { value: 3, label: 'Third', email: 'third@skbkontur.ru' },
  error: false
};

const handleChange = (_, item) => setState({ selected: item, error: false });

const handleUnexpectedInput = () => setState({ error: true, selected: null });

const handleFocus = () => setState({ error: false });

const customRender = item => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}
  >
    <span>✅ {item.label}</span>
    <span
      style={{
        fontSize: '0.9em',
        color: '#666'
      }}
    >
      {item.email}
    </span>
  </div>
);

<Tooltip
  closeButton={false}
  render={() => 'Item must be selected!'}
  trigger={state.error ? 'opened' : 'closed'}
>
  <ComboBox
    error={state.error}
    getItems={getItems}
    onChange={handleChange}
    onFocus={handleFocus}
    onUnexpectedInput={handleUnexpectedInput}
    placeholder="Enter number"
    value={state.selected}
    renderItem={customRender}
    renderValue={customRender}
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
      { value: 6, label: 'Sixth' }
    ]
      .filter(
        x =>
          x.label.toLowerCase().includes(query.toLowerCase()) ||
          x.value.toString(10) === query
      )
      .map(({ label, ...rest }) => {
        const start = label.toLowerCase().indexOf(query.toLowerCase());
        const end = start + query.length;

        return {
          ...rest,
          label,
          highlightedLabel: start >= 0 ? (
            <span>
              {label.substring(0, start)}
              <strong
                style={{
                  fontSize: '1.1em'
                }}
              >
                {label.substring(start, end)}
              </strong>
              {label.substring(end)}
            </span>
          ) : null
        };
      })
  ).then(delay(500));

const initialState = {
  selected: { value: 3, label: 'Third' },
  error: false
};

const handleChange = (_, item) => setState({ selected: item, error: false });

const handleUnexpectedInput = () => setState({ error: true, selected: null });

const handleFocus = () => setState({ error: false });

const renderItem = (item) => {
  if (item.highlightedLabel) {
    return item.highlightedLabel;
  }

  return item.label;
}

<Tooltip
  closeButton={false}
  render={() => 'Item must be selected!'}
  trigger={state.error ? 'opened' : 'closed'}
>
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
        { value: 6, label: 'Sixth' }
      ],
      query: '',
      selected: { value: 3, label: 'Third' },
      error: false
    };

    this.comboBoxElement = null;

    this.getItems = this.getItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.renderNotFound = this.renderNotFound.bind(this);
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
        onInputChange={query => this.setState({ query })}
        renderNotFound={this.renderNotFound}
        ref={this.refComboBox}
      />
    );
  }

  getItems(q) {
    return Promise.resolve(
      this.state.items.filter(
        x =>
          x.label.toLowerCase().includes(q.toLowerCase()) ||
          x.value.toString(10) === q
      )
    ).then(delay(500));
  }

  handleChange(_, item) {
    this.setState({ selected: item, error: false });
  }

  handleFocus() {
    this.setState({ error: false });
  }

  renderNotFound() {
    return (
      <Button onClick={this.addItem} use="link">
        + Добавить "{this.state.query}"
      </Button>
    );
  }

  refComboBox(element) {
    this.comboBoxElement = element;
  }

  addItem() {
    this.setState(
      currentState => {
        const newItem = {
          value: Math.max(...currentState.items.map(({ value }) => value)) + 1,
          label: currentState.query
        };

        return {
          items: [...currentState.items, newItem],
          selected: newItem,
          error: false
        };
      },
      () => {
        /**
         * Очищаем внутренний стэйт комбобокса
         */
        if (this.comboBoxElement) {
          this.comboBoxElement.reset();
        }
      }
    );
  }
}

<ComboboxExample />;
```
