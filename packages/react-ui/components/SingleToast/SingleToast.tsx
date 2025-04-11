import React from 'react';
import ReactDOM from 'react-dom';

import { Toast, ToastProps } from '../Toast/Toast';

/**
 * `SingleToast` — это короткое немодальное уведомление, которое сообщает пользователю о результате выполнения его команды.
 * Результат может быть положительным, отрицательным или нейтральным.
 *
 * Позволяет вызывать тосты с помощью статических методов.
 * В отличие от статических методов из компонента Toast их можно кастомизировать и они работают с `React@18`.
 */
export class SingleToast extends React.Component<ToastProps> {
  public static __KONTUR_REACT_UI__ = 'SingleToast';
  public static displayName = 'SingleToast';

  public static ref = React.createRef<Toast>();
  public static push: typeof Toast.push = (...args) => {
    SingleToast.close();
    SingleToast.ref.current?.push(...args);
  };
  public static close: typeof Toast.close = () => {
    if (React.version.search('18') === 0) {
      ReactDOM.flushSync(() => SingleToast.ref.current?.close());
    } else {
      SingleToast.ref.current?.close();
    }
  };
  render = () => {
    return <Toast ref={SingleToast.ref} {...this.props} />;
  };
}
