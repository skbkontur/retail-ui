// @flow
/* global Class, React$Element, React$Component, $Diff */
import React from 'react';
import events from 'add-event-listener';
import { findDOMNode } from 'react-dom';

import listenFocusOutside, {
  containsTargetOrRenderContainer
} from '../../lib/listenFocusOutside';

type FunctionComponent<P> = (props: P) => ?React$Element<any>;
type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>;

type PassingProps = {
  subscribeToOutsideFocus: ((e: Event) => any) => void,
  subscribeToOutsideClicks: ((e: Event) => any) => void
};

function withFocusOutside<P, S>(
  WrappingComponent: ClassComponent<void, P, S> | FunctionComponent<P>
): ClassComponent<void, $Diff<P, PassingProps>, S> {
  class WrappedComponent extends React.Component {
    props: any;
    state: any;

    _focusHandlers: Array<(e: Event) => any> = [];
    _clickHandlers: Array<(e: Event) => any> = [];

    _focusSubscribtion: any;

    component: any;

    _ref = el => {

      this.component = el;

      if (this._focusSubscribtion) {
        this._flush();
      }

      if (el) {
        this._focusSubscribtion = listenFocusOutside(
          [this._getDomNode()],
          this._handleFocusOutside
        );

        events.addEventListener(
          document,
          'mousedown', // check just before click event
          this._handleNativeDocClick
        );
      }
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
