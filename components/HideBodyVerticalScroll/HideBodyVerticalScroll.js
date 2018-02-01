// @flow
import * as React from 'react';
import getComputedStyle from '../../lib/dom/getComputedStyle';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import events from 'add-event-listener';
import LayoutEvents from '../../lib/LayoutEvents';

type Props = {
  children?: React.Node
};

export default class HideBodyVerticalScroll extends React.Component<Props, {}> {
  componentDidMount() {
    const counter = VerticalScrollManager.incrementScrollHideCounter();
    if (counter === 1) {
      VerticalScrollManager.updateScrollVisibility();
      events.addEventListener(
        window,
        'resize',
        VerticalScrollManager.updateScrollVisibility
      );
    }
  }

  componentWillUnmount() {
    const counter = VerticalScrollManager.decrementScrollHideCounter();
    if (counter === 0) {
      VerticalScrollManager.updateScrollVisibility();
      events.removeEventListener(
        window,
        'resize',
        VerticalScrollManager.updateScrollVisibility
      );
    }
  }

  render() {
    return this.props.children;
  }
}

class VerticalScrollManager {
  static _originalStyle: ?{ marginRight: string, overflowY: string };

  static incrementScrollHideCounter = (): number => {
    const counter = global.RetailUIHideScrollCounter || 0;
    return (global.RetailUIHideScrollCounter = counter + 1);
  };

  static decrementScrollHideCounter = (): number => {
    const counter = global.RetailUIHideScrollCounter || 0;
    return (global.RetailUIHideScrollCounter = counter - 1);
  };

  static getScrollHideCounter = (): number => {
    return global.RetailUIHideScrollCounter || 0;
  };

  static updateScrollVisibility = (): boolean => {
    const { documentElement } = document;
    if (!documentElement) {
      return false;
    }

    VerticalScrollManager._restoreOriginalStyle(documentElement);

    const justRestore = VerticalScrollManager.getScrollHideCounter() === 0;
    const { clientHeight, scrollHeight } = documentElement;
    const needHide = !justRestore && clientHeight < scrollHeight;

    if (needHide) {
      VerticalScrollManager._storeOriginalStyle(documentElement);
      VerticalScrollManager._hideScroll(documentElement);
    }

    LayoutEvents.emit();
    return needHide;
  };

  static _storeOriginalStyle = (element: HTMLElement) => {
    const computedStyle = getComputedStyle(element);

    VerticalScrollManager._originalStyle = {
      marginRight: computedStyle.marginRight,
      overflowY: computedStyle.overflowY
    };
  };

  static _restoreOriginalStyle = (element: HTMLElement) => {
    const originalStyle = VerticalScrollManager._originalStyle;

    if (originalStyle) {
      element.style.marginRight = originalStyle.marginRight;
      element.style.overflowY = originalStyle.overflowY;
      VerticalScrollManager._originalStyle = null;
    }
  };

  static _hideScroll = (element: HTMLElement) => {
    const originalStyle = VerticalScrollManager._originalStyle;

    if (originalStyle) {
      const marginRight = parseFloat(originalStyle.marginRight);
      element.style.marginRight = `${marginRight + getScrollWidth()}px`;
      element.style.overflowY = 'hidden';
    }
  };
}
