import React from 'react';
import ReactDOM from 'react-dom';

import { Toast, ToastProps } from '../Toast/Toast';

/**
 * Позволяет вызывать тосты с помощью статических методов. В отличие от статических методов из компонента `<Toast>` - их можно кастомизировать и они работают с `React@18`.
 */
export class ToastStatic extends React.Component<ToastProps> {
  public static ref = React.createRef<Toast>();
  public static push: typeof Toast.push = (...args) => {
    ToastStatic.close();
    ToastStatic.ref.current?.push(...args);
  };
  public static close: typeof Toast.close = () => {
    ReactDOM.flushSync(() => ToastStatic.ref.current?.close());
  };
  render = () => {
    return <Toast ref={ToastStatic.ref} {...this.props} />;
  };
}
