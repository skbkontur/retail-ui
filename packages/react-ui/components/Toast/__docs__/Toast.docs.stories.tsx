import React from 'react';
import { Toast, Button, Gapped } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Overlay/Toast',
  component: Toast,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  function showComplexNotification() {
    Toast.push('Successfully saved', {
      label: 'Cancel',
      handler: () => Toast.push('Canceled'),
    });
  }

  return <Button onClick={showComplexNotification}>Show notification</Button>;
};
Example1.storyName = 'Вызов статических методов';

export const Example2: Story = () => {
  function showComplexNotification() {
    Toast.push(
      'Successfully saved',
      {
        label: 'Cancel',
        handler: () => Toast.push('Canceled'),
      },
      15000,
    );
  }

  return <Button onClick={showComplexNotification}>Show notification</Button>;
};
Example2.storyName = 'Кастомный showTime';

export const Example3: Story = () => {
  function showComplexNotification() {
    Toast.push('Successfully saved', null, 15000);
  }

  return <Button onClick={showComplexNotification}>Show notification</Button>;
};
Example3.storyName = 'Кастомный showTime без action';

export const Example4: Story = () => {
  class Toaster extends React.Component {
    showNotification() {
      this.notifier.push('Successfully');
    }

    render() {
      return (
        <div>
          <Toast
            ref={(el) => {
              this.notifier = el;
            }}
          />
          <Button onClick={() => this.showNotification()}>Show notification</Button>
        </div>
      );
    }
  }

  return <Toaster />;
};
Example4.storyName = 'Использование `ref`';

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
      <Button data-tid="show-static-toast" onClick={showComplexNotification}>
        Show Toast throw static push
      </Button>

      <div>
        <Toast ref={toastRef} />
        <Button data-tid="show-instance-toast" onClick={showNotification}>
          Show Toast
        </Button>
      </div>
    </Gapped>
  );
};
ToastWithCross.storyName = 'Крестик без кнопки действия';

export const ToastWithReactNode = () => (
  <div>
    <Button
      data-tid="show-toast"
      onClick={() =>
        Toast.push(
          <div>
            Эту и другую полезную информацию вы найдете в разделе{' '}
            <a href="/" target="_blank" style={{ color: '#69c5ff', fontWeight: 'bold', textDecoration: 'none' }}>
              Помощь
            </a>
          </div>,
        )
      }
    >
      Show toast
    </Button>
  </div>
);
ToastWithReactNode.storyName = 'Тост с кастомным ReactNode';
