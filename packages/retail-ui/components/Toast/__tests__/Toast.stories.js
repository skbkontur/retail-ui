
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Toast from '../../Toast';
import Button from '../../Button';
import Modal from '../../Modal';

class TestNotifier extends React.Component<*, *> {
  notifier: ?Toast;

  state = {
    modal: false
  };

  showNotification = () => {
    if (this.props.complex) {
      this.showComplexNotification();
    } else {
      this.showSimpleNotification();
    }
  };

  showSimpleNotification() {
    if (this.notifier) {
      this.notifier.push('Successfully saved');
    }
  }

  showComplexNotification() {
    if (this.notifier) {
      this.notifier.push('Successfully saved', {
        label: 'Cancel',
        handler: action('cancel_save')
      });
    }
  }

  render() {
    return (
      <div>
        <Toast
          ref={el => (this.notifier = el)}
          onClose={action('close')}
          onPush={action('push')}
        />
        <Button onClick={this.showNotification}>Show notification</Button>
        <Button onClick={() => this.setState({ modal: true })}>
          Show Modal
        </Button>
        {this.state.modal && this.renderModal()}
      </div>
    );
  }

  renderModal() {
    return (
      <Modal>
        <Modal.Header>Modalka</Modal.Header>
        <Modal.Body>
          <Button onClick={this.showNotification}>Show notification</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({ modal: false })}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

storiesOf('Toast', module)
  .add('simple notifiacation', () => <TestNotifier />)
  .add('complex notifiacation', () => <TestNotifier complex />)
  .add('static method', () => (
    <Button onClick={() => Toast.push('Static method call')}>
      Show static
    </Button>
  ));
