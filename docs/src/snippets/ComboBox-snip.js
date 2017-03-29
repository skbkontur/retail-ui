var delay = ms => v => new Promise(resolve => setTimeout(resolve, ms, v));

var maybeReject = x =>
  Math.random() * 3 < 1 ? Promise.reject() : Promise.resolve(x);

var getItems = q =>
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

var Comp = React.createClass({
  getInitialState() {
    return {
      selected: { value: 3, label: 'Third' },
      error: false
    };
  },

  handleChange(_, item) {
    this.setState({ selected: item, error: false });
  },

  handleUnexpectedInput() {
    this.setState({ error: true, selected: null });
  },

  handleFocus() {
    this.setState({ error: false });
  },

  render() {
    return (
      <Tooltip
        closeButton={false}
        render={() => 'Item must be selected!'}
        trigger={this.state.error ? 'opened' : 'closed'}
      >
        <ComboBox
          error={this.state.error}
          getItems={getItems}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onUnexpectedInput={this.handleUnexpectedInput}
          placeholder="Enter number"
          value={this.state.selected}
        />
      </Tooltip>
    );
  }
});

ReactDOM.render(<Comp />, mountNode);
