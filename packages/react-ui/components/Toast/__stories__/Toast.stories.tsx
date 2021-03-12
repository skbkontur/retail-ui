import React from 'react';
import { action } from '@storybook/addon-actions';
import { CreeveyStoryParams } from 'creevey';
import { StoryFn } from '@storybook/addons';

import { Toast } from '../Toast';
import { Button } from '../../Button';
import { Modal } from '../../Modal';
import { Nullable } from '../../../typings/utility-types';

class TestNotifier extends React.Component<any, any> {
  public state = {
    modal: false,
  };

  private notifier: Nullable<Toast>;

  public render() {
    return (
      <div>
        <Toast ref={el => (this.notifier = el)} onClose={action('close')} onPush={action('push')} />
        <button data-tid="show-toast" onClick={this.showNotification}>
          Show Toast
        </button>
        <button onClick={() => this.setState({ modal: true })}>Show Modal</button>
        {this.state.modal && this.renderModal()}
      </div>
    );
  }

  private showNotification = () => {
    if (this.props.complex) {
      this.showComplexNotification();
    } else {
      this.showSimpleNotification();
    }
  };

  private showSimpleNotification() {
    if (this.notifier) {
      this.notifier.push('Successfully saved');
    }
  }

  private showComplexNotification() {
    if (this.notifier) {
      this.notifier.push('Successfully saved', {
        label: 'Cancel',
        handler: action('cancel_save'),
      });
    }
  }

  private renderModal() {
    return (
      <Modal>
        <Modal.Header>Modalka</Modal.Header>
        <Modal.Body>
          <Button onClick={this.showNotification}>Show notification</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({ modal: false })}>Close Modal</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default {
  title: 'Toast',
  decorators: [
    (story: StoryFn<JSX.Element>) => (
      <div
        // make some space for Toast
        style={{
          padding: '30px 0',
        }}
      >
        {story()}
      </div>
    ),
  ],
  parameters: {
    creevey: {
      captureElement: 'body',
      tests: {
        async toastShown() {
          const showToast = this.browser.findElement({ css: '[data-tid~="show-toast"]' });

          await this.browser
            .actions({ bridge: true })
            .click(showToast)
            .move({ x: 0, y: 0 })
            .click()
            .perform();

          await this.expect(await this.takeScreenshot()).to.matchImage();
        },
      },
    } as CreeveyStoryParams,
  },
};

export const SimpleNotification = () => <TestNotifier />;
SimpleNotification.story = { name: 'simple notification' };

export const ComplexNotification = () => <TestNotifier complex />;
ComplexNotification.story = { name: 'complex notification' };

export const StaticMethod = () => (
  <button data-tid="show-toast" onClick={() => Toast.push('Static method call')}>
    Show static
  </button>
);
StaticMethod.story = { name: 'static method' };
