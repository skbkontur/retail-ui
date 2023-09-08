import React from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { css } from '../../lib/theming/Emotion';
import { globalThat, HTMLElement } from '../../lib/globalThat';

let disposeDocumentStyle: (() => void) | null = null;

export class HideBodyVerticalScroll extends React.Component {
  public static __KONTUR_REACT_UI__ = 'HideBodyVerticalScroll';

  private initialScroll = 0;
  private master = false;

  public componentDidMount() {
    const counter = VerticalScrollCounter.increment();
    if (counter === 1) {
      this.master = true;
      this.initialScroll = globalThat.document.documentElement ? globalThat.document.documentElement.scrollTop : 0;
      this.updateScrollVisibility();
      globalThat.addEventListener('resize', this.updateScrollVisibility);
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
      globalThat.removeEventListener('resize', this.updateScrollVisibility);
    }
  }

  public render() {
    return null;
  }

  private updateScrollVisibility = () => {
    const { documentElement } = globalThat.document;
    if (!documentElement) {
      return;
    }
    const shouldHide = !disposeDocumentStyle;
    if (shouldHide) {
      this.hideScroll(documentElement);
    }
  };

  private hideScroll = (document: HTMLElement) => {
    const { clientHeight, scrollHeight } = document;
    const documentComputedStyle = globalThat.getComputedStyle(document);
    const scrollbarConst = globalThat.getComputedStyle(document).overflowY === 'scroll';
    const scrollWidth = clientHeight < scrollHeight || scrollbarConst ? getScrollWidth() : 0;
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

      const { documentElement } = globalThat.document;

      if (documentElement) {
        documentElement.scrollTop = this.initialScroll;
      }
    }
  };
}

class VerticalScrollCounter {
  public static increment = (): number => {
    //@ts-expect-error error
    const counter = globalThat.RetailUIVerticalScrollCounter || 0;
    //@ts-expect-error error
    return (globalThat.RetailUIVerticalScrollCounter = counter + 1);
  };

  public static decrement = (): number => {
    //@ts-expect-error error
    const counter = globalThat.RetailUIVerticalScrollCounter || 0;
    //@ts-expect-error error
    return (globalThat.RetailUIVerticalScrollCounter = counter - 1);
  };

  public static get = (): number => {
    //@ts-expect-error error
    return globalThat.RetailUIVerticalScrollCounter || 0;
  };
}

function generateDocumentStyle(documentMargin: number) {
  return css`
    overflow: hidden !important;
    margin-right: ${documentMargin}px !important;
    height: 100%;
  `;
}
