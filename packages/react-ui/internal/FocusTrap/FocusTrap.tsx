import React from 'react';

import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { GlobalObject } from '../../lib/globalObject.js';
import { isInstanceOf } from '../../lib/isInstanceOf.js';
import { containsTargetOrRenderContainer, listen as listenFocusOutside } from '../../lib/listenFocusOutside.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { getRootNode, rootNode } from '../../lib/rootNode/index.js';

export interface FocusTrapProps extends CommonProps {
  children: React.ReactElement<any>;
  onBlur?: (event: FocusEvent) => void;
}

@withRenderEnvironment
@rootNode
export class FocusTrap extends React.PureComponent<FocusTrapProps> {
  public static __KONTUR_REACT_UI__ = 'FocusTrap';
  public static displayName = 'FocusTrap';

  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private globalObject!: GlobalObject;

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
      this.focusOutsideListenerToken = listenFocusOutside([rootNode], this.onClickOutside, this.globalObject);

      this.globalObject.document?.addEventListener(
        'ontouchstart' in this.globalObject.document.documentElement ? 'touchstart' : 'mousedown',
        this.handleNativeDocClick,
      );
    }
  };

  private detachListeners() {
    if (this.focusOutsideListenerToken) {
      this.focusOutsideListenerToken.remove();
      this.focusOutsideListenerToken = null;

      this.globalObject.document?.removeEventListener(
        'ontouchstart' in this.globalObject.document.documentElement ? 'touchstart' : 'mousedown',
        this.handleNativeDocClick,
      );
    }
  }

  private handleNativeDocClick = (event: Event) => {
    const target = event.target || event.srcElement;
    const node = getRootNode(this);

    if (node && isInstanceOf(target, this.globalObject.Element) && containsTargetOrRenderContainer(target)(node)) {
      return;
    }

    this.onClickOutside(event);
  };
}
