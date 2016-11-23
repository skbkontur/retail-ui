// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import Notifier from './Notifier';
import type {Action} from './Notifier';

class NotifierWidget {
  static node: ?HTMLDivElement = null;
  static instance: ?Notifier = null;

  static push(notification: string, action?: Action) {
    if (!NotifierWidget.node) {
      NotifierWidget.node = document.createElement('div');

      document.body.appendChild(NotifierWidget.node);

      ReactDOM.render(
        <Notifier ref={el => NotifierWidget.instance = el}/>,
        NotifierWidget.node,
        () => this._push(notification, action)
      );

    } else {
      this._push(notification, action);
    }
  }

  static _push = (notification, action) => {
    if (NotifierWidget.instance) {
      NotifierWidget.instance.push(notification, action);
    }
  }
}

export default NotifierWidget;
