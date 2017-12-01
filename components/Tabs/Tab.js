// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import cn from 'classnames';

import styles from './Tab.less';

type Props = {
  /**
   * Tab content
   */
  children?: React.Node,

  /**
   * Component to use as a tab
   */
  component: React.ComponentType<*> | string,

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
  onClick?: (event: SyntheticEvent<>) => void,

  /**
   * Disabled indicator
   */
  disabled?: boolean
};

type Context = {
  activeTab: string,
  addTab: (id: string, getNode: () => *) => void,
  notifyUpdate: () => void,
  removeTab: (id: string) => void,
  shiftFocus: (fromTab: string, delta: number) => void,
  switchTab: (id: string) => void,
  vertical: boolean
};

/**
 * Tab element of Tabs component
 *
 * Can be used for creating custom tabs
 * ```js
 *
 * const RouteTab = (props) => (
 *   <Tab id={props.to} component={RouteLink} {...props}/>
 * )
 *
 * const MyAwesomeTab = (props) => <Tab id={props.id}>8) {props.children}</Tab>
 * ```
 *
 * Works only inside Tabs component, otherwise throws
 */
class Tab extends React.Component<Props> {
  static defaultProps = {
    component: 'a',
    href: 'javascript:'
  };

  context: Context;

  _node = null;

  componentWillMount() {
    invariant(
      typeof this.context.addTab === 'function',
      'Tab should be placed inside Tabs component'
    );
  }

  componentDidMount() {
    this._addTab();
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
    // eslint-disable-next-line no-unused-vars
    const {
      id,
      component: Component,
      children,
      disabled,
      ...rest
    } = this.props;
    const isActive = this.context.activeTab === this._getId();
    const isVertical = this.context.vertical;
    const isDisabled = typeof disabled === 'boolean' ? disabled : false;
    return (
      <Component
        className={cn(
          styles.root,
          isActive && styles.active,
          isVertical && styles.vertical,
          isDisabled && styles.disabled
        )}
        onClick={!isDisabled && this._switchTab}
        onKeyDown={!isDisabled && this._handleKeyDown}
        tabIndex={isDisabled ? -1 : 0}
        ref={this._refNode}
        {...rest}
      >
        {children}
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

  _refNode = element => {
    this._node = element;
  };

  _getNode = () => this._node;

  _switchTab = e => {
    const id = this.props.id || this.props.href;
    this.context.switchTab(id);
  };

  _handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
    switch (event.keyCode) {
      case KEYCODE_ARROW_LEFT:
      case KEYCODE_ARROW_UP:
        event.preventDefault();
        this.context.shiftFocus(this._getId(), -1);
        return;
      case KEYCODE_ARROW_RIGHT:
      case KEYCODE_ARROW_DOWN:
        event.preventDefault();
        this.context.shiftFocus(this._getId(), 1);
        return;
      default:
        return;
    }
  };
}

const { string, node, func, any, bool } = PropTypes;

Tab.propTypes = {
  children: node,
  component: any,
  disabled: bool,
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
  shiftFocus: func.isRequired,
  vertical: bool.isRequired
};

const KEYCODE_ARROW_LEFT = 37;
const KEYCODE_ARROW_UP = 38;
const KEYCODE_ARROW_RIGHT = 39;
const KEYCODE_ARROW_DOWN = 40;

export default Tab;
