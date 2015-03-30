var MyGroup = React.createClass({
  render() {
    var auto = null;
    if (!this.state.auto) {
      auto = (
        <Button onClick={e => this.setState({auto: true})}>
          <Icon name="undo" />
        </Button>
      );
    }

    return (
      <Group width={300}>
        {auto}
        <Input mainInGroup onChange={e => this.setState({auto: false})} />
        <Button>Hey</Button>
        <Button>Ma</Button>
      </Group>
    );
  },

  getInitialState() { return {auto: false}; },
});

React.render(<MyGroup />, mountNode);
