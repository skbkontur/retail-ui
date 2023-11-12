import React from 'react';
import ReactDOM from 'react-dom';
import { globalObject } from '@skbkontur/global-object';

import { Nullable } from '../../typings/utility-types';

import { Toast, Action, ToastDataTids } from './Toast';

export class ToastStaticInternal {
  public static push = (notification: string, action?: Nullable<Action>, showTime?: number) => {
    if (!ToastStaticInternal.node && globalObject.document) {
      ToastStaticInternal.node = globalObject.document.createElement('div');
      const { body } = globalObject.document;
      if (!body) {
        throw Error('There is no "body" element in "document"');
      }
      body.appendChild(ToastStaticInternal.node);

      ReactDOM.render(
        <Toast data-tid={ToastDataTids.toastStatic} ref={(el) => (ToastStaticInternal.instance = el)} />,
        ToastStaticInternal.node,
        () => ToastStaticInternal._push(notification, action, showTime),
      );
    } else {
      ToastStaticInternal._push(notification, action, showTime);
    }
  };

  public static _push = (notification: string, action?: Nullable<Action>, showTime?: number) => {
    if (ToastStaticInternal.instance) {
      ToastStaticInternal.instance.push(notification, action, showTime);
    }
  };

  public static close = () => {
    if (ToastStaticInternal.instance) {
      ToastStaticInternal.instance.close();
    }
  };

  private static node: HTMLDivElement;
  private static instance: Nullable<Toast> = null;
}
