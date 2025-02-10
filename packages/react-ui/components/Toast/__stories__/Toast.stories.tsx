import React from 'react';
import { action } from '@storybook/addon-actions';

import { SingleToast } from '../../SingleToast';
import { Meta } from '../../../typings/stories';
import { Toast } from '../Toast';
import { Gapped } from '../../Gapped';

const TestNotifier = ({ complex }: { complex?: boolean }) => {
  const toastRef = React.useRef<Toast>(null);
  const showNotification = () => {
    const { current: toast } = toastRef;
    if (toast) {
      complex
        ? toast.push(
            'Successfully saved',
            {
              label: 'Cancel',
              handler: action('cancel_save'),
            },
            1000000,
          )
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
  component: Toast,
  decorators: [
    (Story: () => JSX.Element) => (
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
      skip: { 'flickering screenshot': { in: /^(?!\b(firefox))/, tests: 'toastShown' } },
    },
  },
} as Meta;

export const SimpleNotification = () => <TestNotifier />;
SimpleNotification.storyName = 'simple notification';

export const ComplexNotification = () => <TestNotifier complex />;
ComplexNotification.storyName = 'complex notification';

export const StaticMethod = () => (
  <>
    <SingleToast />
    <button data-tid="show-toast" onClick={() => SingleToast.push('Static method call')}>
      Show static
    </button>
  </>
);
StaticMethod.storyName = 'static method';

export const ToastWithCross = () => {
  function showComplexNotification() {
    Toast.push('Toast throw static method', null, 10000, true);
  }

  const toastRef = React.useRef<Toast>(null);
  const showNotification = () => {
    const { current: toast } = toastRef;
    if (toast) {
      toast.push('Toast throw instance method', null, 10000, true);
    }
  };

  return (
    <Gapped>
      <button data-tid="show-static-toast" onClick={showComplexNotification}>
        Show Toast throw static push
      </button>

      <div>
        <Toast ref={toastRef} onClose={action('close')} onPush={action('push')} />
        <button data-tid="show-instance-toast" onClick={showNotification}>
          Show Toast
        </button>
      </div>
    </Gapped>
  );
};
