import React from 'react';
import ReactDOM from 'react-dom';

import { Toast, Action } from './Toast';

export class ToastStatic {
  public static push = (notification: string, action?: Action) => {
    if (!ToastStatic.node) {
      ToastStatic.node = document.createElement('div');
      const { body } = document;
      if (!body) {
        throw Error('There is no "body" element in "document"');
      }
      body.appendChild(ToastStatic.node);

      ReactDOM.render(<Toast data-tid="StaticToast" ref={ToastStatic.instance} />, ToastStatic.node, () =>
        ToastStatic._push(notification, action),
      );
    } else {
      ToastStatic._push(notification, action);
    }
  };

  public static _push = (notification: string, action?: Action) => {
    ToastStatic.instance.current?.push(notification, action);
  };

  public static close = () => {
    ToastStatic.instance.current?.close();
  };

  private static node: HTMLDivElement;
  private static instance = React.createRef<Toast>();
}
