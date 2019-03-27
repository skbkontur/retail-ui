import * as React from 'react';
import { findDOMNode } from 'react-dom';
import listenFocusOutside, { containsTargetOrRenderContainer } from '../../lib/listenFocusOutside';

export interface RenderLayerProps {
  children: JSX.Element;
  onClickOutside?: (e: Event) => void;
  onFocusOutside?: (e: Event) => void;
  active?: boolean;
}

class RenderLayer extends React.Component<RenderLayerProps> {
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

  public render(): JSX.Element {
    return React.Children.only(this.props.children);
  }

  private attachListeners() {
    if (this.props.onFocusOutside) {
      this.focusOutsideListenerToken = listenFocusOutside(() => [this.getDomNode()], this.handleFocusOutside);
      window.addEventListener('blur', this.handleFocusOutside);
    }

    if (this.props.onClickOutside) {
      document.addEventListener('mousedown', this.handleNativeDocClick);
    }
  }

  private detachListeners() {
    if (this.focusOutsideListenerToken) {
      this.focusOutsideListenerToken.remove();
      this.focusOutsideListenerToken = null;
    }

    window.removeEventListener('blur', this.handleFocusOutside);
    document.removeEventListener('mousedown', this.handleNativeDocClick);
  }

  private getDomNode() {
    return findDOMNode(this) as HTMLElement;
  }

  private handleFocusOutside = (event: Event) => {
    if (this.props.onFocusOutside) {
      this.props.onFocusOutside(event);
    }
  };

  private handleNativeDocClick = (event: Event) => {
    const target = event.target || event.srcElement;
    const node = this.getDomNode();

    if (target instanceof Element && containsTargetOrRenderContainer(target)(node)) {
      return;
    }

    if (this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
  };
}

export default RenderLayer;
