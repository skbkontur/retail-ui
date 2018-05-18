import React from 'react';
import Events from 'add-event-listener';
import { findDOMNode } from 'react-dom';
import listenFocusOutside, {
  containsTargetOrRenderContainer
} from '../../lib/listenFocusOutside';

export interface RenderLayerProps {
  children?: React.ReactNode;
  onClickOutside?: (e: Event) => void;
  onFocusOutside?: (e: Event) => void;
  active?: boolean;
}

class RenderLayer extends React.Component<RenderLayerProps> {
  private focusOutsideListenerToken: {
    remove: () => void;
  } | null = null;

  componentDidMount() {
    this.attachListeners();
  }

  componentWillUnmount() {
    this.detachListeners();
  }

  public render() {
    return this.props.children;
  }

  private attachListeners() {
    this.focusOutsideListenerToken = listenFocusOutside(
      () => [this.getDomNode()],
      this._handleFocusOutside
    );

    Events.addEventListener(window, 'blur', this._handleFocusOutside);

    Events.addEventListener(document, 'mousedown', this._handleNativeDocClick);
  }

  private detachListeners() {
    if (this.focusOutsideListenerToken) {
      this.focusOutsideListenerToken.remove();
      this.focusOutsideListenerToken = null;
    }

    Events.removeEventListener(window, 'blur', this._handleFocusOutside);

    Events.removeEventListener(
      document,
      'mousedown',
      this._handleNativeDocClick
    );
  }

  private getDomNode() {
    return findDOMNode(this) as HTMLElement;
  }

  private _handleFocusOutside = (event: Event) => {
    if (this.props.onFocusOutside) {
      this.props.onFocusOutside(event);
    }
  };

  private _handleNativeDocClick = (event: Event) => {
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
