import React from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';

export class HideBodyVerticalScroll extends React.Component {
  public static __KONTUR_REACT_UI__ = 'HideBodyVerticalScroll';

  public static hash = Math.random()
    .toString(16)
    .slice(2, 6);
  private disposeDocumentStyle: (() => void) | null = null;
  private initialScroll = 0;
  private master = false;

  public componentDidMount() {
    const counter = VerticalScrollCounter.increment();
    if (counter === 1) {
      this.master = true;
      this.initialScroll = document.documentElement ? document.documentElement.scrollTop : 0;
      this.updateScrollVisibility();
      window.addEventListener('resize', this.updateScrollVisibility);
    }
  }

  public componentDidUpdate() {
    if (this.master) {
      this.updateScrollVisibility();
    }
  }

  public componentWillUnmount() {
    this.restoreStyles();

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
    const { documentElement } = document;

    this.restoreStyles();

    if (!documentElement) {
      return;
    }

    const { clientHeight, scrollHeight } = documentElement;
    const shouldRestore = VerticalScrollCounter.get() === 0;
    const shouldHide = !shouldRestore && clientHeight < scrollHeight;

    if (shouldHide) {
      this.makeSomeMagicWithScroll(documentElement);
    }

    if (shouldRestore) {
      documentElement.scrollTop = this.initialScroll;
    }
  };

  private makeSomeMagicWithScroll = (document: HTMLElement) => {
    const documentComputedStyle = getComputedStyle(document);
    const scrollWidth = getScrollWidth();
    const documentMargin = parseFloat(documentComputedStyle.marginRight || '');
    const documentStyle = generateDocumentStyle(documentMargin + scrollWidth);

    this.disposeDocumentStyle = this.attachStyle(document, documentStyle);
  };

  private attachStyle = (element: HTMLElement, style: { css: string; className: string }) => {
    element.classList.add(style.className);
    const removeStyleNode = attachStylesheet(style.css);
    return () => {
      removeStyleNode();
      element.classList.remove(style.className);
    };
  };

  private restoreStyles = () => {
    if (this.disposeDocumentStyle) {
      this.disposeDocumentStyle();
      this.disposeDocumentStyle = null;
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
  const { name, hash } = HideBodyVerticalScroll;
  return `${name}-${className}-${hash}`;
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
