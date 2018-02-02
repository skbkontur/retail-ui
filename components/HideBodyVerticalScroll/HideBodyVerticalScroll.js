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
      this._restoreData(documentElement, body);

      const justRestore = VerticalScrollCounter.get() === 0;
      const { clientHeight, scrollHeight } = documentElement;
      const needHide = !justRestore && clientHeight < scrollHeight;

      if (needHide) {
        this._storeStyles(documentElement, body);
        this._hideScroll(documentElement, body);
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

  _restoreData = (document: HTMLElement, body: HTMLElement) => {
    if (this._documentStyle && this._bodyStyle && this.props.allowScrolling) {
      const scrollTop = body.scrollTop;
      this._restoreDocumentStyle(document);
      document.scrollTop = scrollTop;
      this._restoreBodyStyle(body);
    } else if (this._documentStyle) {
      this._restoreDocumentStyle(document);
    }
  };

  _restoreDocumentStyle = (document: HTMLElement) => {
    const style = this._documentStyle;
    if (style) {
      document.style.overflow = style.overflow;
      document.style.marginRight = style.marginRight;
      this._documentStyle = null;
    }
  };

  _restoreBodyStyle = (body: HTMLElement) => {
    const style = this._bodyStyle;
    if (style) {
      body.style.overflowY = style.overflowY;
      body.style.paddingRight = style.paddingRight;
      body.style.marginRight = style.marginRight;
      this._bodyStyle = null;
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
    const style = this._documentStyle;
    if (style) {
      const marginRight = parseFloat(style.marginRight);
      document.style.overflow = 'hidden';
      if (!this.props.allowScrolling) {
        document.style.marginRight = `${marginRight + getScrollWidth()}px`;
      }
    }
  };

  _hideBodyScroll = (body: HTMLElement) => {
    const documentStyle = this._documentStyle;
    const bodyStyle = this._bodyStyle;
    if (documentStyle && bodyStyle) {
      const documentMargin = parseFloat(documentStyle.marginRight);
      const bodyMargin = parseFloat(bodyStyle.marginRight);
      const bodyPadding = parseFloat(bodyStyle.paddingRight);
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
