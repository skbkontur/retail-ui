// @flow
import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Toast from '../../components/Toast';
import Button from '../../components/Button';

class TestNotifier extends React.Component {
  notifier: Toast

  showNotification = () => {
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
          handler: action('cancel_save'),
        },
      );
    }
  }

  render() {
    return (
      <div>
        <Toast
          ref={el => this.notifier = el}
          onClose={action('close')}
          onPush={action('push')}
        />
        <Button onClick={this.showNotification}>Show notification</Button>
      </div>
    );
  }
}

storiesOf('Toast', module).
  add('simple notifiacation', () => (
    <TestNotifier />
  )).
  add('complex notifiacation', () => (
    <TestNotifier complex />
  )).
  add('static method', () => (
    <Button onClick={() => Toast.push('Static method call')}>
      Show static
    </Button>
  ));
