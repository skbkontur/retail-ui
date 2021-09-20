import React from 'react';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { listen as listenFocusOutside, containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';
import { Nullable } from '../../typings/utility-types';

export interface FocusTrapProps extends CommonProps {
  children: React.ReactElement<any>;
  onBlur?: (event: FocusEvent) => void;
}

export class FocusTrap extends React.PureComponent<FocusTrapProps> {
  public static __KONTUR_REACT_UI__ = 'FocusTrap';
  private rootDomNode: Nullable<HTMLElement>;

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
      <CommonWrapper {...this.props}>
        {React.cloneElement(React.Children.only(children), {
          ref: (refElement: Nullable<HTMLElement>) => {
            const childrenAsAny = children as any;
            if (childrenAsAny.ref && typeof childrenAsAny.ref === 'function') {
              childrenAsAny.ref(refElement);
            }
            this.refRootDomNode(refElement);
          },
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

  private refRootDomNode = (rootDomNode: Nullable<HTMLElement>) => {
    this.rootDomNode = rootDomNode;
  };

  private onClickOutside = (e: Event) => {
    if (this.props.onBlur) {
      this.props.onBlur(e as FocusEvent);
    }
    this.detachListeners();
  };

  private attachListeners = () => {
    if (!this.focusOutsideListenerToken && this.rootDomNode) {
      this.focusOutsideListenerToken = listenFocusOutside([this.rootDomNode], this.onClickOutside);

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
    const node = this.rootDomNode;

    if (node && target instanceof Element && containsTargetOrRenderContainer(target)(node)) {
      return;
    }

    this.onClickOutside(event);
  };
}
