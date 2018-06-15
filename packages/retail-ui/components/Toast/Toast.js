
import React, { Component } from 'react';

import RenderContainer from '../RenderContainer';
import Transition from 'react-addons-css-transition-group';
import ToastView from './ToastView';
import ToastStatic from './ToastStatic';

import './Toast.less';

export type Action = {
  label: string,
  handler: () => void
};

type State = {
  notification: ?string,
  action: ?Action,
  id: number
};

type Props = {
  onPush?: (notification: string, action?: Action) => void,
  onClose?: (notification: string, action?: Action) => void
};

/**
 * Toast manages notifications
 * method `push` is sending notification,
 * then automatically hides it after 3 or 7 seconds,
 * depending on if this notification contains action or not.
 *
 * Can be used like `Toast.push('message')` or
 * `Toast.push('message', {label: 'Cancel', handler: cancelHandler})`
 */
class Toast extends Component<Props, State> {
  _timeout: TimeoutID | null = null;
  _toast: ToastView;

  constructor(props: Props) {
    super(props);
    this.state = {
      notification: null,
      action: null,
      id: 0
    };
  }

  componentWillUnmount() {
    this._clearTimer();
  }

  /**
   * @public
   */
  static push(notification: string, action?: Action) {
    ToastStatic.push(notification, action);
  }

  push(notification: string, action?: Action) {
    if (this.notification) {
      this.close();
    }

    safelyCall(this.props.onPush, notification, action);

    this.setState(
      ({ id }) => ({ notification, action, id: id + 1 }),
      this._setTimer
    );
  }

  /**
   * @public
   */
  static close() {
    ToastStatic.close();
  }

  close = () => {
    safelyCall(this.props.onClose, this.state.notification, this.state.action);
    this.setState({ notification: null, action: null });
  };

  render() {
    return (
      <RenderContainer>
        <Transition
          transitionName="slide-and-fade"
          transitionAppear={true}
          transitionAppearTimeout={200}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={150}
        >
          {this._renderToast()}
        </Transition>
      </RenderContainer>
    );
  }

  _renderToast() {
    const { notification, action, id } = this.state;

    if (!notification) {
      return null;
    }

    // eslint-disable-next-line flowtype/no-weak-types
    const toastProps: Object = {
      key: id,
      onMouseEnter: this._clearTimer,
      onMouseLeave: this._setTimer,
      onClose: this.close,
      children: notification,
      action,
      ref: this._refToast
    };

    return <ToastView {...toastProps} />;
  }

  _refToast = (el: ToastView) => {
    this._toast = el;
  };

  _clearTimer = () => {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  };

  _setTimer = () => {
    this._clearTimer();

    const timeOut = this.state.action ? 7 : 3;

    this._timeout = setTimeout(this.close, timeOut * 1000);
  };
}

export default Toast;

// eslint-disable-next-line flowtype/no-weak-types
function safelyCall(fn: ?Function, ...args: any[]) {
  if (fn) {
    fn(...args);
  }
}
