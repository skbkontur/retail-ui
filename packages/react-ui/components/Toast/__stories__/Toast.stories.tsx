import React, { type JSX } from 'react';
import { action } from '@storybook/addon-actions';

import type { Meta } from '../../../typings/stories';
import type { ToastUse } from '../Toast';
import { Toast } from '../Toast';
import { Gapped } from '../../Gapped';

const TestNotifier = ({ complex, use }: { complex?: boolean; use?: ToastUse }) => {
  const toastRef = React.useRef<Toast>(null);
  const showNotification = () => {
    const { current: toast } = toastRef;
    if (toast) {
      complex
        ? toast.push('Successfully saved', {
            action: {
              label: 'Cancel',
              handler: action('cancel_save'),
            },
            showTime: 1000000,
          })
        : toast.push('Successfully saved', { use });
    }
  };

  React.useEffect(() => {
    return () => {
      toastRef.current?.close();
    };
  }, [toastRef]);

  return (
    <div>
      <Toast ref={toastRef} onClose={action('close')} onPush={action('push')} />
      <button data-tid="show-toast" onClick={showNotification}>
        Show Toast
      </button>
    </div>
  );
};

const meta: Meta = {
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
};

export default meta;

export const SimpleNotification = () => <TestNotifier />;
SimpleNotification.storyName = 'simple notification';

export const ComplexNotification = () => <TestNotifier complex />;
ComplexNotification.storyName = 'complex notification';

export const UseErrorExample = () => <TestNotifier use="error" />;
UseErrorExample.storyName = 'use error example';

export const ReactNodeExample = () => {
  const toastRef = React.useRef<Toast>(null);

  return (
    <>
      <Toast ref={toastRef} />
      <button data-tid="show-toast" onClick={() => toastRef.current?.push(<div>ReactNode example</div>)}>
        Show toast
      </button>
    </>
  );
};
ReactNodeExample.storyName = 'react node example';

export const ToastWithCross = () => {
  const toastRef = React.useRef<Toast>(null);
  const showNotification = () => {
    const { current: toast } = toastRef;

    if (toast) {
      toast.push('Toast throw instance method', { action: null, showTime: 10_000, showCloseIcon: true });
    }
  };

  React.useEffect(() => {
    return () => {
      toastRef.current?.close();
    };
  }, [toastRef]);

  return (
    <Gapped>
      <div>
        <Toast ref={toastRef} />
        <button data-tid="show-instance-toast" onClick={showNotification}>
          Show Toast
        </button>
      </div>
    </Gapped>
  );
};
