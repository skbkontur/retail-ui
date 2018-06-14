```jsx
var items = [
  { id: 1, name: 'Kappa' },
  { id: 2, name: 'Keepo' },
  { id: 3, name: 'ResidentSleeper' },
  { id: 4, name: 'Kestrel' },
  { id: 5, name: 'Kats' },
  { id: 6, name: 'Junior' }
];

function info(id) {
  return Promise.resolve(items.find(item => item.id === id));
}

function search(query) {
  query = query.toLowerCase();
  var results = items.filter(
    item => item.name.toLowerCase().indexOf(query) !== -1
  );
  return Promise.resolve({
    values: results.map(d => d.id).slice(0, 3),
    infos: results,
    total: results.length
  });
}

function recover(query) {
  var found = items.find(x => x.name.toLowerCase() === query.toLowerCase());
  if (found) {
    return { value: found.id };
  }
  return null;
}

function renderValue(value, info) {
  return <span>{info ? info.name : 'Loading'}</span>;
}

function renderItem(value, info) {
  return (
    <span>
      {value}: {info.name}
    </span>
  );
}

function valueToString(id) {
  var info = items.find(x => x.id === id);
  return info ? info.name : '';
}

function renderTotalCount(found, total) {
  return (
    <div style={{ maxWidth: 220 }}>
      Displayed {found} from {total}
    </div>
  );
}

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 3 };
  }

  render() {
    return (
      <ComboBoxOld
        info={info}
        source={search}
        value={this.state.value}
        recover={recover}
        renderValue={renderValue}
        renderItem={renderItem}
        renderNotFound="Nothing here"
        renderTotalCount={renderTotalCount}
        valueToString={valueToString}
        onChange={e => this.setState({ value: e.target.value })}
      />
    );
  }
}

<Comp />;
```
