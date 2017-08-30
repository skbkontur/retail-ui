var Comp = React.createClass({
  getInitialState() {
    return { opened: false };
  },

  render() {
    return (
      <div>
        {this.state.opened && this.renderModal()}
        <Button onClick={this.open}>Open</Button>
      </div>
    );
  },

  renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <p>
            A lotta people ask me where the fuck I've been at the last few
            years.
          </p>

          <div>
            <Toggle
              checked={this.state.panel}
              onChange={() => this.setState(({ panel }) => ({ panel: !panel }))}
            />{' '}
            Panel {this.state.panel ? 'enabled' : 'disabled'}
          </div>
        </Modal.Body>
        <Modal.Footer panel={this.state.panel}>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  },

  open() {
    this.setState({ opened: true });
  },

  close() {
    this.setState({ opened: false });
  }
});

ReactDOM.render(<Comp />, mountNode);
