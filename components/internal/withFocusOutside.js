// @flow
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';
import events from 'add-event-listener';
import { findDOMNode } from 'react-dom';

import listenFocusOutside, {
  containsTargetOrRenderContainer
} from '../../lib/listenFocusOutside';

type PassingProps = {
  subscribeToOutsideFocus: (fn: (e: Event) => any) => any,
  subscribeToOutsideClicks: (fn: (e: Event) => any) => any
};

type ParamsProps = { active?: boolean, innerRef?: any };

function withFocusOutside<Props: ParamsProps>(
  WrappingComponent: React.ComponentType<PassingProps & Props>
) {
  class WrappedComponent extends React.Component<Props> {
    static defaultProps = { active: true };

    _focusHandlers: Array<(e: Event) => any> = [];
    _clickHandlers: Array<(e: Event) => any> = [];

    _focusSubscribtion: any;
    _unmounted = false;

    component: any;

    componentWillReceiveProps(nextProps: Props) {
      if (this.props.active && !nextProps.active && this._focusSubscribtion) {
        this._flush();
      }
      if (!this.props.active && nextProps.active && !this._focusSubscribtion) {
        this._listen();
      }
    }

    _ref = el => {
      this.component = el;

      if (this._focusSubscribtion) {
        this._flush();
      }

      if (el && this.props.active) {
        this._listen();
      }
    };

    _listen = () => {
      this._focusSubscribtion = listenFocusOutside(
        [this._getDomNode()],
        this._handleFocusOutside
      );

      events.addEventListener(
        document,
        'mousedown', // check just before click event
        this._handleNativeDocClick
      );
    };

    _flush() {
      this._focusSubscribtion.remove();
      this._focusSubscribtion = null;

      events.removeEventListener(
        document,
        'mousedown',
        this._handleNativeDocClick
      );
    }

    subscribeToOutsideFocus = (fn: (e: Event) => any) => {
      const index = this._focusHandlers.push(fn);
      return () => {
        this._focusHandlers.splice(index, 1);
      };
    };

    subscribeToOutsideClicks = (fn: (e: Event) => any) => {
      const index = this._clickHandlers.push(fn);
      return () => {
        this._clickHandlers.splice(index, 1);
      };
    };

    _handleNativeDocClick = event => {
      if (this._unmounted) {
        return;
      }
      const target = event.target || event.srcElement;
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
      if (this._focusSubscribtion) {
        this._flush();
      }
      this._unmounted = true;
    }

    render() {
      return (
        <WrappingComponent
          ref={this._ref}
          {...this.props}
          innerRef={this.props.innerRef}
          subscribeToOutsideFocus={this.subscribeToOutsideFocus}
          subscribeToOutsideClicks={this.subscribeToOutsideClicks}
        />
      );
    }
  }

  return WrappedComponent;
}

export default withFocusOutside;
