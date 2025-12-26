import React from 'react';
import ReactDOM from 'react-dom';

import type { ToastClose, ToastProps, ToastPushApi, ToastPushConfig } from '../Toast';
import { Toast } from '../Toast';

/**
 * `SingleToast` — это короткое немодальное уведомление, которое сообщает пользователю о результате выполнения его команды.
 * Результат может быть положительным, отрицательным или нейтральным.
 *
 * Позволяет вызывать тосты с помощью статических методов.
 *
 * ##### Особенности компонента SingleToast
 * Для корректной работы `<SingleToast />` должен быть отрисован только **один раз** на странице. После чего его можно вызывать из любого места приложения методом `SingleToast.push()`. Однако, переданные в компонент пропсы, такие как `theme`, `onPush` и остальные, будут применяться ко всем вызовам.
 */
export class SingleToast extends React.Component<ToastProps> {
  public static __KONTUR_REACT_UI__ = 'SingleToast';
  public static displayName = 'SingleToast';
  public static ref = React.createRef<Toast>();

  public static close: ToastClose = () => {
    if (React.version.search('18') === 0) {
      ReactDOM.flushSync(() => SingleToast.ref.current?.close());
    } else {
      SingleToast.ref.current?.close();
    }
  };

  /**
   * Показывает тост с `notification` в качестве сообщения.
   * Тост автоматически скрывается через 3 или 7 секунд,
   * в зависимости от наличия у него кнопки `action` внутри config-а.
   * Время показа можно задать вручную, передав `showTime` внутри config-а.
   *
   * @public
   * @param {React.ReactNode} notification
   * @param {ToastPushConfig} config объект с конфигурацией отображения компонента Toast
   *
   */
  public static push: ToastPushApi = (notification: React.ReactNode, config?: ToastPushConfig): void => {
    SingleToast.close();
    SingleToast.ref.current?.push(notification, config);
  };

  render = (): React.JSX.Element => <Toast ref={SingleToast.ref} {...this.props} />;
}
