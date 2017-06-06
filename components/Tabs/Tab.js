// @flow

import events from 'add-event-listener';
import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import cn from 'classnames';

import styles from './Tab.less';

import type { ReactNode } from '../internal/types';

type Props = {
  /**
   * Tab content
   */
  children?: ReactNode,

  /**
   * Component to use as a tab
   * @type {Object}
   */
  component: | string
    | Class<React$Component<*, *, *>>
    | (<T>(props: T) => React$Element<*>),

  /**
   * Link href
   */
  href: string,

  /**
   * Tab identifier
   */
  id?: string,

  /**
   * Click event
   */
  onClick?: (e: SyntheticEvent) => void
};

type Context = {
  activeTab: string,
  addTab: (id: string, getNode: () => ?Element) => void,
  notifyUpdate: () => void,
  removeTab: (id: string) => void,
  switchTab: (id: string) => void,
  vertical: boolean
};

type State = {
  focusedByTab: boolean
};

/**
 * Tab element of Tabs component
 *
 * Can be used for creating custom tabs
 * ```js
 * const LinkTab = (props) => <Tab id={props.href}><Link {...props} /></Tab>
 *
 * const RouteTab = (props) => <Tab id={props.to}><Link {...props} /></Tab>
 *
 * const MyAwesomeTab = (props) => <Tab id={props.id}>8) {props.children}</Tab>
 * ```
 *
 * Works only inside Tabs component, otherwise throws
 */
class Tab extends React.Component {
  static defaultProps = {
    component: 'a',
    href: 'javascript:'
  };

  context: Context;

  props: Props;

  state: State = {
    focusedByTab: false
  };

  _node: ?HTMLLinkElement = null;

  componentWillMount() {
    invariant(
      typeof this.context.addTab === 'function',
      'Tab should be placed inside Tabs component'
    );
  }

  componentDidMount() {
    this._addTab();
    listenTabPresses();
  }

  componentDidUpdate() {
    if (this.context.activeTab === this.props.id) {
      this.context.notifyUpdate();
    }
  }

  componentWillUnmount() {
    this._removeTab();
  }

  render() {
    const { id, component: Component, children, ...rest } = this.props;
    const isActive = this.context.activeTab === this._getId();
    const isVertical = this.context.vertical;
    return (
      <Component
        className={cn(
          styles.root,
          isActive && styles.active,
          isVertical && styles.vertical
        )}
        onBlur={this._handleBlur}
        onClick={this._switchTab}
        onFocus={this._handleFocus}
        onKeyDown={this._handleKeyDown}
        ref={this._refNode}
        {...rest}
      >
        {children}
        {this.state.focusedByTab && <div className={styles.focus} />}
      </Component>
    );
  }

  _getId = () => this.props.id || this.props.href;

  _addTab() {
    this.context.addTab(this._getId(), this._getNode);
  }

  _removeTab() {
    this.context.removeTab(this._getId());
  }

  _refNode = el => {
    this._node = el;
  };

  _getNode = () => this._node;

  _switchTab = e => {
    const id = this.props.id || this.props.href;
    this.context.switchTab(id);
  };

  _select = () => {
    if (this._node) {
      this._node.click();
    }
  };

  _handleKeyDown = (e: SyntheticKeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        this._select();
        break;
      default:
        return;
    }
  };

  _handleFocus = e => {
    // focus event fires before keyDown eventlistener
    // so we should check tabPressed in async way
    process.nextTick(() => {
      if (tabPressed) {
        this.setState({ focusedByTab: true });
        tabPressed = false;
      }
    });
  };

  _handleBlur = e => {
    this.setState({ focusedByTab: false });
  };
}

const { string, node, func, any, bool } = PropTypes;

Tab.propTypes = {
  children: node,
  component: any,
  href: string,
  id: string.isRequired,
  onClick: func
};

Tab.contextTypes = {
  activeTab: string.isRequired,
  addTab: func.isRequired,
  notifyUpdate: func.isRequired,
  removeTab: func.isRequired,
  switchTab: func.isRequired,
  vertical: bool.isRequired
};

const KEYCODE_TAB = 9;

let isListening: boolean;
let tabPressed: boolean;

function listenTabPresses() {
  if (!isListening) {
    events.addEventListener(window, 'keydown', (event: KeyboardEvent) => {
      tabPressed = event.keyCode === KEYCODE_TAB;
    });
    isListening = true;
  }
}

export default Tab;
