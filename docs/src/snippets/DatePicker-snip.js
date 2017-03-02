class Comp extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <DatePicker
        value={this.state.date}
        onChange={(_, date) => this.setState({ date })}
        onUnexpectedInput={x => x.length ? x : null}
      />
    );
  }
}

ReactDOM.render(<Comp />, mountNode);
