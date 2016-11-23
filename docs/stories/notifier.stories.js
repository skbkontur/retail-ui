// @flow
import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Notifier from '../../components/Notifier';
import NotifierWidget from '../../components/Notifier/NotifierWidget';
import Button from '../../components/Button';

class TestNotifier extends React.Component {
  notifier: Notifier

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
        <Notifier
          ref={el => this.notifier = el}
          onClose={action('close')}
          onPush={action('push')}
        />
        <Button onClick={this.showNotification}>Show notification</Button>
      </div>
    );
  }
}

storiesOf('Notifier', module).
  add('simple notifiacation', () => (
    <TestNotifier />
  )).
  add('complex notifiacation', () => (
    <TestNotifier complex />
  )).
  add('widget', () => (
    <Button onClick={() => NotifierWidget.push('Static method call')}>
      Show static
    </Button>
  ));
