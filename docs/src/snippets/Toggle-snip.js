class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <div>
        <Toggle
          checked={this.state.checked}
          onChange={this.toggle}
        />{' '}
        {this.state.checked ? 'On' : 'Off'}
      </div>
    );
  }
}

ReactDOM.render(<Comp />, mountNode);
