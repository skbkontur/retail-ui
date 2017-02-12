var Comp = React.createClass({
  getInitialState() { return {}; },

  render() {
    return (
      <Kladr
        title="Адрес"
        value={this.state.value}
        onChange={(_, v) => this.setState({ value: v })}
      />
    );
  }
});

ReactDOM.render(<Comp />, mountNode);
