import React from 'react';
import { action } from '@storybook/addon-actions';

import { Meta } from '../../../typings/stories';
import { ToastProvider, useToast } from '../function';

type TestNotifierProps = {
  complex?: boolean;
};

const TestNotifier = ({ complex }: TestNotifierProps) => {
  const { addToast } = useToast();

  const showNotification = () => {
    if (complex) {
      return {
        label: 'Cancel',
        handler: action('cancel_save'),
      };
    }

    return undefined;
  };

  return (
    <button data-tid="show-toast" onClick={() => addToast('Successfully saved', showNotification())}>
      Show Toast
    </button>
  );
};

const TestNotifierWithProvider = ({ complex }: TestNotifierProps) => {
  return (
    <ToastProvider>
      <TestNotifier complex={complex} />
    </ToastProvider>
  );
};

export default {
  title: 'components/Toast',
  decorators: [
    (Story) => (
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

          await this.browser.actions({ bridge: true }).click(showToast).move({ x: 0, y: 0 }).click().perform();

          await this.expect(await this.takeScreenshot()).to.matchImage();
        },
      },
    },
  },
} as Meta;

export const SimpleNotification = () => <TestNotifierWithProvider />;
SimpleNotification.storyName = 'simple notification';

export const ComplexNotification = () => <TestNotifierWithProvider complex />;
ComplexNotification.storyName = 'complex notification';
