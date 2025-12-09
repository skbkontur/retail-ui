import React from 'react';

import type { GlobalObject } from '../../lib/globalObject';
import { listen as listenFocusOutside, containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';
import type { CommonProps } from '../CommonWrapper';
import { CommonWrapper } from '../CommonWrapper';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { getRootNode, rootNode } from '../../lib/rootNode';
import type { Nullable } from '../../typings/utility-types';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { isInstanceOf } from '../../lib/isInstanceOf';
import { withRenderEnvironment } from '../../lib/renderEnvironment';

export interface RenderLayerProps extends CommonProps {
  children: JSX.Element;
  onClickOutside?: (e: Event) => void;
  onFocusOutside?: (e: Event) => void;
  active?: boolean;
  getAnchorElement?: () => Nullable<Element>;
}

type DefaultProps = Required<Pick<RenderLayerProps, 'active'>>;

@withRenderEnvironment
@rootNode
export class RenderLayer extends React.Component<RenderLayerProps> {
  public static __KONTUR_REACT_UI__ = 'RenderLayer';
  public static displayName = 'RenderLayer';

  public static defaultProps: DefaultProps = {
    active: true,
  };

  private globalObject!: GlobalObject;
  private getProps = createPropsGetter(RenderLayer.defaultProps);

  private focusOutsideListenerToken: {
    remove: () => void;
  } | null = null;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    if (this.getProps().active) {
      this.attachListeners();
    }
  }

  public componentDidUpdate(prevProps: RenderLayerProps) {
    const { active } = this.getProps();

    if (!prevProps.active && active) {
      this.attachListeners();
    }
    if (prevProps.active && !active) {
      this.detachListeners();
    }
  }

  public componentWillUnmount() {
    if (this.getProps().active) {
      this.detachListeners();
    }
  }

  public render() {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        {React.Children.only(this.props.children)}
      </CommonWrapper>
    );
  }

  private getAnchorNode(): Nullable<Element> {
    const { getAnchorElement } = this.props;
    return getAnchorElement ? getAnchorElement() : getRootNode(this);
  }

  private attachListeners() {
    const node = this.getAnchorNode();
    if (!node) {
      return;
    }

    this.focusOutsideListenerToken = listenFocusOutside(() => [node], this.handleFocusOutside, this.globalObject);
    this.globalObject.addEventListener?.('blur', this.handleFocusOutside);
    this.globalObject.document?.addEventListener(
      'ontouchstart' in this.globalObject.document.documentElement &&
        'onpointerup' in this.globalObject.document.documentElement
        ? 'pointerup'
        : 'mousedown',
      this.handleNativeDocClick,
    );
  }

  private detachListeners() {
    if (this.focusOutsideListenerToken) {
      this.focusOutsideListenerToken.remove();
      this.focusOutsideListenerToken = null;
    }

    this.globalObject.removeEventListener?.('blur', this.handleFocusOutside);
    this.globalObject.document?.removeEventListener(
      'ontouchstart' in this.globalObject.document.documentElement &&
        'onpointerup' in this.globalObject.document.documentElement
        ? 'pointerup'
        : 'mousedown',
      this.handleNativeDocClick,
    );
  }

  private handleFocusOutside = (event: Event) => {
    if (this.props.onFocusOutside) {
      this.props.onFocusOutside(event);
    }
  };

  private handleNativeDocClick = (event: Event) => {
    const target = event.target || event.srcElement;
    const node = this.getAnchorNode();

    if (!node || (isInstanceOf(target, this.globalObject.Element) && containsTargetOrRenderContainer(target)(node))) {
      return;
    }

    if (this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
  };
}
