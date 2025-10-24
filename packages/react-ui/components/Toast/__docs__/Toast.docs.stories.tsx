import React from 'react';
import { Toast, Button, Gapped, SingleToast } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Overlay/Toast',
  component: Toast,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Default: Story = () => {
  const toastRef = React.useRef<Toast>(null);

  const showNotification = () => {
    const { current: toast } = toastRef;
    if (toast) {
      toast.push('Default text');
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <Button onClick={showNotification}>Show notification</Button>
    </>
  );
};
Default.storyName = 'Базовый пример использования Toast-а';

export const WithAction: Story = () => {
  const toastRef = React.useRef<Toast>(null);

  const showNotification = () => {
    const { current: toast } = toastRef;
    if (toast) {
      toast.push('Toast with action', {
        action: { label: 'Cancel', handler: () => toast.push('Canceled') },
      });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <Button onClick={showNotification}>Show notification</Button>
    </>
  );
};
WithAction.storyName = 'Тост с кнопкой действия';

export const CustomShowTime: Story = () => {
  const toastRef = React.useRef<Toast>(null);

  const showNotification = () => {
    const { current: toast } = toastRef;
    if (toast) {
      toast.push('Toast with custom showTime', { showTime: 15_000 });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <Button onClick={showNotification}>Show notification</Button>
    </>
  );
};
CustomShowTime.storyName = 'Кастомный showTime';

export const ExampleWithCallbackRef: Story = () => {
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
ExampleWithCallbackRef.storyName = 'Использование `ref`';

export const ToastWithCross = () => {
  const toastRef = React.useRef<Toast>(null);

  const showNotification = () => {
    const { current: toast } = toastRef;
    if (toast) {
      toast.push('Toast with cross', { showCloseIcon: true });
    }
  };

  return (
    <Gapped>
      <div>
        <Toast ref={toastRef} />
        <Button data-tid="show-instance-toast" onClick={showNotification}>
          Show Toast
        </Button>
      </div>
    </Gapped>
  );
};
ToastWithCross.storyName = 'С крестиком для закрытия';

export const ToastWithReactNode = () => {
  const toastRef = React.useRef<Toast>(null);

  const showNotification = () => {
    const { current: toast } = toastRef;
    if (toast) {
      toast.push(
        <div>
          Эту и другую полезную информацию вы найдете в разделе{' '}
          <a href="/" target="_blank" style={{ color: '#69c5ff', fontWeight: 'bold', textDecoration: 'none' }}>
            Помощь
          </a>
        </div>,
      );
    }
  };

  return (
    <div>
      <Toast ref={toastRef} />
      <Button data-tid="show-toast" onClick={showNotification}>
        Show toast
      </Button>
    </div>
  );
};
ToastWithReactNode.storyName = 'Тост с кастомным ReactNode';

export const ToastWithUseError = () => {
  const toastRef = React.useRef<Toast>(null);

  const showNotification = () => {
    const { current: toast } = toastRef;

    if (toast) {
      toast.push('Toast with use error', { use: 'error' });
    }
  };

  return (
    <Gapped>
      <div>
        <Toast ref={toastRef} />
        <Button data-tid="show-instance-toast" onClick={showNotification}>
          Show Toast With Error
        </Button>
      </div>
    </Gapped>
  );
};
ToastWithUseError.storyName = 'Тост в состоянии ошибки';

export const SingleToastExample = () => {
  const showNotification = () => {
    SingleToast.push('Пример использования SingleToast');
  };

  return (
    <Gapped>
      <div>
        <SingleToast />
        <Button data-tid="show-instance-toast" onClick={showNotification}>
          Show Toast
        </Button>
      </div>
    </Gapped>
  );
};
SingleToastExample.storyName = 'Пример использования статического метода у SingleToast';
