import React from 'react';
import { createRoot } from 'react-dom/client';
import { globalObject } from '@skbkontur/global-object';

import { Nullable } from '../../typings/utility-types';

import { Toast, Action, ToastDataTids } from './Toast';

export class ToastStatic {
  public static push = async (notification: string, action?: Nullable<Action>, showTime?: number) => {
    if (!ToastStatic.node && globalObject.document) {
      ToastStatic.node = globalObject.document.createElement('div');
      const { body } = globalObject.document;
      if (!body) {
        throw Error('There is no "body" element in "document"');
      }
      body.appendChild(ToastStatic.node);

      const root = createRoot(ToastStatic.node);
      await root.render(<Toast data-tid={ToastDataTids.toastStatic} ref={(el) => (ToastStatic.instance = el)} />);
      ToastStatic._push(notification, action, showTime);
    } else {
      ToastStatic._push(notification, action, showTime);
    }
  };

  public static _push = (notification: string, action?: Nullable<Action>, showTime?: number) => {
    if (ToastStatic.instance) {
      ToastStatic.instance.push(notification, action, showTime);
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
