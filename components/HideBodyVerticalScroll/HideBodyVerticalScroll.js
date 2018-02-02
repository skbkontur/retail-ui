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
  _documentOriginalStyle: ?{ marginRight: string, overflow: string };
  _bodyOriginalStyle: ?{
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
      this._restoreOriginalData(documentElement, body);

      const justRestore = VerticalScrollCounter.get() === 0;
      const { clientHeight, scrollHeight } = documentElement;
      const needHide = !justRestore && clientHeight < scrollHeight;

      if (needHide) {
        this._storeOriginalStyles(documentElement, body);
        this._hideScroll(documentElement, body);
      }

      LayoutEvents.emit();
    }
  };

  _storeOriginalStyles = (document: HTMLElement, body: HTMLElement) => {
    const documentComputedStyle = getComputedStyle(document);

    this._documentOriginalStyle = {
      overflow: documentComputedStyle.overflow,
      marginRight: documentComputedStyle.marginRight
    };

    if (this.props.allowScrolling) {
      const bodyComputedStyle = getComputedStyle(body);

      this._bodyOriginalStyle = {
        overflowY: bodyComputedStyle.overflowY,
        marginRight: bodyComputedStyle.marginRight,
        paddingRight: bodyComputedStyle.paddingRight
      };
    }
  };

  _restoreOriginalData = (document: HTMLElement, body: HTMLElement) => {
    const needRestore = this._documentOriginalStyle && this._bodyOriginalStyle;

    if (needRestore && this.props.allowScrolling) {
      const scrollTop = body.scrollTop;
      this._restoreDocumentOriginalStyle(document);
      document.scrollTop = scrollTop;
      this._restoreBodyOriginalStyle(body);
    } else if (needRestore) {
      this._restoreDocumentOriginalStyle(document);
    }
  };

  _restoreDocumentOriginalStyle = (document: HTMLElement) => {
    const originalStyle = this._documentOriginalStyle;
    if (originalStyle) {
      document.style.overflow = originalStyle.overflow;
      document.style.marginRight = originalStyle.marginRight;
      this._documentOriginalStyle = null;
    }
  };

  _restoreBodyOriginalStyle = (body: HTMLElement) => {
    const originalStyle = this._bodyOriginalStyle;
    if (originalStyle) {
      body.style.overflowY = originalStyle.overflowY;
      body.style.paddingRight = originalStyle.paddingRight;
      body.style.marginRight = originalStyle.marginRight;
      this._bodyOriginalStyle = null;
    }
  };

  _hideScroll = (document: HTMLElement, body: HTMLElement) => {
    if (this.props.allowScrolling) {
      const scrollTop = document.scrollTop;
      this._hideDocumentScroll(document);
      this._hideBodyScroll(body);
      body.scrollTop = scrollTop;
    } else {
      this._hideDocumentScroll(document);
    }
  };

  _hideDocumentScroll = (document: HTMLElement) => {
    const originalStyle = this._documentOriginalStyle;
    if (originalStyle) {
      const marginRight = parseFloat(originalStyle.marginRight);
      document.style.overflow = 'hidden';
      if (!this.props.allowScrolling) {
        document.style.marginRight = `${marginRight + getScrollWidth()}px`;
      }
    }
  };

  _hideBodyScroll = (body: HTMLElement) => {
    const documentStyle = this._documentOriginalStyle;
    const bodyOriginalStyle = this._bodyOriginalStyle;
    if (documentStyle && bodyOriginalStyle) {
      const documentMargin = parseFloat(documentStyle.marginRight);
      const bodyMargin = parseFloat(bodyOriginalStyle.marginRight);
      const bodyPadding = parseFloat(bodyOriginalStyle.paddingRight);
      const scrollWidth = getScrollWidth();

      const sumRightOffset = bodyMargin + bodyPadding + documentMargin;

      body.style.overflowY = 'auto';
      body.style.marginRight = `-${scrollWidth}px`;
      body.style.paddingRight = `${2 * scrollWidth + sumRightOffset}px`;
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
