var items = [
  {id: 1, name: 'Kappa'},
  {id: 2, name: 'Keepo'},
  {id: 3, name: 'ResidentSleeper'},
];

var loader = (id) => {
  return Promise.resolve(items.find(item => item.id === id));
};

function search(pattern) {
  pattern = pattern.toLowerCase();
  var results = items.filter(item => (
    item.name.toLowerCase().indexOf(pattern) !== -1
  ));
  return Promise.resolve({
    values: results.map((d) => d.id),
    infos: results,
  });
}

function recover(searchText) {
  return {
    value: searchText,
    info: {id: 10, name: `<${searchText}>`},
  };
}

function renderValue(value, info) {
  return <span>{info ? info.name : 'Loading'}</span>;
}

function renderItem(value, info) {
  return <span>{info.name}!</span>;
}

var Comp = React.createClass({
  getInitialState() { return {value: 3}; },

  render() {
    return (
      <ComboBox info={loader} source={search} value={this.state.value}
        recover={recover} renderValue={renderValue} renderItem={renderItem}
        onChange={e => this.setState({value: e.target.value})}
      />
    );
  },
});

ReactDOM.render(<Comp />, mountNode);
