var Comp = React.createClass({
  getInitialState() {
    return { auto: false };
  },

  render() {
    return (
      <FxInput auto={this.state.auto} value={this.state.value}
        onChange={this.handleChange} onRestore={this.handleRestore}
      />
    );
  },

  handleChange(event) {
    this.setState({ auto: false, value: event.target.value });
  },

  handleRestore() {
    this.setState({ auto: true, value: 'auto' });
  }
});

ReactDOM.render(<Comp />, mountNode);
