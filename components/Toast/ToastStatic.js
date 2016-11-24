// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import Toast from './Toast';
import type {Action} from './Toast';

class ToastStatic {
  static node: ?HTMLDivElement = null;
  static instance: ?Toast = null;

  static push = function(notification: string, action?: Action) {
    if (!ToastStatic.node) {
      ToastStatic.node = document.createElement('div');

      document.body.appendChild(ToastStatic.node);

      ReactDOM.render(
        <Toast ref={el => ToastStatic.instance = el}/>,
        ToastStatic.node,
        () => ToastStatic._push(notification, action)
      );

    } else {
      ToastStatic._push(notification, action);
    }
  }

  static _push = function(notification, action) {
    if (ToastStatic.instance) {
      ToastStatic.instance.push(notification, action);
    }
  }

  static close = function() {
    if (ToastStatic.instance) {
      ToastStatic.instance.close();
    }
  }
}

export default ToastStatic;
