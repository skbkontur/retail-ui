import React from 'react';
import ReactDOM from 'react-dom';
import { globalObject } from '@skbkontur/global-object';

import { Nullable } from '../../typings/utility-types';

import { Toast, Action, ToastDataTids } from './Toast';

export class ToastStatic {
  public static push = (
    notification: string,
    action?: Nullable<Action>,
    showTime?: number,
    showCloseIcon?: boolean,
  ) => {
    if (!ToastStatic.node && globalObject.document) {
      ToastStatic.node = globalObject.document.createElement('div');
      const { body } = globalObject.document;
      if (!body) {
        throw Error('There is no "body" element in "document"');
      }
      body.appendChild(ToastStatic.node);

      ReactDOM.render(
        <Toast data-tid={ToastDataTids.toastStatic} ref={(el) => (ToastStatic.instance = el)} />,
        ToastStatic.node,
        () => ToastStatic._push(notification, action, showTime, showCloseIcon),
      );
    } else {
      ToastStatic._push(notification, action, showTime, showCloseIcon);
    }
  };

  public static _push = (
    notification: string,
    action?: Nullable<Action>,
    showTime?: number,
    showCloseIcon?: boolean,
  ) => {
    if (ToastStatic.instance) {
      ToastStatic.instance.push(notification, action, showTime, showCloseIcon);
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
