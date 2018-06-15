

import events from 'add-event-listener';
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
   * Click event
   */
  onKeyDown?: (event: SyntheticEvent<>) => void,

  /**
   * Disabled indicator
   */
  disabled?: boolean,

  /**
   * Error indicator
   */
  error?: boolean,

  /**
   * Warning indicator
   */
  warning?: boolean,

  /**
   * Success indicator
   */
  success?: boolean,

  /**
   * Primary indicator
   */
  primary?: boolean,

  /**
   * Style property
   */
  style?: mixed
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

type State = {
  focusedByKeyboard: boolean
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
class Tab extends React.Component<Props, State> {
  static defaultProps = {
    component: 'a',
    href: 'javascript:'
  };

  context: Context;

  state: State = {
    focusedByKeyboard: false
  };

  _node = null;

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
    // eslint-disable no-unused-vars
    const {
      id,
      component: Component,
      children,
      disabled,
      onClick,
      onKeyDown,
      error,
      warning,
      success,
      primary,
      ...rest
    } = this.props;
    // eslint-enable no-unused-vars
    const isActive = this.context.activeTab === this._getId();
    const isDisabled = Boolean(this.props.disabled);
    const isVertical = this.context.vertical;
    const indicators = this.getIndicators();
    return (
      <Component
        className={cn(
          styles.root,
          isVertical && styles.vertical,
          indicators.primary && styles.primary,
          indicators.success && styles.success,
          indicators.warning && styles.warning,
          indicators.error && styles.error,
          isActive && styles.active,
          isDisabled && styles.disabled
        )}
        onBlur={!isDisabled ? this._handleBlur : this._noop}
        onClick={!isDisabled ? this._switchTab : this._noop}
        onFocus={!isDisabled ? this._handleFocus : this._noop}
        onKeyDown={!isDisabled ? this._handleKeyDown : this._noop}
        tabIndex={isDisabled ? -1 : 0}
        ref={this._refNode}
        {...rest}
      >
        {children}
        {this.state.focusedByKeyboard && <div className={styles.focus} />}
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

  _getNode = () => this;

  _switchTab = e => {
    const id = this.props.id || this.props.href;
    if (this.props.onClick) {
      this.props.onClick(e);
      if (e.defaultPrevented) {
        return;
      }
    }
    this.context.switchTab(id);
  };

  _noop = e => {};

  _handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }
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

  _handleFocus = e => {
    // focus event fires before keyDown eventlistener
    // so we should check focusKeyPressed in async way
    process.nextTick(() => {
      if (focusKeyPressed) {
        this.setState({ focusedByKeyboard: true });
        focusKeyPressed = false;
      }
    });
  };

  _handleBlur = e => {
    this.setState({ focusedByKeyboard: false });
  };

  getIndicators() {
    return {
      error: Boolean(this.props.error),
      warning: Boolean(this.props.warning),
      success: Boolean(this.props.success),
      primary: Boolean(this.props.primary),
      disabled: Boolean(this.props.disabled)
    };
  }

  getUnderlyingNode = () => this._node;
}

const { string, node, func, any, bool } = PropTypes;

Tab.propTypes = {
  children: node,
  component: any,
  disabled: bool,
  href: string,
  id: string.isRequired,
  onClick: func,
  onKeyDown: func
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

const KEYCODE_TAB = 9;
const KEYCODE_ARROW_LEFT = 37;
const KEYCODE_ARROW_UP = 38;
const KEYCODE_ARROW_RIGHT = 39;
const KEYCODE_ARROW_DOWN = 40;

let isListening: boolean;
let focusKeyPressed: boolean;

function listenTabPresses() {
  if (!isListening) {
    events.addEventListener(window, 'keydown', (event: KeyboardEvent) => {
      focusKeyPressed = [
        KEYCODE_TAB,
        KEYCODE_ARROW_LEFT,
        KEYCODE_ARROW_UP,
        KEYCODE_ARROW_RIGHT,
        KEYCODE_ARROW_DOWN
      ].includes(event.keyCode);
    });
    isListening = true;
  }
}

export default Tab;
