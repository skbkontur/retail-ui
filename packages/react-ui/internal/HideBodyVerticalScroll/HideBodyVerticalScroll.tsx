import React from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { css } from '../../lib/theming/Emotion';

let disposeDocumentStyle: (() => void) | null = null;

export class HideBodyVerticalScroll extends React.Component {
  public static __KONTUR_REACT_UI__ = 'HideBodyVerticalScroll';

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
    const counter = VerticalScrollCounter.decrement();
    if (counter === 0) {
      this.restoreStyles();
      window.removeEventListener('resize', this.updateScrollVisibility);
    }
  }

  public render() {
    return null;
  }

  private updateScrollVisibility = () => {
    const { documentElement } = document;
    if (!documentElement) {
      return;
    }

    const { clientHeight, scrollHeight } = documentElement;
    const shouldHide = !disposeDocumentStyle && clientHeight <= scrollHeight;

    if (shouldHide) {
      this.hideScroll(documentElement);
    }
  };

  private hideScroll = (document: HTMLElement) => {
    const documentComputedStyle = getComputedStyle(document);
    const scrollWidth = getScrollWidth();
    const documentMargin = parseFloat(documentComputedStyle.marginRight || '');
    const className = generateDocumentStyle(documentMargin + scrollWidth);

    disposeDocumentStyle = this.attachStyle(document, className);
  };

  private attachStyle = (element: HTMLElement, className: string) => {
    element.classList.add(className);
    return () => {
      element.classList.remove(className);
    };
  };

  private restoreStyles = () => {
    if (disposeDocumentStyle) {
      disposeDocumentStyle();
      disposeDocumentStyle = null;

      const { documentElement } = document;

      if (documentElement) {
        documentElement.scrollTop = this.initialScroll;
      }
    }
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

function generateDocumentStyle(documentMargin: number) {
  return css`
    overflow: hidden !important;
    margin-right: ${documentMargin}px !important;
    height: 100%;
  `;
}
