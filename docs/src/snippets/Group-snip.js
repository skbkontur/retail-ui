var MyGroup = React.createClass({
  render() {
    var auto = null;
    var icon = null;
    if (!this.state.auto) {
      auto = (
        <Button onClick={e => this.setState({ auto: true })}>
          <Icon name="Undo" />
        </Button>
      );
    } else {
      icon = <Icon name="Function" />;
    }

    return (
      <Group width={300}>
        {auto}
        <Input mainInGroup leftIcon={icon}
          onChange={e => this.setState({ auto: false })}
        />
        <Button>Hey</Button>
        <Button>Ma</Button>
      </Group>
    );
  },

  getInitialState() { return { auto: false }; }
});

ReactDOM.render(<MyGroup />, mountNode);
