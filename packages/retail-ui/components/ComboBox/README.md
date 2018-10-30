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
  { value: 956, label: 'Махачкала' },
  { value: 4974, label: 'Верхняя-Пышма' },
  { value: 4980, label: 'Екатеринбург' }
];

let handleChange = (_, value) => setState({ value });

let initialState = {
  value: null
};

let mapCity = ({ Id, City }) => ({
  value: Id,
  label: City
});

let renderTotalCount = (foundCount, totalCount) =>
  foundCount < totalCount ? (
    <MenuHeader>
      Показано {foundCount} из {totalCount} найденных городов.
    </MenuHeader>
  ) : (
    []
  );

let getItems = query =>
  getCities(query)
    .then(({ foundItems, totalCount }) => ({
      items: foundItems.map(mapCity),
      totalCount
    }))
    .then(({ items, totalCount }) => ({
      popularItems: query.length === 0 ? popularItems : [],
      items,
      totalCount
    }))
    .then(({ popularItems, items, totalCount }) =>
      [].concat(
        popularItems,
        popularItems.length ? <MenuSeparator /> : [],
        items,
        renderTotalCount(items.length, totalCount)
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
        const start = label.toLowerCase().indexOf(query);
        const end = start + query.length;

        return {
          ...rest,
          label,
          highlightedLabel: (
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
          )
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
