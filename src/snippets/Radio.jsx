var MyComponent = React.createClass({
  render() {
    return (
      <div>
        <Radio checked={this.state.val === 'hey'}
            onChange={e => this.setState({val: 'hey'})}>
          Hey ma
        </Radio>
        <br />
        <Radio checked={this.state.val === 'woof'}
            onChange={e => this.setState({val: 'woof'})}>
          Woof the spam
        </Radio>
      </div>
    );
  },

  getInitialState() { return {val: null}; }
});

React.render(<MyComponent />, mountNode);
