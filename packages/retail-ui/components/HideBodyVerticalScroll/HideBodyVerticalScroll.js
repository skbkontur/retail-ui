
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
  _disposeDocumentStyle: (() => void) | null = null;
  _disposeBodyStyle: (() => void) | null = null;

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
    const documentComputedStyle = getComputedStyle(document);
    const bodyComputedStyle = getComputedStyle(body);

    if (this.props.allowScrolling) {
      const documentMargin = parseFloat(documentComputedStyle.marginRight);
      const bodyMargin = parseFloat(bodyComputedStyle.marginRight);
      const bodyPadding = parseFloat(bodyComputedStyle.paddingRight);
      const scrollWidth = getScrollWidth();

      const rightOffset = bodyMargin + bodyPadding + documentMargin;

      const scrollTop = document.scrollTop;
      const documentStyle = generateDocumentStyle(documentMargin);
      this._disposeDocumentStyle = this._attachStyle(document, documentStyle);
      const bodyStyle = generateBodyStyle(scrollWidth, rightOffset);
      this._disposeBodyStyle = this._attachStyle(body, bodyStyle);
      body.scrollTop = scrollTop;
    } else {
      const documentStyle = generateDocumentStyle(
        parseFloat(documentComputedStyle.marginRight) + getScrollWidth()
      );
      this._disposeDocumentStyle = this._attachStyle(document, documentStyle);
    }
  };

  _attachStyle = (
    element: HTMLElement,
    style: { css: string, className: string }
  ) => {
    addClass(element, style.className);
    const removeStyleNode = attachStylesheet(style.css);
    return () => {
      removeStyleNode();
      removeClass(element, style.className);
    };
  };

  _restoreStyles = (document: HTMLElement, body: HTMLElement) => {
    // Must be before _disposeDocumentStyle
    // as it would change after dispose
    const scrollTop = body.scrollTop;

    if (this._disposeDocumentStyle) {
      this._disposeDocumentStyle();
      this._disposeDocumentStyle = null;
    }

    if (this._disposeBodyStyle) {
      this._disposeBodyStyle();
      this._disposeBodyStyle = null;
      document.scrollTop = scrollTop;
    }

    // Forcing reflow for Firefix
    attachStylesheet('html, body { height: auto; }')();
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

function generateClassName(className) {
  const compName = HideBodyVerticalScroll.name;
  const hash = Math.random()
    .toString(16)
    .slice(2, 6);
  return `${compName}-${className}-${hash}`;
}

function generateDocumentStyle(documentMargin) {
  const className = generateClassName('document');
  const css = `\
.${className} {
  overflow: hidden !important;
  margin-right: ${documentMargin}px !important;
}
`;
  return { className, css };
}

function generateBodyStyle(scrollWidth, rightOffset) {
  const className = generateClassName('body');
  const css = `\
.${className} {
  overflow-y: auto !important;
  margin-right: -${scrollWidth}px !important;
  padding-right: ${2 * scrollWidth + rightOffset}px !important;
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
