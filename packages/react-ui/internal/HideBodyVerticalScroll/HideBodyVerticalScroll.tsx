import React from 'react';
import { globalObject, isBrowser } from '@skbkontur/global-object';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { css } from '../../lib/theming/Emotion';

let disposeDocumentStyle: (() => void) | null = null;

interface GlobalWithRetailUIVerticalScrollCounter {
  RetailUIVerticalScrollCounter?: number;
}

export class HideBodyVerticalScroll extends React.Component {
  public static __KONTUR_REACT_UI__ = 'HideBodyVerticalScroll';
  public static displayName = 'HideBodyVerticalScroll';

  private initialScroll = 0;
  private master = false;

  public componentDidMount() {
    const counter = VerticalScrollCounter.increment();
    if (counter === 1) {
      this.master = true;
      this.initialScroll = globalObject.document?.documentElement ? globalObject.document.documentElement.scrollTop : 0;
      HideBodyVerticalScroll.updateScrollVisibility();
      globalObject.addEventListener?.('resize', HideBodyVerticalScroll.updateScrollVisibility);
    }
  }

  public componentDidUpdate() {
    if (this.master) {
      HideBodyVerticalScroll.updateScrollVisibility();
    }
  }

  public componentWillUnmount() {
    const counter = VerticalScrollCounter.decrement();
    if (counter === 0) {
      this.restoreStyles();
      globalObject.removeEventListener?.('resize', HideBodyVerticalScroll.updateScrollVisibility);
    }
  }

  public render() {
    return null;
  }

  public static updateScrollVisibility = () => {
    const shouldHide = !disposeDocumentStyle;
    if (shouldHide) {
      HideBodyVerticalScroll.hideScroll();
    }
  };

  public static hideScroll = () => {
    if (!isBrowser(globalObject)) {
      return;
    }
    const { documentElement } = globalObject.document;
    const { clientHeight, scrollHeight } = documentElement;
    const documentComputedStyle = globalObject.getComputedStyle(documentElement);
    const scrollbarConst = globalObject.getComputedStyle(documentElement).overflowY === 'scroll';
    const scrollWidth = clientHeight < scrollHeight || scrollbarConst ? getScrollWidth() : 0;
    const documentMargin = parseFloat(documentComputedStyle.marginRight || '');
    const className = generateDocumentStyle(documentMargin + scrollWidth);

    disposeDocumentStyle = HideBodyVerticalScroll.attachStyle(documentElement, className);
  };

  public static attachStyle = (element: HTMLElement, className: string) => {
    element.classList.add(className);
    return () => {
      element.classList.remove(className);
    };
  };

  private restoreStyles = () => {
    if (disposeDocumentStyle) {
      disposeDocumentStyle();
      disposeDocumentStyle = null;

      if (globalObject.document) {
        globalObject.document.documentElement.scrollTop = this.initialScroll;
      }
    }
  };
}

class VerticalScrollCounter {
  public static increment = (): number => {
    const globalWithRetailUIVerticalScrollCounter = globalObject as GlobalWithRetailUIVerticalScrollCounter;
    const counter = globalWithRetailUIVerticalScrollCounter.RetailUIVerticalScrollCounter || 0;
    return (globalWithRetailUIVerticalScrollCounter.RetailUIVerticalScrollCounter = counter + 1);
  };

  public static decrement = (): number => {
    const globalWithRetailUIVerticalScrollCounter = globalObject as GlobalWithRetailUIVerticalScrollCounter;
    const counter = globalWithRetailUIVerticalScrollCounter.RetailUIVerticalScrollCounter || 0;
    return (globalWithRetailUIVerticalScrollCounter.RetailUIVerticalScrollCounter = counter - 1);
  };

  public static get = (): number => {
    const globalWithRetailUIVerticalScrollCounter = globalObject as GlobalWithRetailUIVerticalScrollCounter;
    return globalWithRetailUIVerticalScrollCounter.RetailUIVerticalScrollCounter || 0;
  };
}

function generateDocumentStyle(documentMargin: number) {
  return css`
    overflow: hidden !important;
    margin-right: ${documentMargin}px !important;
    height: 100%;
  `;
}
