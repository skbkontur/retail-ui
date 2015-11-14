var items = [
  {id: 1, name: 'Kappa'},
  {id: 2, name: 'Keepo'},
  {id: 3, name: 'ResidentSleeper'},
];

var loader = {
  load(id) {
    return Promise.resolve(items.find(item => item.id === id));
  },
};

function search(pattern) {
  pattern = pattern.toLowerCase();
  var results = items.filter(item => (
    item.name.toLowerCase().indexOf(pattern) !== -1
  ));
  return Promise.resolve(results);
}

function renderValue(value, item) {
  return <span>{item.name}</span>;
}

function renderItem(value, item) {
  return <span>{item.name}!</span>;
}

var Comp = React.createClass({
  getInitialState() { return {value: 3}; },

  render() {
    return (
      <SearchSelect loader={loader} source={search}
        value={this.state.value} renderValue={renderValue}
        renderItem={renderItem}
        onChange={e => this.setState({partnerId: e.target.value})} />
    );
  },
});

ReactDOM.render(<Comp />, mountNode);
