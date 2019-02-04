import * as React from 'react';
import Events from 'add-event-listener';
import { findDOMNode } from 'react-dom';
import listenFocusOutside, {
  containsTargetOrRenderContainer
} from '../../lib/listenFocusOutside';

export interface RenderLayerProps {
  children: JSX.Element;
  onClickOutside?: (e: Event) => void;
  onFocusOutside?: (e: Event) => void;
  active?: boolean;
}

class RenderLayer extends React.Component<RenderLayerProps> {
  public static defaultProps = {
    active: true
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
    this.focusOutsideListenerToken = listenFocusOutside(
      () => [this.getDomNode()],
      this.handleFocusOutside
    );

    Events.addEventListener(window, 'blur', this.handleFocusOutside);

    Events.addEventListener(document, 'mousedown', this.handleNativeDocClick);
  }

  private detachListeners() {
    if (this.focusOutsideListenerToken) {
      this.focusOutsideListenerToken.remove();
      this.focusOutsideListenerToken = null;
    }

    Events.removeEventListener(window, 'blur', this.handleFocusOutside);

    Events.removeEventListener(
      document,
      'mousedown',
      this.handleNativeDocClick
    );
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
    const target = (event.target || event.srcElement) as HTMLElement;
    const node = this.getDomNode();

    if (containsTargetOrRenderContainer(target)(node)) {
      return;
    }

    if (this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
  };
}

export default RenderLayer;
