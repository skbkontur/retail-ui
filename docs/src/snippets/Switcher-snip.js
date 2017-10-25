class MySwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }

  render() {
    return (
      <Switcher
        label="Switch the switcher"
        items={['One', 'Two', 'Three']}
        value={this.state.value}
        onChange={(_, value) => this.setState({ value })}
      />
    );
  }
}

ReactDOM.render(<MySwitcher />, mountNode);
