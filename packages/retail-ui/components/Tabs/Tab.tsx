import * as React from 'react';
import * as PropTypes from 'prop-types';
import invariant from 'invariant';
import cn from 'classnames';
import { Nullable } from '../../typings/utility-types';
import { isFunctionalComponent, withContext } from '../../lib/utils';

import styles from './Tab.less';
import { TabsContextType, TabsContext } from './TabsContext';

export interface TabIndicators {
  error: boolean;
  warning: boolean;
  success: boolean;
  primary: boolean;
  disabled: boolean;
}

export interface TabProps {
  /**
   * Tab content
   */
  children?: React.ReactNode;

  /**
   * Component to use as a tab
   */
  component?: React.ComponentType<any> | string;

  /**
   * Link href
   */
  href?: string;

  /**
   * Tab identifier
   */
  id?: string;

  /**
   * Click event
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Click event
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;

  /**
   * Disabled indicator
   */
  disabled?: boolean;

  /**
   * Error indicator
   */
  error?: boolean;

  /**
   * Warning indicator
   */
  warning?: boolean;

  /**
   * Success indicator
   */
  success?: boolean;

  /**
   * Primary indicator
   */
  primary?: boolean;

  /**
   * Style property
   */
  style?: React.CSSProperties;

  context?: TabsContextType;
}

export interface TabState {
  focusedByKeyboard: boolean;
}

const KEYCODE_TAB = 9;
const KEYCODE_ARROW_LEFT = 37;
const KEYCODE_ARROW_UP = 38;
const KEYCODE_ARROW_RIGHT = 39;
const KEYCODE_ARROW_DOWN = 40;

let isListening: boolean;
let focusKeyPressed: boolean;

function listenTabPresses() {
  if (!isListening) {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      focusKeyPressed = [
        KEYCODE_TAB,
        KEYCODE_ARROW_LEFT,
        KEYCODE_ARROW_UP,
        KEYCODE_ARROW_RIGHT,
        KEYCODE_ARROW_DOWN,
      ].includes(event.keyCode);
    });
    isListening = true;
  }
}

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
export class Tab extends React.Component<TabProps, TabState> {
  public static propTypes = {
    children: PropTypes.node,
    component: PropTypes.any,
    disabled: PropTypes.bool,
    href: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    context: PropTypes.shape({
      vertical: PropTypes.bool.isRequired,
      activeTab: PropTypes.string.isRequired,
      getTab: PropTypes.func.isRequired,
      addTab: PropTypes.func.isRequired,
      removeTab: PropTypes.func.isRequired,
      notifyUpdate: PropTypes.func.isRequired,
      switchTab: PropTypes.func.isRequired,
      shiftFocus: PropTypes.func.isRequired,
    }),
  };

  public static defaultProps = {
    component: 'a',
    href: 'javascript:',
  };

  public state: TabState = {
    focusedByKeyboard: false,
  };

  private tabComponent: Nullable<React.ReactElement<Tab>> = null;

  public componentWillMount() {
    invariant(
      this.props.context && typeof this.props.context.addTab === 'function',
      'Tab should be placed inside Tabs component',
    );
  }

  public componentDidMount() {
    const id = this.getId();
    if (this.props.context && typeof id === 'string') {
      this.props.context.addTab(id, this.getTabInstance);
    }
    listenTabPresses();
  }

  public componentDidUpdate() {
    const { context } = this.props;
    if (!context) {
      return;
    }
    if (context.activeTab === this.props.id) {
      context.notifyUpdate();
    }
  }

  public componentWillUnmount() {
    const id = this.getId();
    if (this.props.context && typeof id === 'string') {
      this.props.context.removeTab(id);
    }
  }

  public render() {
    const {
      context,
      children,
      disabled,
      error,
      warning,
      success,
      primary,
      component: Component = Tab.defaultProps.component,
      href,
      style,
    } = this.props;

    let isActive = false;
    let isVertical = false;

    const id = this.getId();
    if (context && typeof id === 'string') {
      isActive = context.activeTab === this.getId();
      isVertical = context.vertical;
    }

    return (
      <Component
        className={cn({
          [styles.root]: true,
          [styles.vertical]: isVertical,
          [styles.primary]: primary,
          [styles.success]: success,
          [styles.warning]: warning,
          [styles.error]: error,
          [styles.active]: isActive,
          [styles.disabled]: disabled,
        })}
        onBlur={this.handleBlur}
        onClick={this.switchTab}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        ref={isFunctionalComponent(Component) ? null : this.refTabComponent}
        href={href}
        style={style}
      >
        {children}
        {this.state.focusedByKeyboard && <div className={styles.focus} />}
      </Component>
    );
  }

  public getIndicators() {
    return {
      error: Boolean(this.props.error),
      warning: Boolean(this.props.warning),
      success: Boolean(this.props.success),
      primary: Boolean(this.props.primary),
      disabled: Boolean(this.props.disabled),
    };
  }

  public getUnderlyingNode = () => this.tabComponent;

  private getId = () => this.props.id || this.props.href;

  private refTabComponent = (instance: React.ReactElement<any>) => {
    this.tabComponent = instance;
  };

  private getTabInstance = () => this;

  private switchTab = (event: React.MouseEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

    const id = this.props.id || this.props.href!;
    if (this.props.onClick) {
      this.props.onClick(event);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (this.props.context && typeof id === 'string') {
      this.props.context.switchTab(id);
    }
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }
    const id = this.getId();
    const { context } = this.props;
    if (!(context && typeof id === 'string')) {
      return;
    }
    switch (event.keyCode) {
      case KEYCODE_ARROW_LEFT:
      case KEYCODE_ARROW_UP:
        event.preventDefault();
        context.shiftFocus(id, -1);
        return;
      case KEYCODE_ARROW_RIGHT:
      case KEYCODE_ARROW_DOWN:
        event.preventDefault();
        context.shiftFocus(id, 1);
        return;
      default:
        return;
    }
  };

  private handleFocus = () => {
    if (this.props.disabled) {
      return;
    }

    // focus event fires before keyDown eventlistener
    // so we should check focusKeyPressed in async way
    process.nextTick(() => {
      if (focusKeyPressed) {
        this.setState({ focusedByKeyboard: true });
        focusKeyPressed = false;
      }
    });
  };

  private handleBlur = () => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ focusedByKeyboard: false });
  };
}
export const TabWithContext = withContext(TabsContext.Consumer)(Tab);

export default TabWithContext;
