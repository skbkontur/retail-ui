import React from 'react';
import { globalObject } from '@skbkontur/global-object';

import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { listen as listenFocusOutside, containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';
import type { TSetRootNode } from '../../lib/rootNode';
import { getRootNode, rootNode } from '../../lib/rootNode';
import { isInstanceOf } from '../../lib/isInstanceOf';

export interface FocusTrapProps extends CommonProps {
  children: React.ReactElement<any>;
  onBlur?: (event: FocusEvent) => void;
}

@rootNode
export class FocusTrap extends React.PureComponent<FocusTrapProps> {
  public static __KONTUR_REACT_UI__ = 'FocusTrap';
  public static displayName = 'FocusTrap';

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

      globalObject.document?.addEventListener(
        'ontouchstart' in globalObject.document.documentElement ? 'touchstart' : 'mousedown',
        this.handleNativeDocClick,
      );
    }
  };

  private detachListeners() {
    if (this.focusOutsideListenerToken) {
      this.focusOutsideListenerToken.remove();
      this.focusOutsideListenerToken = null;

      globalObject.document?.removeEventListener(
        'ontouchstart' in globalObject.document.documentElement ? 'touchstart' : 'mousedown',
        this.handleNativeDocClick,
      );
    }
  }

  private handleNativeDocClick = (event: Event) => {
    const target = event.target || event.srcElement;
    const node = getRootNode(this);

    if (node && isInstanceOf(target, globalObject.Element) && containsTargetOrRenderContainer(target)(node)) {
      return;
    }

    this.onClickOutside(event);
  };
}
