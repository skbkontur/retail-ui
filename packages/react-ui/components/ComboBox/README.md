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
