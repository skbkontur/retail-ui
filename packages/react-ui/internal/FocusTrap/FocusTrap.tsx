import React from 'react';
import { globalObject } from '@skbkontur/global-object';
import { Emotion } from '@emotion/css/create-instance';

import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { listen as listenFocusOutside, clickOutsideContent } from '../../lib/listenFocusOutside';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { isShadowRoot } from '../../lib/shadowDom/isShadowRoot';

export interface FocusTrapProps extends CommonProps {
  children: React.ReactElement<any>;
  onBlur?: (event: FocusEvent) => void;
}

@rootNode
export class FocusTrap extends React.PureComponent<FocusTrapProps> {
  public static __KONTUR_REACT_UI__ = 'FocusTrap';
  public static displayName = 'FocusTrap';
  private emotion!: Emotion;

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
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
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
        }}
      </EmotionConsumer>
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
    const node = getRootNode(this);
    const isShadowRootElement = isShadowRoot(this.emotion.sheet.container.getRootNode());
    const clickOutsideOfContent = clickOutsideContent(event, node, isShadowRootElement);
    if (clickOutsideOfContent) {
      this.onClickOutside(event);
    }
  };
}
