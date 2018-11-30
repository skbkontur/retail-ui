import * as React from 'react';
import Events from 'add-event-listener';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash.debounce';
import listenFocusOutside, {
  containsTargetOrRenderContainer
} from '../../lib/listenFocusOutside';

export interface RenderLayerProps {
  children: JSX.Element;
  onClickOutside?: (e: Event) => void;
  onFocusOutside?: (e: Event) => void;
  onMouseLeave?: (e: Event) => void;
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
    this.attachListeners();
  }

  public componentWillUnmount() {
    this.detachListeners();
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

    Events.addEventListener(document, 'mousemove', this.handleNativeMouseMove);
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

    Events.removeEventListener(
      document,
      'mousemove',
      this.handleNativeMouseMove
    );
  }

  private getDomNode() {
    return findDOMNode(this) as HTMLElement;
  }

  private handleFocusOutside = (event: Event) => {
    if (!this.props.active) {
      return;
    }
    if (this.props.onFocusOutside) {
      this.props.onFocusOutside(event);
    }
  };

  private isMouseOutside = (event: Event) => {
    if (!this.props.active) {
      return false;
    }
    const target = (event.target || event.srcElement) as HTMLElement;
    const node = this.getDomNode();

    if (containsTargetOrRenderContainer(target)(node)) {
      return false;
    }
    return true;
  };

  private handleNativeDocClick = (event: Event) => {
    if (this.isMouseOutside(event) && this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
  };

  // tslint:disable-next-line:member-ordering
  private handleNativeMouseMove = debounce(event => {
    if (this.isMouseOutside(event) && this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  }, 100);
}

export default RenderLayer;
