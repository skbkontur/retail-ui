// @flow
import * as React from 'react';
import getComputedStyle from '../../lib/dom/getComputedStyle';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import event from 'add-event-listener';
import LayoutEvents from '../../lib/LayoutEvents';

type Props = {
  allowScrolling?: boolean
};

export default class HideBodyVerticalScroll extends React.Component<Props> {
  _documentStyle: ?{ marginRight: string, overflow: string };
  _bodyStyle: ?{
    marginRight: string,
    overflowY: string,
    paddingRight: string
  };

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

  _updateScrollVisibility = () => {
    const { documentElement, body } = document;
    if (documentElement && body) {
      this._restoreStyles(documentElement, body);

      const justRestore = VerticalScrollCounter.get() === 0;
      const { clientHeight, scrollHeight } = documentElement;
      const needHide = !justRestore && clientHeight < scrollHeight;

      if (needHide) {
        this._storeStyles(documentElement, body);
        this._makeSomeMagicWithScroll(documentElement, body);
      }

      LayoutEvents.emit();
    }
  };

  _storeStyles = (document: HTMLElement, body: HTMLElement) => {
    const documentComputedStyle = getComputedStyle(document);

    this._documentStyle = {
      overflow: documentComputedStyle.overflow,
      marginRight: documentComputedStyle.marginRight
    };

    if (this.props.allowScrolling) {
      const bodyComputedStyle = getComputedStyle(body);

      this._bodyStyle = {
        overflowY: bodyComputedStyle.overflowY,
        marginRight: bodyComputedStyle.marginRight,
        paddingRight: bodyComputedStyle.paddingRight
      };
    }
  };

  _restoreStyles = (document: HTMLElement, body: HTMLElement) => {
    const scrollTop = body.scrollTop;

    const documentStyle = this._documentStyle;
    if (documentStyle) {
      document.style.overflow = documentStyle.overflow;
      document.style.marginRight = documentStyle.marginRight;
      this._documentStyle = null;
    }

    const bodyStyle = this._bodyStyle;
    if (bodyStyle) {
      body.style.overflowY = bodyStyle.overflowY;
      body.style.paddingRight = bodyStyle.paddingRight;
      body.style.marginRight = bodyStyle.marginRight;
      this._bodyStyle = null;

      document.scrollTop = scrollTop;
    }
  };

  _makeSomeMagicWithScroll = (document: HTMLElement, body: HTMLElement) => {
    const documentStyle = this._documentStyle;
    if (documentStyle) {
      const bodyStyle = this._bodyStyle;
      if (bodyStyle) {
        const documentMargin = parseFloat(documentStyle.marginRight);
        const bodyMargin = parseFloat(bodyStyle.marginRight);
        const bodyPadding = parseFloat(bodyStyle.paddingRight);
        const scrollWidth = getScrollWidth();

        const rightOffset = bodyMargin + bodyPadding + documentMargin;

        const scrollTop = document.scrollTop;
        document.style.overflow = 'hidden';
        document.style.marginRight = `${documentMargin}px`;
        body.style.overflowY = 'auto';
        body.style.marginRight = `-${scrollWidth}px`;
        body.style.paddingRight = `${2 * scrollWidth + rightOffset}px`;
        body.scrollTop = scrollTop;
      } else {
        const marginRight = parseFloat(documentStyle.marginRight);
        document.style.marginRight = `${marginRight + getScrollWidth()}px`;
        document.style.overflow = 'hidden';
      }
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
