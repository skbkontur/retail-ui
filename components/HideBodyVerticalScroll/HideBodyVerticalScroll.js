// @flow
import * as React from 'react';
import getComputedStyle from '../../lib/dom/getComputedStyle';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import event from 'add-event-listener';
import LayoutEvents from '../../lib/LayoutEvents';
import addClass from '../../lib/dom/addClass';
import removeClass from '../../lib/dom/removeClass';

type Props = {
  allowScrolling?: boolean
};

export default class HideBodyVerticalScroll extends React.Component<Props> {
  _documentStyle: ?{ css: string, className: string };
  _bodyStyle: ?{ css: string, className: string };
  _removeStyles: Array<() => void> = [];

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
        this._makeSomeMagicWithScroll(documentElement, body);
      }

      LayoutEvents.emit();
    }
  };

  _makeSomeMagicWithScroll = (document: HTMLElement, body: HTMLElement) => {
    const documentStyle = getComputedStyle(document);
    if (documentStyle) {
      const bodyStyle = getComputedStyle(body);
      if (bodyStyle) {
        const documentMargin = parseFloat(documentStyle.marginRight);
        const bodyMargin = parseFloat(bodyStyle.marginRight);
        const bodyPadding = parseFloat(bodyStyle.paddingRight);
        const scrollWidth = getScrollWidth();

        const rightOffset = bodyMargin + bodyPadding + documentMargin;

        const scrollTop = document.scrollTop;
        this._documentStyle = getDocumentStyles(documentMargin);
        this._bodyStyle = getBodyStyles(scrollWidth, rightOffset);
        body.scrollTop = scrollTop;
      } else {
        const marginRight = parseFloat(documentStyle.marginRight);
        this._documentStyle = getDocumentStyles(marginRight + getScrollWidth());
      }

      this._attachStyles(document, body);
    }
  };

  _attachStyles = (document, body) => {
    const { _bodyStyle, _documentStyle } = this;

    if (_documentStyle) {
      addClass(document, _documentStyle.className);
      this._removeStyles.push(attachStylesheet(_documentStyle.css));
    }

    if (_bodyStyle) {
      addClass(body, _bodyStyle.className);
      this._removeStyles.push(attachStylesheet(_bodyStyle.css));
    }
  };

  _restoreStyles = (document: HTMLElement, body: HTMLElement) => {
    this._removeStyles.forEach(x => x());

    const { _bodyStyle, _documentStyle } = this;

    const scrollTop = body.scrollTop;

    if (_documentStyle) {
      removeClass(document, _documentStyle.className);
      this._documentStyle = null;
    }

    if (_bodyStyle) {
      removeClass(body, _bodyStyle.className);
      this._bodyStyle = null;
      document.scrollTop = scrollTop;
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

function getClassName(cn) {
  const compName = HideBodyVerticalScroll.name;
  const hash = Math.random()
    .toString(16)
    .slice(2, 6);
  return `${compName}-${cn}-${hash}`;
}

function getDocumentStyles(documentMargin) {
  const className = getClassName('document');
  const css = `\
.${className} {
  overflow: hidden;
  margin-right: ${documentMargin}px;
}
`;
  return { className, css };
}

function getBodyStyles(scrollWidth, rightOffset) {
  const className = getClassName('body');
  const css = `\
.${className} {
  overflow-y: auto;
  margin-right: -${scrollWidth}px;
  padding-right = ${2 * scrollWidth + rightOffset}px;
}
`;
  return { className, css };
}

function attachStylesheet(sheet: string) {
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  if (style.styleSheet) {
    // $FlowIgnore IE specific api
    style.styleSheet.cssText = sheet;
  } else {
    const textnode = document.createTextNode(sheet);
    style.appendChild(textnode);
  }
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
  return () => {
    head.removeChild(style);
  };
}
