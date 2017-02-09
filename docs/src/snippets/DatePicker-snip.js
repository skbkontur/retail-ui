class Comp extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
  }

  render() {
    return (
      <DatePicker
        value={this.state.date}
        onChange={(_, date) => this.setState({date})}
      />
    );
  }
}

ReactDOM.render(<Comp />, mountNode);
