var Comp = React.createClass({
  getInitialState() {
    return {opened: false};
  },

  render() {
    return (
      <div>
        <Modal render={this.renderModal} opened={this.state.opened}
            onClose={this.close} />
        <Button onClick={this.open}>Open</Button>
      </div>
    );
  },

  renderModal() {
    return (
      <div>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          A lotta people ask me where the fuck I've been at the last few years.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </div>
    );
  },

  open() {
    this.setState({opened: true});
  },

  close() {
    this.setState({opened: false});
  },
});

React.render(<Comp />, mountNode);
