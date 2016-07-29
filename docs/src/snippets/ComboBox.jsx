var items = [
  {id: 1, name: 'Kappa'},
  {id: 2, name: 'Keepo'},
  {id: 3, name: 'ResidentSleeper'},
];

function info(id) {
  return Promise.resolve(items.find(item => item.id === id));
};

function search(query) {
  query = query.toLowerCase();
  var results = items.filter(item => (
    item.name.toLowerCase().indexOf(query) !== -1
  ));
  return Promise.resolve({
    values: results.map((d) => d.id),
    infos: results,
  });
}

function recover(query) {
  var found = items.find(x => x.name.toLowerCase() === query.toLowerCase());
  if (found) {
    return {value: found.id};
  }
  return null;
}

function renderValue(value, info) {
  return <span>{info ? info.name : 'Loading'}</span>;
}

function renderItem(value, info) {
  return <span>{value}: {info.name}</span>;
}

function valueToText(id) {
  var info = items.find(x => x.id === id);
  return info ? info.name : '';
}

var Comp = React.createClass({
  getInitialState() { return {value: 3}; },

  render() {
    return (
      <ComboBox info={info} source={search} value={this.state.value}
        recover={recover} renderValue={renderValue} renderItem={renderItem}
        alkoValueToText={valueToText}
        onChange={e => this.setState({value: e.target.value})}
      />
    );
  },
});

ReactDOM.render(<Comp />, mountNode);
