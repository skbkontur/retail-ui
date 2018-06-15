
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';
import events from 'add-event-listener';
import { findDOMNode } from 'react-dom';

import listenFocusOutside, {
  containsTargetOrRenderContainer
} from '../../lib/listenFocusOutside';

type PassingProps = {
  subscribeToOutsideFocus: (fn: (e: Event) => mixed) => () => void,
  subscribeToOutsideClicks: (fn: (e: Event) => mixed) => () => void
};

type ParamsProps = { active?: boolean, innerRef?: void };

function withFocusOutside<Props: ParamsProps>(
  Component: React.ComponentType<PassingProps & Props>
): React.ComponentType<Props> {
  class WrappedComponent extends React.Component<Props> {
    static defaultProps = { active: true };

    _focusHandlers: Array<(e: Event) => mixed> = [];
    _clickHandlers: Array<(e: Event) => mixed> = [];

    _focusSubscription: ?{ remove: () => void } = null;
    _unmounted = false;

    _component;

    componentWillReceiveProps(nextProps: Props) {
      if (this.props.active && !nextProps.active && this._focusSubscription) {
        this._flush();
      }
      if (!this.props.active && nextProps.active && !this._focusSubscription) {
        this._listen();
      }
    }

    _ref = el => {
      this._component = el;

      if (this._focusSubscription) {
        this._flush();
      }

      if (el && this.props.active) {
        this._listen();
      }
    };

    _listen = () => {
      this._focusSubscription = listenFocusOutside(
        [this._getDomNode()],
        this._handleFocusOutside
      );

      events.addEventListener(window, 'blur', this._handleFocusOutside);

      events.addEventListener(
        document,
        'mousedown', // check just before click event
        this._handleNativeDocClick
      );
    };

    _flush() {
      if (this._focusSubscription) {
        this._focusSubscription.remove();
        this._focusSubscription = null;
      }

      events.removeEventListener(window, 'blur', this._handleFocusOutside);

      events.removeEventListener(
        document,
        'mousedown',
        this._handleNativeDocClick
      );
    }

    _subscribeToOutsideFocus = fn => {
      const index = this._focusHandlers.push(fn);
      return () => {
        this._focusHandlers.splice(index, 1);
      };
    };

    _subscribeToOutsideClicks = fn => {
      const index = this._clickHandlers.push(fn);
      return () => {
        this._clickHandlers.splice(index, 1);
      };
    };

    _handleNativeDocClick = event => {
      if (this._unmounted) {
        return;
      }
      const target: HTMLElement = event.target || event.srcElement;
      const node = this._getDomNode();

      if (!containsTargetOrRenderContainer(target)(node)) {
        this._handleClickOutside(event);
      }
    };

    _getDomNode = (): HTMLElement => {
      return (findDOMNode(this): any);
    };

    _handleFocusOutside = event => {
      this._focusHandlers.forEach(fn => fn(event));
    };

    _handleClickOutside = event => {
      this._clickHandlers.forEach(fn => fn(event));
    };

    componentWillUnmount() {
      if (this._focusSubscription) {
        this._flush();
      }
      this._unmounted = true;
    }

    render() {
      return (
        <Component
          {...this.props}
          ref={this._ref}
          innerRef={this.props.innerRef}
          subscribeToOutsideFocus={this._subscribeToOutsideFocus}
          subscribeToOutsideClicks={this._subscribeToOutsideClicks}
        />
      );
    }
  }

  return WrappedComponent;
}

export default withFocusOutside;
