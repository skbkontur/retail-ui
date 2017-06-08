class UncTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'fuji'
    };
  }

  render() {
    return (
      <Tabs
        value={this.state.active}
        onChange={(_, v) => this.setState({ active: v })}
      >
        <Tabs.Tab id="fuji">🌋&nbsp;&nbsp;Fuji</Tabs.Tab>
        <Tabs.Tab id="tahat">⛰&nbsp;&nbsp;Tahat</Tabs.Tab>
        <Tabs.Tab id="alps">🗻&nbsp;&nbsp;Alps</Tabs.Tab>
      </Tabs>
    );
  }
}

ReactDOM.render(<UncTabs />, mountNode);
