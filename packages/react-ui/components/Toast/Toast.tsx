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
  id: number;
}

export interface ToastProps extends CommonProps {
  onPush?: (notification: string, action?: Action) => void;
  onClose?: (notification: string, action?: Action) => void;
}

/**
 * Toast manages notifications
 * method `push` is sending notification,
 * then automatically hides it after 3 or 7 seconds,
 * depending on if this notification contains action or not.
 *
 * Can be used like `Toast.push('message')` or
 * `Toast.push('message', {label: 'Cancel', handler: cancelHandler})`
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

  constructor(props: ToastProps) {
    super(props);
    this.state = {
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
   *
   * `action` опциональный параметр формата `{ label: string, handler: function }` добавляет кнопку в виде ссылки при клике на которую вызывается переданный handler
   * @public
   * @param notification
   * @param action
   */
  public push(notification: string, action?: Action) {
    if (this.state.notification) {
      this.close();
    }

    safelyCall(this.props.onPush, notification, action);

    this.setState(({ id }) => ({ notification, action, id: id + 1 }), this._setTimer);
  }

  /**
   * @public
   */
  public close = () => {
    safelyCall(this.props.onClose, this.state.notification, this.state.action);
    this.setState({ notification: null, action: null });
  };

  private _renderToast() {
    const { notification, action, id } = this.state;

    if (!notification) {
      return null;
    }

    const toastProps: ToastViewProps = {
      onMouseEnter: this._clearTimer,
      onMouseLeave: this._setTimer,
      onClose: this.close,
      children: notification,
      action,
    };

    return (
      <CSSTransition
        key={id}
        classNames={{
          enter: jsStyles.enter(),
          enterActive: jsStyles.enterActive(),
          exit: jsStyles.exit(),
          exitActive: jsStyles.exitActive(),
        }}
        timeout={{
          enter: 200,
          exit: 150,
        }}
        enter={!isTestEnv}
        exit={!isTestEnv}
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

  private _setTimer = () => {
    this._clearTimer();

    const timeOut = this.state.action ? 7 : 3;

    this._timeout = window.setTimeout(this.close, timeOut * 1000);
  };

  private _refToast = (element: ToastView) => {
    this._toast = element;
  };
}

function safelyCall(fn: Nullable<(a?: any) => any>, ...args: any[]) {
  if (fn) {
    fn(...args);
  }
}
