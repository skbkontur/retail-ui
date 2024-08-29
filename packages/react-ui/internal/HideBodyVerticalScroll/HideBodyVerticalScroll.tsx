import React from 'react';
import { globalObject, isBrowser } from '@skbkontur/global-object';
import type { Emotion } from '@emotion/css/create-instance';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { useEmotion } from '../../lib/theming/Emotion';

let disposeDocumentStyle: (() => void) | null = null;

export const HideBodyVerticalScroll = () => {
  const emotion = useEmotion();
  return <HideBodyVerticalScrollELement emotion={emotion} />;
};

class HideBodyVerticalScrollELement extends React.Component<{ emotion: Emotion }> {
  public static __KONTUR_REACT_UI__ = 'HideBodyVerticalScroll';
  public static displayName = 'HideBodyVerticalScroll';

  private initialScroll = 0;
  private master = false;

  public componentDidMount() {
    const counter = VerticalScrollCounter.increment();
    if (counter === 1) {
      this.master = true;
      this.initialScroll = globalObject.document?.documentElement ? globalObject.document.documentElement.scrollTop : 0;
      this.updateScrollVisibility();
      globalObject.addEventListener?.('resize', this.updateScrollVisibility);
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
      globalObject.removeEventListener?.('resize', this.updateScrollVisibility);
    }
  }

  public render() {
    return null;
  }

  private updateScrollVisibility = () => {
    const shouldHide = !disposeDocumentStyle;
    if (shouldHide) {
      this.hideScroll();
    }
  };

  private hideScroll = () => {
    if (!isBrowser(globalObject)) {
      return;
    }
    const { documentElement } = globalObject.document;
    const { clientHeight, scrollHeight } = documentElement;
    const documentComputedStyle = globalObject.getComputedStyle(documentElement);
    const scrollbarConst = globalObject.getComputedStyle(documentElement).overflowY === 'scroll';
    const scrollWidth = clientHeight < scrollHeight || scrollbarConst ? getScrollWidth() : 0;
    const documentMargin = parseFloat(documentComputedStyle.marginRight || '');
    const className = this.generateDocumentStyle(documentMargin + scrollWidth);

    disposeDocumentStyle = this.attachStyle(documentElement, className);
  };

  private generateDocumentStyle = (documentMargin: number) => {
    return this.props.emotion.css`
    overflow: hidden !important;
    margin-right: ${documentMargin}px !important;
    height: 100%;
  `;
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

      if (globalObject.document) {
        globalObject.document.documentElement.scrollTop = this.initialScroll;
      }
    }
  };
}

class VerticalScrollCounter {
  public static increment = (): number => {
    const counter = globalObject.RetailUIVerticalScrollCounter || 0;
    return (globalObject.RetailUIVerticalScrollCounter = counter + 1);
  };

  public static decrement = (): number => {
    const counter = globalObject.RetailUIVerticalScrollCounter || 0;
    return (globalObject.RetailUIVerticalScrollCounter = counter - 1);
  };

  public static get = (): number => {
    return globalObject.RetailUIVerticalScrollCounter || 0;
  };
}
