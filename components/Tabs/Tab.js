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
   * Tab identifier
   */
  id: string,

  /**
   * Click event
   */
  onClick?: (e: SyntheticEvent) => void
};

type Context = {
  activeTab: string,
  addTab: (id: string, getNode: () => ?Element) => void,
  removeTab: (id: string) => void,
  switchTab: (id: string) => void
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

  context: Context;

  props: Props;

  state: State = {
    focusedByTab: false
  };

  _node: ?Element = null;

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

  componentWillUnmount() {
    this._removeTab();
  }

  render() {
    const isActive = this.context.activeTab === this.props.id;
    return (
      <div
        className={cn(styles.root, isActive && styles.active)}
        onClick={this._switchTab}
        ref={this._refNode}
      >
        {this.props.children}
        {/* For native focus handling */}
        <input
          className={styles.input}
          type="checkbox"
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onKeyDown={this._handleKeyDown}
        />
        {this.state.focusedByTab && <div className={styles.focus} />}
      </div>
    );
  }

  _refNode = el => {
    this._node = el;
  };

  _getNode = () => this._node;

  _switchTab = e => {
    const { onClick, id } = this.props;
    if (onClick) {
      onClick(e);
    } else {
      this.context.switchTab(id);
    }
  };

  _addTab() {
    this.context.addTab(this.props.id, this._getNode);
  }

  _removeTab() {
    this.context.removeTab(this.props.id);
  }

  _handleKeyDown = (e: SyntheticKeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        this._switchTab(e);
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

const { string, node, func } = PropTypes;

Tab.propTypes = {
  children: node,
  id: string.isRequired,
  onClick: func
};

Tab.contextTypes = {
  addTab: func.isRequired,
  removeTab: func.isRequired,
  activeTab: string.isRequired,
  switchTab: func.isRequired
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
