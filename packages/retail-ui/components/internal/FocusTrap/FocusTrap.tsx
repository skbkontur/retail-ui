import * as React from 'react';
import { findDOMNode } from 'react-dom';
import listenFocusOutside, { containsTargetOrRenderContainer } from '../../../lib/listenFocusOutside';

export interface FocusTrapProps {
  children: React.ReactElement<any>;
  onBlur?: (event: FocusEvent) => void;
}

export default class FocusTrap extends React.PureComponent<FocusTrapProps> {
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
    return React.cloneElement(React.Children.only(children), {
      onFocus: (...args: any[]) => {
        onBlur && this.attachListeners();
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
    if (!this.focusOutsideListenerToken) {
      this.focusOutsideListenerToken = listenFocusOutside([findDOMNode(this) as HTMLElement], this.onClickOutside);

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
    const node = findDOMNode(this) as HTMLElement;

    if (target instanceof Element && containsTargetOrRenderContainer(target)(node)) {
      return;
    }

    this.onClickOutside(event);
  };
}
