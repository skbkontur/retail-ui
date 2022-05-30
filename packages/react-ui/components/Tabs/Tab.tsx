import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';

import { ResizeDetector } from '../../internal/ResizeDetector';
import { isKeyArrow, isKeyArrowLeft, isKeyArrowUp } from '../../lib/events/keyboard/identifiers';
import { keyListener } from '../../lib/events/keyListener';
import { Nullable } from '../../typings/utility-types';
import { isFunctionalComponent } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { TabsContext, TabsContextType, TabsContextDefaultValue } from './TabsContext';
import { styles, horizontalStyles, verticalStyles, globalClasses } from './Tab.styles';

export interface TabIndicators {
  error: boolean;
  warning: boolean;
  success: boolean;
  primary: boolean;
  disabled: boolean;
}

export const tabDataTid = {
  root: 'Tab__root',
};

export interface TabProps<T extends string = string> extends CommonProps {
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
  id?: T;

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
   * Состояние валидации при ошибке.
   */
  error?: boolean;

  /**
   * Состояние валидации при предупреждении.
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
@rootNode
export class Tab<T extends string = string> extends React.Component<TabProps<T>, TabState> {
  public static __KONTUR_REACT_UI__ = 'Tab';

  public static contextType = TabsContext;
  public context: TabsContextType = this.context;

  public static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    href: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
  };

  public static defaultProps = {
    component: 'a',
    href: '',
  };

  public state: TabState = {
    focusedByKeyboard: false,
  };

  private theme!: Theme;
  private tabComponent: Nullable<React.ReactElement<Tab<T>>> = null;
  private setRootNode!: TSetRootNode;

  constructor(props: TabProps<T>) {
    super(props);
    invariant(this.context !== TabsContextDefaultValue, 'Tab should be placed inside Tabs component');
  }

  public componentDidMount() {
    const id = this.getId();
    if (typeof id === 'string') {
      this.context.addTab(id, this.getTabInstance);
    }
  }

  public componentDidUpdate() {
    if (this.context.activeTab === this.props.id) {
      this.context.notifyUpdate();
    }
  }

  public componentWillUnmount() {
    const id = this.getId();
    if (typeof id === 'string') {
      this.context.removeTab(id);
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
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
      children,
      disabled,
      error,
      warning,
      success,
      primary,
      component: Component = Tab.defaultProps.component,
      href,
    } = this.props;

    let isActive = false;
    let isVertical = false;

    const id = this.getId();
    if (typeof id === 'string') {
      isActive = this.context.activeTab === this.getId();
      isVertical = this.context.vertical;
    }
    const orientationStyles = isVertical ? verticalStyles : horizontalStyles;

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <Component
          data-tid={tabDataTid.root}
          className={cx({
            [styles.root(this.theme)]: true,
            [styles.vertical(this.theme)]: !!isVertical,
            [orientationStyles.primary(this.theme)]: !!primary,
            [orientationStyles.success(this.theme)]: !!success,
            [orientationStyles.warning(this.theme)]: !!warning,
            [orientationStyles.error(this.theme)]: !!error,
            [styles.active()]: !!isActive,
            [orientationStyles.active(this.theme)]: !!isActive,
            [styles.disabled(this.theme)]: !!disabled,
            [orientationStyles.disabled()]: !!disabled,
          })}
          onBlur={this.handleBlur}
          onClick={this.switchTab}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          ref={isFunctionalComponent(Component) ? null : this.refTabComponent}
          href={href}
        >
          <ResizeDetector onResize={this.context.notifyUpdate}>{children}</ResizeDetector>
          {this.state.focusedByKeyboard && <div className={cx(styles.focus(this.theme), globalClasses.focus)} />}
        </Component>
      </CommonWrapper>
    );
  }

  private getId = () => this.props.id || this.props.href;

  private refTabComponent = (instance: React.ReactElement<any>) => {
    this.tabComponent = instance;
  };

  private getTabInstance = () => this;

  private switchTab = (event: React.MouseEvent<HTMLElement>) => {
    if (this.props.disabled) {
      event.preventDefault();
      return;
    }

    const id = this.props.id || this.props.href;
    if (this.props.onClick) {
      this.props.onClick(event);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (typeof id === 'string') {
      this.context.switchTab(id);
    }
    if (this.props.component === 'a' && !this.props.href) {
      event.preventDefault();
    }
  };

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
    if (typeof id !== 'string') {
      return;
    }
    if (!isKeyArrow(e)) {
      return;
    }
    e.preventDefault();
    const delta = isKeyArrowLeft(e) || isKeyArrowUp(e) ? -1 : 1;
    this.context.shiftFocus(id, delta);
  };

  private handleFocus = () => {
    if (this.props.disabled) {
      return;
    }

    // focus event fires before keyDown eventlistener
    // so we should check focusKeyPressed in async way
    requestAnimationFrame(() => {
      if (keyListener.isTabPressed || keyListener.isArrowPressed) {
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
