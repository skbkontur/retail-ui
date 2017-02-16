class TestNotifier extends React.Component {
  showNotification() {
    if (this.props.complex) {
      this.showComplexNotification();
    } else {
      this.showSimpleNotification();
    }
  }

  showSimpleNotification() {
    Toast.push('Successfully saved');
  }

  showComplexNotification() {
    Toast.push('Successfully saved', {
      label: 'Cancel',
      handler: () => Toast.push('Canceled')
    });
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.showNotification()}>
          Show notification
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<TestNotifier complex />, mountNode);
