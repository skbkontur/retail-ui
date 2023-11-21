import React from 'react';
import ReactDOM from 'react-dom';

import { Toast, ToastProps } from '../Toast/Toast';

/**
 * Позволяет вызывать тосты с помощью статических методов. В отличие от статических методов из компонента `<Toast>` - их можно кастомизировать и они работают с `React@18`.
 */
export class SingleToast extends React.Component<ToastProps> {
  public static ref = React.createRef<Toast>();
  public static push: typeof Toast.push = (...args) => {
    SingleToast.close();
    SingleToast.ref.current?.push(...args);
  };
  public static close: typeof Toast.close = () => {
    ReactDOM.flushSync(() => SingleToast.ref.current?.close());
  };
  render = () => {
    return <Toast ref={SingleToast.ref} {...this.props} />;
  };
}
