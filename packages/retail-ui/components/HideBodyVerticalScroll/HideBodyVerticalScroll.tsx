import * as React from 'react';
import getComputedStyle from '../../lib/dom/getComputedStyle';
import getScrollWidth from '../../lib/dom/getScrollWidth';
import event from 'add-event-listener';
import LayoutEvents from '../../lib/LayoutEvents';
import addClass from '../../lib/dom/addClass';
import removeClass from '../../lib/dom/removeClass';

export interface HideBodyVerticalScrollProps {
  allowScrolling?: boolean;
}

export default class HideBodyVerticalScroll extends React.Component<
  HideBodyVerticalScrollProps
> {
  private _disposeDocumentStyle: (() => void) | null = null;
  private _disposeBodyStyle: (() => void) | null = null;
  private initialScroll: number = 0;

  public componentDidMount() {
    const counter = VerticalScrollCounter.increment();
    if (counter === 1) {
      this.initialScroll = document.documentElement.scrollTop;
      this._updateScrollVisibility();
      event.addEventListener(window, 'resize', this._updateScrollVisibility);
    }
  }

  public componentDidUpdate() {
    this._updateScrollVisibility();
  }

  public componentWillUnmount() {
    const counter = VerticalScrollCounter.decrement();
    if (counter === 0) {
      this._updateScrollVisibility();
      event.removeEventListener(window, 'resize', this._updateScrollVisibility);
    }
  }

  public render() {
    return null;
  }

  private _updateScrollVisibility = () => {
    const { documentElement, body } = document;
    if (documentElement && body) {
      this._restoreStyles(documentElement, body);

      const justRestore = VerticalScrollCounter.get() === 0;
      const { clientHeight, scrollHeight } = documentElement;
      const needHide = !justRestore && clientHeight < scrollHeight;

      if (needHide) {
        this._makeSomeMagicWithScroll(documentElement, body);
      }

      if (justRestore) {
        documentElement.scrollTop = this.initialScroll;
      }

      LayoutEvents.emit();
    }
  };

  private _makeSomeMagicWithScroll = (
    document: HTMLElement,
    body: HTMLElement
  ) => {
    const documentComputedStyle = getComputedStyle(document);
    const bodyComputedStyle = getComputedStyle(body);

    if (this.props.allowScrolling) {
      const documentMargin = parseFloat(
        documentComputedStyle.marginRight || ''
      );
      const bodyMargin = parseFloat(bodyComputedStyle.marginRight || '');
      const bodyPadding = parseFloat(bodyComputedStyle.paddingRight || '');
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
        parseFloat(documentComputedStyle.marginRight || '') + getScrollWidth()
      );
      this._disposeDocumentStyle = this._attachStyle(document, documentStyle);
    }
  };

  private _attachStyle = (
    element: HTMLElement,
    style: { css: string; className: string }
  ) => {
    addClass(element, style.className);
    const removeStyleNode = attachStylesheet(style.css);
    return () => {
      removeStyleNode();
      removeClass(element, style.className);
    };
  };

  private _restoreStyles = (document: HTMLElement, body: HTMLElement) => {
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
  public static increment = (): number => {
    const counter = window.RetailUIVerticalScrollCounter || 0;
    return (window.RetailUIVerticalScrollCounter = counter + 1);
  };

  public static decrement = (): number => {
    const counter = window.RetailUIVerticalScrollCounter || 0;
    return (window.RetailUIVerticalScrollCounter = counter - 1);
  };

  public static get = (): number => {
    return window.RetailUIVerticalScrollCounter || 0;
  };
}

function generateClassName(className: string) {
  const compName = HideBodyVerticalScroll.name;
  const hash = Math.random()
    .toString(16)
    .slice(2, 6);
  return `${compName}-${className}-${hash}`;
}

function generateDocumentStyle(documentMargin: number) {
  const className = generateClassName('document');
  const css = `\
.${className} {
  overflow: hidden !important;
  margin-right: ${documentMargin}px !important;
}
`;
  return { className, css };
}

function generateBodyStyle(scrollWidth: number, rightOffset: number) {
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
  // @ts-ignore
  if (style.styleSheet) {
    // @ts-ignore IE specific api
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
