import type { Emotion } from '@emotion/css/create-instance';
import React from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth.js';
import type { GlobalObject } from '../../lib/globalObject.js';
import { isBrowser } from '../../lib/globalObject.js';
import { RenderEnvironmentContext } from '../../lib/renderEnvironment/index.js';

let disposeDocumentStyle: (() => void) | null = null;

interface GlobalWithRetailUIVerticalScrollCounter {
  RetailUIVerticalScrollCounter?: number;
}

export class HideBodyVerticalScroll extends React.Component {
  public static __KONTUR_REACT_UI__ = 'HideBodyVerticalScroll';
  public static displayName = 'HideBodyVerticalScroll';

  public static globalObject: GlobalObject;
  private static emotion: Emotion;

  private initialScroll = 0;
  private master = false;

  public componentDidMount() {
    const counter = VerticalScrollCounter.increment();
    if (counter === 1) {
      this.master = true;
      this.initialScroll = HideBodyVerticalScroll.globalObject.document?.documentElement
        ? HideBodyVerticalScroll.globalObject.document.documentElement.scrollTop
        : 0;
      HideBodyVerticalScroll.updateScrollVisibility();
      HideBodyVerticalScroll.globalObject.addEventListener?.('resize', HideBodyVerticalScroll.updateScrollVisibility);
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
      HideBodyVerticalScroll.globalObject.removeEventListener?.(
        'resize',
        HideBodyVerticalScroll.updateScrollVisibility,
      );
    }
  }

  public render() {
    return (
      <RenderEnvironmentContext.Consumer>
        {({ globalObject, emotion }) => {
          HideBodyVerticalScroll.globalObject = globalObject;
          HideBodyVerticalScroll.emotion = emotion;

          return null;
        }}
      </RenderEnvironmentContext.Consumer>
    );
  }

  public static updateScrollVisibility = () => {
    const shouldHide = !disposeDocumentStyle;
    if (shouldHide) {
      HideBodyVerticalScroll.hideScroll();
    }
  };

  public static hideScroll = () => {
    if (!isBrowser(HideBodyVerticalScroll.globalObject)) {
      return;
    }
    const { documentElement } = HideBodyVerticalScroll.globalObject.document;
    const { clientHeight, scrollHeight } = documentElement;
    const documentComputedStyle = HideBodyVerticalScroll.globalObject.getComputedStyle(documentElement);
    const scrollbarConst = HideBodyVerticalScroll.globalObject.getComputedStyle(documentElement).overflowY === 'scroll';
    const scrollWidth =
      clientHeight < scrollHeight || scrollbarConst ? getScrollWidth(HideBodyVerticalScroll.globalObject) : 0;
    const documentMargin = parseFloat(documentComputedStyle.marginRight || '');
    const className = generateDocumentStyle(documentMargin + scrollWidth, HideBodyVerticalScroll.emotion);

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

      if (HideBodyVerticalScroll.globalObject.document) {
        HideBodyVerticalScroll.globalObject.document.documentElement.scrollTop = this.initialScroll;
      }
    }
  };
}

class VerticalScrollCounter {
  public static increment = (): number => {
    const globalWithRetailUIVerticalScrollCounter =
      HideBodyVerticalScroll.globalObject as GlobalWithRetailUIVerticalScrollCounter;
    const counter = globalWithRetailUIVerticalScrollCounter.RetailUIVerticalScrollCounter || 0;
    return (globalWithRetailUIVerticalScrollCounter.RetailUIVerticalScrollCounter = counter + 1);
  };

  public static decrement = (): number => {
    const globalWithRetailUIVerticalScrollCounter =
      HideBodyVerticalScroll.globalObject as GlobalWithRetailUIVerticalScrollCounter;
    const counter = globalWithRetailUIVerticalScrollCounter.RetailUIVerticalScrollCounter || 0;
    return (globalWithRetailUIVerticalScrollCounter.RetailUIVerticalScrollCounter = counter - 1);
  };

  public static get = (): number => {
    const globalWithRetailUIVerticalScrollCounter =
      HideBodyVerticalScroll.globalObject as GlobalWithRetailUIVerticalScrollCounter;
    return globalWithRetailUIVerticalScrollCounter.RetailUIVerticalScrollCounter || 0;
  };
}

function generateDocumentStyle(documentMargin: number, emotion: Emotion) {
  return emotion.css`
    overflow: hidden !important;
    margin-right: ${documentMargin}px !important;
    height: 100%;
  `;
}
