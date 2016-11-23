/* @flow */
import React, {Component} from 'react';

import RenderContainer from '../RenderContainer';
import Transition from 'react-addons-css-transition-group';
import Toast from '../Toast';

import './Notifier.less';

export type Action = {
  label: string,
  handler: () => void
}

type State = {
  notification: ?string,
  action: ?Action,
  id: number
}

type Props = {
  onPush?: (notification: string, action?: Action) => void,
  onClose?: (notification: string, action?: Action) => void
}

/**
 * Notifier manages tosts
 * method `push` is sending notification,
 * then automatically hides it after 3 or 7 seconds,
 * depending is this toast contains action or not.
 *
 * There is also NotifierWidget with static `push`
 */
class Notifier extends Component {

  state: State;
  props: Props;

  _timeout: number;
  _toast: Toast;

  constructor(props: Props) {
    super(props);
    this.state = {
      notification: null,
      action: null,
      id: 0,
    };
  }

  componentWillUnmount() {
    this._clearTimer();
  }

  /**
   * @api
   */
  push(notification: string, action?: Action) {
    if (this.notification) {
      this.close();
    }

    safelyCall(this.props.onPush, notification, action);

    this.setState(
      ({id}) => ({notification, action, id: id + 1}),
      this._setTimer
    );
  }

  /**
   * @api
   */
  close = () => {
    safelyCall(this.props.onClose, this.state.notification, this.state.action);
    this.setState({notification: null, action: null});
  }

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
    const {notification, action, id} = this.state;

    if (!notification) {
      return null;
    }

    const toastProps: Object = {
      key: id,
      onMouseEnter: this._clearTimer,
      onMouseLeave: this._setTimer,
      onClose: this.close,
      children: notification,
      action,
      ref: this._refToast,
    };

    return <Toast {...toastProps} />;
  }

  _refToast = (el: Toast) => {
    this._toast = el;
  }

  _clearTimer = () => {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = 0;
    }
  }

  _setTimer = () => {
    this._clearTimer();

    const timeOut = typeof this.state.notification === 'string' ? 3 : 7;

    this._timeout = setTimeout(this.close, timeOut * 1000);
  }
}

export default Notifier;

function safelyCall(fn: ?Function, ...args: any[]) {
  if (fn) {
    fn(...args);
  }
}
