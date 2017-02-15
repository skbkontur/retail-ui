var Comp = React.createClass({
  render() {
    return <Checkbox checked={this.state.checked} onChange={this.handleChange}>
      Checkbox
    </Checkbox>;
  },

  getInitialState() {
    return { checked: false };
  },

  handleChange(event) {
    this.setState({ checked: event.target.checked });
  }
});

ReactDOM.render(<Comp />, mountNode);
