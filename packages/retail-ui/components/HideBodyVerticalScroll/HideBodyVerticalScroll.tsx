import * as React from 'react';
import getComputedStyle from '../../lib/dom/getComputedStyle';
import getScrollWidth from '../../lib/dom/getScrollWidth';

export interface HideBodyVerticalScrollProps {
  allowScrolling?: boolean;
}

export default class HideBodyVerticalScroll extends React.Component<
  HideBodyVerticalScrollProps
> {
  private disposeDocumentStyle: (() => void) | null = null;
  private disposeBodyStyle: (() => void) | null = null;
  private initialScroll: number = 0;

  public componentDidMount() {
    const counter = VerticalScrollCounter.increment();
    if (counter === 1) {
      this.initialScroll = document.documentElement
        ? document.documentElement.scrollTop
        : 0;
      this.updateScrollVisibility();
      window.addEventListener('resize', this.updateScrollVisibility);
    }
  }

  public componentDidUpdate() {
    this.updateScrollVisibility();
  }

  public componentWillUnmount() {
    const { documentElement, body } = document;
    this.restoreStyles(documentElement, body);

    const counter = VerticalScrollCounter.decrement();
    if (counter === 0) {
      this.updateScrollVisibility();
      window.removeEventListener('resize', this.updateScrollVisibility);
    }
  }

  public render() {
    return null;
  }

  private updateScrollVisibility = () => {
    const { documentElement, body } = document;
    const { clientHeight, scrollHeight } = documentElement;

    this.restoreStyles(documentElement, body);

    const shouldRestore = VerticalScrollCounter.get() === 0;
    const shouldHide = !shouldRestore && clientHeight < scrollHeight;

    if (shouldHide) {
      this.makeSomeMagicWithScroll(documentElement, body);
    }

    if (shouldRestore) {
      documentElement.scrollTop = this.initialScroll;
    }
  };

  private makeSomeMagicWithScroll = (
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

      this.disposeDocumentStyle = this.attachStyle(document, documentStyle);
      const bodyStyle = generateBodyStyle(scrollWidth, rightOffset);
      this.disposeBodyStyle = this.attachStyle(body, bodyStyle);
      body.scrollTop = scrollTop;
    } else {
      const documentStyle = generateDocumentStyle(
        parseFloat(documentComputedStyle.marginRight || '') + getScrollWidth()
      );

      this.disposeDocumentStyle = this.attachStyle(document, documentStyle);
    }
  };

  private attachStyle = (
    element: HTMLElement,
    style: { css: string; className: string }
  ) => {
    element.classList.add(style.className);
    const removeStyleNode = attachStylesheet(style.css);
    return () => {
      removeStyleNode();
      element.classList.remove(style.className);
    };
  };

  private restoreStyles = (document: HTMLElement, body: HTMLElement) => {
    // Must be before _disposeDocumentStyle
    // as it would change after dispose
    const scrollTop = body.scrollTop;

    if (this.disposeDocumentStyle) {
      this.disposeDocumentStyle();
      this.disposeDocumentStyle = null;
    }

    if (this.disposeBodyStyle) {
      this.disposeBodyStyle();
      this.disposeBodyStyle = null;
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
  height: 100%;
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
  height: 100%;
}
`;
  return { className, css };
}

function attachStylesheet(sheet: string) {
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  // @ts-ignore IE specific api
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
    if (head.contains(style)) {
      head.removeChild(style);
    }
  };
}
