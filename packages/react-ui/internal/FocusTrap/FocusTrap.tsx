import { findAssociatedNode } from '@skbkontur/react-sorge/lib';
import React from 'react';

import { listen as listenFocusOutside, containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';

export interface FocusTrapProps {
  children: React.ReactElement<any>;
  onBlur?: (event: FocusEvent) => void;
}

export class FocusTrap extends React.PureComponent<FocusTrapProps> {
  public static __KONTUR_REACT_UI__ = 'FocusTrap';
  private childNode: Node | null = null;

  private focusOutsideListenerToken: {
    remove: () => void;
  } | null = null;

  public componentWillUnmount() {
    if (this.focusOutsideListenerToken) {
      this.detachListeners();
    }
  }

  public render() {
    const { children, onBlur } = this.props;
    const child: any = React.Children.only(children);
    this.childNode = findAssociatedNode(child._owner);

    return React.cloneElement(child, {
      onFocus: (...args: any[]) => {
        if (onBlur) {
          this.attachListeners();
        }
        if (children.props && children.props.onFocus) {
          children.props.onFocus(...args);
        }
      },
    });
  }

  private onClickOutside = (e: Event) => {
    if (this.props.onBlur) {
      this.props.onBlur(e as FocusEvent);
    }
    this.detachListeners();
  };

  private attachListeners = () => {
    if (!this.focusOutsideListenerToken && this.childNode instanceof HTMLElement) {
      this.focusOutsideListenerToken = listenFocusOutside([this.childNode], this.onClickOutside);

      document.addEventListener(
        'ontouchstart' in document.documentElement ? 'touchstart' : 'mousedown',
        this.handleNativeDocClick,
      );
    }
  };

  private detachListeners() {
    if (this.focusOutsideListenerToken) {
      this.focusOutsideListenerToken.remove();
      this.focusOutsideListenerToken = null;

      document.removeEventListener(
        'ontouchstart' in document.documentElement ? 'touchstart' : 'mousedown',
        this.handleNativeDocClick,
      );
    }
  }

  private handleNativeDocClick = (event: Event) => {
    const target = event.target || event.srcElement;

    if (
      target instanceof Element &&
      this.childNode instanceof HTMLElement &&
      containsTargetOrRenderContainer(target)(this.childNode)
    ) {
      return;
    }

    this.onClickOutside(event);
  };
}
