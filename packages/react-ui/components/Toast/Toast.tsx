import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { RenderContainer } from '../../internal/RenderContainer';
import { Nullable } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { isTestEnv } from '../../lib/currentEnvironment';

import { jsStyles } from './Toast.styles';
import { ToastView, ToastViewProps } from './ToastView';
import { ToastStatic } from './ToastStatic';

export interface Action {
  label: string;
  handler: () => void;
}

export interface ToastState {
  notification: Nullable<string>;
  action: Nullable<Action>;
  progress: number;
  id: number;
}

export interface ToastProps extends CommonProps {
  onPush?: (notification: string, action?: Action) => void;
  onClose?: (notification: string, action?: Action) => void;
}

/**
 * Показывает уведомления.
 *
 * Доступен статический метод: `Toast.push(notification, action?)`.
 * Однако, при его использовании не работает кастомизация и могут быть проблемы
 * с перекрытием уведомления другими элементами страницы.
 *
 * Рекомендуется использовать Toast через `ref` (см. примеры).
 */
export class Toast extends React.Component<ToastProps, ToastState> {
  public static __KONTUR_REACT_UI__ = 'Toast';

  public static push(notification: string, action?: Action) {
    ToastStatic.push(notification, action);
  }

  public static close() {
    ToastStatic.close();
  }

  public _toast: Nullable<ToastView>;
  private _timeout: Nullable<number> = null;
  private _progressTimeout: Nullable<number> = null;

  constructor(props: ToastProps) {
    super(props);
    this.state = {
      progress: 0,
      notification: null,
      action: null,
      id: 0,
    };
  }

  public componentWillUnmount() {
    this._clearTimer();
  }

  public render() {
    return (
      <RenderContainer>
        <TransitionGroup>{this._renderToast()}</TransitionGroup>
      </RenderContainer>
    );
  }

  /**
   * Показывает тост с `notification` в качестве сообщения.
   * Тост автоматически скрывается через 3 или 7 секунд,
   * в зависимости от наличия у него кнопки `action`.
   *
   * @public
   * @param {string} notification
   * @param {Action} action `action` опциональный параметр формата `{ label: string, handler: function }`
   * добавляет кнопку в виде ссылки при клике на которую вызывается переданный handler
   */
  public push(notification: string, action?: Action) {
    if (this.state.notification) {
      this.close();
    }

    safelyCall(this.props.onPush, notification, action);

    this.setState(({ id }) => ({ notification, action, id: id + 1, progress: 0 }), this._setTimer);
  }

  /**
   * @public
   */
  public close = () => {
    safelyCall(this.props.onClose, this.state.notification, this.state.action);
    this._clearProgressTimeout();
    this.setState({ notification: null, action: null });
  };

  private _renderToast() {
    const { notification, action, id } = this.state;

    if (!notification) {
      return null;
    }

    const toastProps: ToastViewProps = {
      onMouseEnter: this._clearTimer,
      progress: this.state.progress,
      onMouseLeave: this._setTimer,
      onClose: this.close,
      children: notification,
      action,
    };

    return (
      <CSSTransition
        key={id}
        classNames={{
          exit: jsStyles.exit(),
          enter: jsStyles.enter(),
          exitActive: jsStyles.exitActive(),
          enterActive: jsStyles.enterActive(),
        }}
        timeout={{
          enter: 200,
          exit: 150,
        }}
        enter={!isTestEnv}
        exit={!isTestEnv}
        onEntered={this.fillProgressBar}
      >
        <CommonWrapper {...this.props}>
          <ToastView ref={this._refToast} {...toastProps} />
        </CommonWrapper>
      </CSSTransition>
    );
  }

  private _clearTimer = () => {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  };

  private _clearProgressTimeout = () => {
    if (this._progressTimeout) {
      clearTimeout(this._progressTimeout);
      this._progressTimeout = null;
    }
  };

  private _setTimer = () => {
    this._clearTimer();

    this._timeout = window.setTimeout(this.close, this.timeOut * 1000);
  };

  private get timeOut() {
    return this.state.action ? 7 : 3;
  }

  private _refToast = (element: ToastView) => {
    this._toast = element;
  };

  private fillProgressBar = () => {
    const timeOut = this.timeOut;
    const curProgress = this.state.progress;

    const passTime = (curProgress * timeOut) / 100;
    const progress = (100 * (passTime + 1)) / timeOut;

    this.setState({ ...this.state, progress });

    this._progressTimeout = window.setTimeout(() => this.fillProgressBar(), 1000);
  };
}

function safelyCall(fn: Nullable<(a?: any) => any>, ...args: any[]) {
  if (fn) {
    fn(...args);
  }
}
