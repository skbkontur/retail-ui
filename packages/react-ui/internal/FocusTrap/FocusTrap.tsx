import React from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { listen as listenFocusOutside, containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';

export interface FocusTrapProps extends CommonProps {
  children: React.ReactElement<any>;
  onBlur?: (event: FocusEvent) => void;
}

@rootNode
export class FocusTrap extends React.PureComponent<FocusTrapProps> {
  public static __KONTUR_REACT_UI__ = 'FocusTrap';
  private setRootNode!: TSetRootNode;

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
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        {React.cloneElement(React.Children.only(children), {
          onFocus: (...args: any[]) => {
            if (onBlur) {
              this.attachListeners();
            }
            if (children.props && children.props.onFocus) {
              children.props.onFocus(...args);
            }
          },
        })}
      </CommonWrapper>
    );
  }

  private onClickOutside = (e: Event) => {
    if (this.props.onBlur) {
      this.props.onBlur(e as FocusEvent);
    }
    this.detachListeners();
  };

  private attachListeners = () => {
    const rootNode = getRootNode(this);
    if (!this.focusOutsideListenerToken && rootNode) {
      this.focusOutsideListenerToken = listenFocusOutside([rootNode], this.onClickOutside);

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
    const node = getRootNode(this);

    if (node && target instanceof Element && containsTargetOrRenderContainer(target)(node)) {
      return;
    }

    this.onClickOutside(event);
  };
}
