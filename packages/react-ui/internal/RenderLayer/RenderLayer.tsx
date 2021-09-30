import React from 'react';

import { listen as listenFocusOutside, containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';
import { CommonProps, CommonWrapper } from '../CommonWrapper';
import { Nullable } from '../../typings/utility-types';
import { getRootDomNode } from '../../lib/getRootDomNode';

export interface RenderLayerProps extends CommonProps {
  children: JSX.Element;
  onClickOutside?: (e: Event) => void;
  onFocusOutside?: (e: Event) => void;
  active?: boolean;
}

export class RenderLayer extends React.Component<RenderLayerProps> {
  public static __KONTUR_REACT_UI__ = 'RenderLayer';
  private rootDomNode: Nullable<HTMLElement>;

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

  public static defaultProps = {
    active: true,
  };

  private focusOutsideListenerToken: {
    remove: () => void;
  } | null = null;

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
    const child = React.Children.only(this.props.children);
    const childWithRef = child
      ? React.cloneElement(child as JSX.Element, {
          ref: (instance: Nullable<React.ReactNode>) => {
            this.refRootDomNode(instance);
            const childAsAny = child as any;
            if (childAsAny && childAsAny.ref && typeof childAsAny.ref === 'function') {
              childAsAny.ref(instance);
            }
          },
        })
      : null;
    return <CommonWrapper {...this.props}>{childWithRef}</CommonWrapper>;
  }

  private refRootDomNode = (instance: Nullable<React.ReactNode>) => {
    this.rootDomNode = getRootDomNode(instance);
  };

  public getRootDomNode = () => {
    return this.rootDomNode;
  };

  private attachListeners() {
    const domNode = this.getRootDomNode();
    if (!domNode) return;
    this.focusOutsideListenerToken = listenFocusOutside(() => [domNode], this.handleFocusOutside);
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
    const node = this.getRootDomNode();

    if (node && target instanceof Element && containsTargetOrRenderContainer(target)(node)) {
      return;
    }

    if (this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
  };
}
