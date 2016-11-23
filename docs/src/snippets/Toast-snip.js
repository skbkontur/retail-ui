class TestNotifier extends React.Component {
  showNotification() {
    if (this.props.complex) {
      this.showComplexNotification();
    } else {
      this.showSimpleNotification();
    }
  }

  showSimpleNotification() {
    if (this.notifier) {
      this.notifier.push('Successfully saved');
    }
  }

  showComplexNotification() {
    if (this.notifier) {
      this.notifier.push(
        'Successfully saved',
        {
          label: 'Cancel',
          handler: () => this.notifier.push('Canceled'),
        }
      );
    }
  }

  render() {
    return (
      <div>
        <Toast
          ref={el => this.notifier = el}
          onClose={(text, action) => console.log('close', text, action)}
          onPush={(text, action) => console.log('push', text, action)}
        />
        <Button onClick={() => this.showNotification()}>
          Show notification
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<TestNotifier complex />, mountNode);

