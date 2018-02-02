// @flow
import * as React from 'react';
import getComputedStyle from '../../lib/dom/getComputedStyle';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import event from 'add-event-listener';
import LayoutEvents from '../../lib/LayoutEvents';

export default class HideBodyVerticalScroll extends React.Component<{}> {
  _originalStyle: ?{ marginRight: string, overflowY: string };

  componentDidMount() {
    const counter = VerticalScrollCounter.increment();
    if (counter === 1) {
      this._updateScrollVisibility();
      event.addEventListener(window, 'resize', this._updateScrollVisibility);
    }
  }

  componentWillUnmount() {
    const counter = VerticalScrollCounter.decrement();
    if (counter === 0) {
      this._updateScrollVisibility();
      event.removeEventListener(window, 'resize', this._updateScrollVisibility);
    }
  }

  render() {
    return null;
  }

  _updateScrollVisibility = (): boolean => {
    const { documentElement } = document;
    if (!documentElement) {
      return false;
    }

    this._restoreOriginalStyle(documentElement);

    const justRestore = VerticalScrollCounter.get() === 0;
    const { clientHeight, scrollHeight } = documentElement;
    const needHide = !justRestore && clientHeight < scrollHeight;

    if (needHide) {
      this._storeOriginalStyle(documentElement);
      this._hideScroll(documentElement);
    }

    LayoutEvents.emit();
    return needHide;
  };

  _storeOriginalStyle = (element: HTMLElement) => {
    const computedStyle = getComputedStyle(element);

    this._originalStyle = {
      marginRight: computedStyle.marginRight,
      overflowY: computedStyle.overflowY
    };
  };

  _restoreOriginalStyle = (element: HTMLElement) => {
    const originalStyle = this._originalStyle;

    if (originalStyle) {
      element.style.marginRight = originalStyle.marginRight;
      element.style.overflowY = originalStyle.overflowY;
      this._originalStyle = null;
    }
  };

  _hideScroll = (element: HTMLElement) => {
    const originalStyle = this._originalStyle;

    if (originalStyle) {
      const marginRight = parseFloat(originalStyle.marginRight);
      element.style.marginRight = `${marginRight + getScrollWidth()}px`;
      element.style.overflowY = 'hidden';
    }
  };
}

class VerticalScrollCounter {
  static increment = (): number => {
    const counter = global.RetailUIVerticalScrollCounter || 0;
    return (global.RetailUIVerticalScrollCounter = counter + 1);
  };

  static decrement = (): number => {
    const counter = global.RetailUIVerticalScrollCounter || 0;
    return (global.RetailUIVerticalScrollCounter = counter - 1);
  };

  static get = (): number => {
    return global.RetailUIVerticalScrollCounter || 0;
  };
}
