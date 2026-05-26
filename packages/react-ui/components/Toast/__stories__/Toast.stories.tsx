import { action } from '@storybook/addon-actions';
import React, { type JSX } from 'react';

import type { Meta } from '../../../typings/stories.js';
import { Gapped } from '../../Gapped/index.js';
import { Toast } from '../Toast.js';
import type { ToastUse } from '../Toast.js';

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

const paddingDecorator = (Story: () => JSX.Element) => (
  <div
    // make some space for Toast
    style={{
      padding: '30px 0',
    }}
  >
    <Story />
  </div>
);

const mobileDecorator = (Story: () => JSX.Element) => {
  return (
    <div
      style={{
        width: '375px',
        height: '100vh',
      }}
    >
      <Story />
    </div>
  );
};

const meta: Meta = {
  title: 'Toast',
  component: Toast,
  parameters: {
    creevey: {
      captureElement: 'body',
      skip: { 'flickering screenshot': { in: /^(?!\b(firefox|chromeMobile))/, tests: 'toastShown' } },
    },
  },
};

export default meta;

export const SimpleNotification = () => <TestNotifier />;
SimpleNotification.storyName = 'simple notification';
SimpleNotification.decorators = [paddingDecorator];

export const ComplexNotification = () => <TestNotifier complex />;
ComplexNotification.storyName = 'complex notification';
ComplexNotification.decorators = [paddingDecorator];

export const UseErrorExample = () => <TestNotifier use="error" />;
UseErrorExample.storyName = 'use error example';
UseErrorExample.decorators = [paddingDecorator];

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
ReactNodeExample.decorators = [paddingDecorator];

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
ToastWithCross.decorators = [paddingDecorator];

export const MobileSimple = () => {
  const toastRef = React.useRef<Toast>(null);
  const showNotification = () => {
    const { current: toast } = toastRef;

    if (toast) {
      toast.push('Mobile Simple example', {
        action: null,
        showTime: 10_000,
      });
    }
  };

  React.useEffect(() => {
    showNotification();

    return () => {
      toastRef.current?.close();
    };
  }, [toastRef]);

  return (
    <div>
      <Toast ref={toastRef} />
      <button data-tid="show-instance-toast" onClick={showNotification}>
        Show toast
      </button>
    </div>
  );
};

MobileSimple.storyName = 'mobile simple notification';
MobileSimple.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};

MobileSimple.decorators = [mobileDecorator];

export const MobileSimpleVeryLongText = () => {
  const toastRef = React.useRef<Toast>(null);
  const showNotification = () => {
    const { current: toast } = toastRef;

    if (toast) {
      toast.push(`Mobile Simple example with long text ${'very'.repeat(10)} long text`, {
        action: null,
        showTime: 10_000,
      });
    }
  };

  React.useEffect(() => {
    showNotification();

    return () => {
      toastRef.current?.close();
    };
  }, [toastRef]);

  return (
    <div>
      <Toast ref={toastRef} />
      <button data-tid="show-instance-toast" onClick={showNotification}>
        Show toast
      </button>
    </div>
  );
};

MobileSimpleVeryLongText.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};
MobileSimpleVeryLongText.decorators = [mobileDecorator];

export const MobileSimpleWithAction = () => {
  const toastRef = React.useRef<Toast>(null);
  const showNotification = () => {
    const { current: toast } = toastRef;

    if (toast) {
      toast.push('Mobile Simple with icon', {
        action: {
          label: 'Action',
          handler: () => {},
        },
        showTime: 10_000,
        showCloseIcon: true,
      });
    }
  };

  React.useEffect(() => {
    showNotification();
    return () => {
      toastRef.current?.close();
    };
  }, [toastRef]);

  return (
    <div>
      <Toast ref={toastRef} />
      <button data-tid="show-instance-toast" onClick={showNotification}>
        Show toast
      </button>
    </div>
  );
};

MobileSimpleWithAction.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};
MobileSimpleWithAction.decorators = [mobileDecorator];

export const MobileSimpleVeryLongTextWithAction = () => {
  const toastRef = React.useRef<Toast>(null);
  const showNotification = () => {
    const { current: toast } = toastRef;

    if (toast) {
      toast.push(
        'Mobile Simple with very long text and icon close button action for test ellipsis content, very many text',
        {
          action: {
            label: 'Action',
            handler: () => {},
          },
          showTime: 10_000,
          showCloseIcon: true,
        },
      );
    }
  };

  React.useEffect(() => {
    showNotification();

    return () => {
      toastRef.current?.close();
    };
  }, [toastRef]);

  return (
    <div>
      <Toast ref={toastRef} />
      <button data-tid="show-instance-toast" onClick={showNotification}>
        Show toast
      </button>
    </div>
  );
};

MobileSimpleVeryLongTextWithAction.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
};
MobileSimpleVeryLongTextWithAction.decorators = [mobileDecorator];
