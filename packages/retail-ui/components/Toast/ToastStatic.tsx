import * as React from 'react';
import ReactDOM from 'react-dom';

import Toast from './Toast';
import { Action } from './Toast';
import { Nullable } from '../../typings/utility-types';

class ToastStatic {
  public static push = (notification: string, action?: Action) => {
    if (!ToastStatic.node) {
      ToastStatic.node = document.createElement('div');
      const { body } = document;
      if (!body) {
        throw Error('There is no "body" element in "document"');
      }
      body.appendChild(ToastStatic.node);

      ReactDOM.render(<Toast ref={el => (ToastStatic.instance = el)} />, ToastStatic.node, () =>
        ToastStatic._push(notification, action),
      );
    } else {
      ToastStatic._push(notification, action);
    }
  };

  public static _push = (notification: string, action?: Action) => {
    if (ToastStatic.instance) {
      ToastStatic.instance.push(notification, action);
    }
  };

  public static close = () => {
    if (ToastStatic.instance) {
      ToastStatic.instance.close();
    }
  };

  private static node: HTMLDivElement;
  private static instance: Nullable<Toast> = null;
}

export default ToastStatic;
