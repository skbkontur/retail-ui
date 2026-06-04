import React from 'react';
import ReactDOM from 'react-dom';

import { REACT_MAJOR_VERSION } from '../../lib/react-is.js';
import type { ToastClose, ToastProps, ToastPushApi, ToastPushConfig } from '../Toast/index.js';
import { Toast } from '../Toast/index.js';

/**
 * Короткое немодальное уведомление, которое сообщает пользователю о результате выполнения его команды.
 * Результат может быть положительным, отрицательным или нейтральным.
 *
 * Компонент позволяет управлять тостом из любого места приложения статическими методами `SingleToast.push` и `SingleToast.close`.
 */
export class SingleToast extends React.Component<ToastProps> {
  public static __KONTUR_REACT_UI__ = 'SingleToast';
  public static displayName = 'SingleToast';
  public static ref = React.createRef<Toast>();

  /**
   * Закрывает текущее уведомление без ожидания таймера.
   *
   * @public
   */
  public static close: ToastClose = () => {
    if (REACT_MAJOR_VERSION >= 18) {
      ReactDOM.flushSync(() => SingleToast.ref.current?.close());
    } else {
      SingleToast.ref.current?.close();
    }
  };

  /**
   * Показывает уведомление: перед этим закрывает уже открытый тост, затем передаёт вызов внутреннему `Toast.push` (таймер, `showTime`, `action` и остальной конфиг — как у экземпляра `Toast`).
   *
   * @public
   * @param {React.ReactNode} notification
   * @param {ToastPushConfig} config объект с конфигурацией отображения тоста
   */
  public static push: ToastPushApi = (notification: React.ReactNode, config?: ToastPushConfig): void => {
    SingleToast.close();
    SingleToast.ref.current?.push(notification, config);
  };

  render = (): React.JSX.Element => <Toast ref={SingleToast.ref} {...this.props} />;
}
