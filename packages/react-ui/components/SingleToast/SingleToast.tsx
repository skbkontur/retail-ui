import React from 'react';
import ReactDOM from 'react-dom';

import type { Nullable } from '../../typings/utility-types';
import type { ToastClose, Action, ToastProps, ToastUse, ToastPushConfig } from '../Toast/Toast';
import { Toast } from '../Toast/Toast';

/**
 * `SingleToast` — это короткое немодальное уведомление, которое сообщает пользователю о результате выполнения его команды.
 * Результат может быть положительным, отрицательным или нейтральным.
 *
 * Позволяет вызывать тосты с помощью статических методов.
 * В отличие от статических методов из компонента Toast их можно кастомизировать и они работают с `React@18`.
 *
 * Метод `push` поддерживает два api.
 *
 * 1. Устаревший с последовательной передачей аргументов: `SingleToast.push('Hi', { label: 'Cancel', handler: () => {} }, 15000)`
 * 2. Новый с передачей объекта конфигурации: `SingleToast.push('Hi', { action: { label: 'Cancel', handler: () => {} }, showTime: 15000 })`
 *
 * Устаревший подход с передачей аргументов последовательным образом **будет удалён** в следующей мажорной версии.
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
   * @description Сейчас есть поддержка старого api метода push с передачей аргументов последовательно, но с версии 6.0 этот функционал будет удалён.
   * @example
   * // Будет удален в 6.0
   * SingleToast.push('notification', { label: "cat meow", handler: () => {} }, 15_000, false, "error")
   *
   * @example
   * // Останется в > 6.0
   * SingleToast.push('notification', { action: { label: "cat meow", handler: () => {} }, showTime: 15_000, showCloseIcon: false, use: "error" })
   */
  public static push = (
    notification: React.ReactNode,
    // TODO: после выпиливания старого api убрать здесь
    configOrAction?: ToastPushConfig | Nullable<Action>,
    showTime?: number,
    showCloseIcon?: boolean,
    use?: ToastUse,
  ) => {
    SingleToast.close();
    SingleToast.ref.current?.push(notification, configOrAction, showTime, showCloseIcon, use);
  };

  render = () => <Toast ref={SingleToast.ref} {...this.props} />;
}
