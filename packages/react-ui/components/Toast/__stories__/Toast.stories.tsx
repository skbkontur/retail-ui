import React from 'react';
import { action } from '@storybook/addon-actions';

import { Meta } from '../../../typings/stories';
import { Toast } from '../Toast';

const TestNotifier = ({ complex }: { complex?: boolean }) => {
  const toastRef = React.useRef<Toast>(null);
  const showNotification = () => {
    const { current: toast } = toastRef;
    if (toast) {
      complex
        ? toast.push('Successfully saved', {
            label: 'Cancel',
            handler: action('cancel_save'),
          })
        : toast.push('Successfully saved');
    }
  };

  return (
    <div>
      <Toast ref={toastRef} onClose={action('close')} onPush={action('push')} />
      <button data-tid="show-toast" onClick={showNotification}>
        Show Toast
      </button>
    </div>
  );
};

export default {
  title: 'Toast',
  decorators: [
    Story => (
      <div
        // make some space for Toast
        style={{
          padding: '30px 0',
        }}
      >
        <Story />
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
    },
  },
} as Meta;

export const SimpleNotification = () => <TestNotifier />;
SimpleNotification.storyName = 'simple notification';

export const ComplexNotification = () => <TestNotifier complex />;
ComplexNotification.storyName = 'complex notification';

export const StaticMethod = () => (
  <button data-tid="show-toast" onClick={() => Toast.push('Static method call')}>
    Show static
  </button>
);
StaticMethod.storyName = 'static method';
