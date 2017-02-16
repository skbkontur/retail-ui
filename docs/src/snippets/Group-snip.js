var MyGroup = React.createClass({
  render() {
    var auto = null;
    var icon = null;
    if (!this.state.auto) {
      auto = (
        <Button onClick={e => this.setState({ auto: true })}>
          <Icon name="undo" />
        </Button>
      );
    } else {
      icon = <Icon name="fx" />;
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
