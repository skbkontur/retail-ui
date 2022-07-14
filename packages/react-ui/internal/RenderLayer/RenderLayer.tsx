import React from 'react';

import { listen as listenFocusOutside, containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';
import { CommonProps, CommonWrapper } from '../CommonWrapper';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { Nullable } from '../../typings/utility-types';

export interface RenderLayerProps extends CommonProps {
  children: JSX.Element;
  onClickOutside?: (e: Event) => void;
  onFocusOutside?: (e: Event) => void;
  active?: boolean;
  getAnchorElement?: () => Nullable<HTMLElement>;
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

  private focusOutsideListenerToken: {
    remove: () => void;
  } | null = null;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    if (this.props.active) {
      this.attachListeners();
    }
  }

  public componentDidUpdate(prevProps: RenderLayerProps) {
    if (!prevProps.active && this.props.active) {
      this.attachListeners();
    }
    if (prevProps.active && !this.props.active) {
      this.detachListeners();
    }
  }

  public componentWillUnmount() {
    if (this.props.active) {
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

  private attachListeners() {
    const rootNode = getRootNode(this) || this.props.getAnchorElement?.();
    if (!rootNode) {
      return;
    }

    this.focusOutsideListenerToken = listenFocusOutside(() => [rootNode], this.handleFocusOutside);
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
    const node = getRootNode(this) || getRootNode(this.props.getAnchorElement?.());

    if (!node || (target instanceof Element && containsTargetOrRenderContainer(target)(node))) {
      return;
    }

    if (this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
  };
}
