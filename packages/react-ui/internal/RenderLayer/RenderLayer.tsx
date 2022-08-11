import React from 'react';

import { listen as listenFocusOutside, containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';
import { CommonProps, CommonWrapper } from '../CommonWrapper';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { Nullable } from '../../typings/utility-types';
import { createPropsGetter } from '../../lib/createPropsGetter';

export interface RenderLayerProps extends CommonProps {
  children: JSX.Element;
  onClickOutside?: (e: Event) => void;
  onFocusOutside?: (e: Event) => void;
  active?: boolean;
  getAnchorElement?: () => Nullable<Element>;
}

type DefaultProps = Required<Pick<RenderLayerProps, 'active'>>;

@rootNode
export class RenderLayer extends React.Component<RenderLayerProps> {
  public static __KONTUR_REACT_UI__ = 'RenderLayer';

  public static propTypes = {
    active(props: RenderLayerProps, propName: keyof RenderLayerProps, componentName: string) {
      const { active, onClickOutside, onFocusOutside } = props;
      if (active && !(onClickOutside || onFocusOutside)) {
        return new Error(
          `[${componentName}]: using the component without either 'onClickOutside' or 'onFocusOutside' callback is pointless.`,
        );
      }
    },
  };

  public static defaultProps: DefaultProps = {
    active: true,
  };

  private getProps = createPropsGetter(RenderLayer.defaultProps);

  private focusOutsideListenerToken: {
    remove: () => void;
  } | null = null;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    if (this.getProps().active) {
      this.attachListeners();
    }
  }

  public componentDidUpdate(prevProps: RenderLayerProps) {
    const active = this.getProps().active;
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

    this.focusOutsideListenerToken = listenFocusOutside(() => [node], this.handleFocusOutside);
    window.addEventListener('blur', this.handleFocusOutside);
    document.addEventListener(
      'ontouchstart' in document.documentElement ? 'touchstart' : 'mousedown',
      this.handleNativeDocClick,
    );
  }

  private detachListeners() {
    if (this.focusOutsideListenerToken) {
      this.focusOutsideListenerToken.remove();
      this.focusOutsideListenerToken = null;
    }

    window.removeEventListener('blur', this.handleFocusOutside);
    document.removeEventListener(
      'ontouchstart' in document.documentElement ? 'touchstart' : 'mousedown',
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

    if (!node || (target instanceof Element && containsTargetOrRenderContainer(target)(node))) {
      return;
    }

    if (this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
  };
}
