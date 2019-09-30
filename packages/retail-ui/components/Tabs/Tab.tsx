import * as React from 'react';
import * as PropTypes from 'prop-types';
import invariant from 'invariant';
import { isKeyArrow, isKeyArrowLeft, isKeyArrowUp } from '../../lib/events/keyboard/Keyboard';
import tabListener from '../../lib/events/tabListener';
import { Nullable } from '../../typings/utility-types';
import { isFunctionalComponent, withContext } from '../../lib/utils';
import styles from './Tab.module.less';
import { TabsContextType, TabsContext } from './TabsContext';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './Tab.styles';
import { ThemeConsumer } from '../internal/ThemeContext';
import { ITheme } from '../../lib/theming/Theme';

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

  private theme!: ITheme;
  private tabComponent: Nullable<React.ReactElement<Tab>> = null;
  private isArrowKeyPressed: boolean = false;

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
    window.addEventListener('keydown', this.handleKeyDownGlobal);
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
    window.removeEventListener('keydown', this.handleKeyDownGlobal);
  }

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
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

  private renderMain() {
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
        className={cx({
          [styles.root]: true,
          [jsStyles.root(this.theme)]: true,
          [styles.vertical]: !!isVertical,
          [jsStyles.vertical(this.theme)]: !!isVertical,
          [jsStyles.primary(this.theme)]: !!primary,
          [jsStyles.success(this.theme)]: !!success,
          [jsStyles.warning(this.theme)]: !!warning,
          [jsStyles.error(this.theme)]: !!error,
          [styles.active]: !!isActive,
          [styles.disabled]: !!disabled,
          [jsStyles.disabled(this.theme)]: !!disabled,
        })}
        onBlur={this.handleBlur}
        onClick={this.switchTab}
        onMouseDown={this.handleMouseDown}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        ref={isFunctionalComponent(Component) ? null : this.refTabComponent}
        href={href}
        style={style}
      >
        {children}
        {this.state.focusedByKeyboard && <div className={cx(styles.focus, jsStyles.focus(this.theme))} />}
      </Component>
    );
  }

  private getId = () => this.props.id || this.props.href;

  private refTabComponent = (instance: React.ReactElement<any>) => {
    this.tabComponent = instance;
  };

  private handleKeyDownGlobal = (e: KeyboardEvent) => {
    this.isArrowKeyPressed = isKeyArrow(e);
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

  private handleMouseDown = () => (this.isArrowKeyPressed = false);

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
      if (e.defaultPrevented) {
        return;
      }
    }
    const id = this.getId();
    const { context } = this.props;
    if (!(context && typeof id === 'string')) {
      return;
    }
    if (!isKeyArrow(e)) {
      return;
    }
    e.preventDefault();
    const delta = isKeyArrowLeft(e) || isKeyArrowUp(e) ? -1 : 1;
    context.shiftFocus(id, delta);
  };

  private handleFocus = () => {
    if (this.props.disabled) {
      return;
    }

    // focus event fires before keyDown eventlistener
    // so we should check focusKeyPressed in async way
    process.nextTick(() => {
      if (tabListener.isTabPressed || this.isArrowKeyPressed) {
        this.setState({ focusedByKeyboard: true });
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
