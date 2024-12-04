import type { AriaAttributes } from 'react';
import React from 'react';
import invariant from 'invariant';
import { globalObject } from '@skbkontur/global-object';

import { ResizeDetector } from '../../internal/ResizeDetector';
import { isKeyArrow, isKeyArrowLeft, isKeyArrowUp } from '../../lib/events/keyboard/identifiers';
import { keyListener } from '../../lib/events/keyListener';
import type { Nullable } from '../../typings/utility-types';
import { isFunctionalComponent } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import type { TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';

import type { TabsContextType } from './TabsContext';
import { TabsContext, TabsContextDefaultValue } from './TabsContext';
import { globalClasses, horizontalStyles, styles, verticalStyles } from './Tab.styles';

export interface TabIndicators {
  error: boolean;
  warning: boolean;
  success: boolean;
  primary: boolean;
  disabled: boolean;
}

export const TabDataTids = {
  root: 'Tab__root',
} as const;

export interface TabProps<T extends string = string>
  extends Pick<AriaAttributes, 'aria-label' | 'aria-describedby'>,
    CommonProps {
  /**
   * Позволяет передавать свой компонент, строку или функцию, которая заменит собой элемент используемый в компоненте по умолчанию. Реализует паттерн [render prop](https://www.patterns.dev/posts/render-props-pattern).
   */
  component?: React.ComponentType<any> | string;

  /**
   * `HTML`-аттрибут `href`.
   */
  href?: string;

  /**
   * Уникальный идентификатор таба. По нему компонент `<Tabs />` определяет какой `<Tab />` сейчас выбран.
   */
  id?: T;

  /**
   * `HTML`-событие `onclick`.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * `HTML`-событие `onkeydown`.
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;

  /**
   * Переводит компонент в отключенное состояние.
   */
  disabled?: boolean;

  /**
   * Визуальное состояние ошибки.
   */
  error?: boolean;

  /**
   * Визуальное состояние предупреждения.
   */
  warning?: boolean;

  /**
   * Визуальное состояние успеха.
   */
  success?: boolean;

  /**
   * Визуальное состояние главного элемента.
   */
  primary?: boolean;
}

export interface TabState {
  focusedByKeyboard: boolean;
}

type DefaultProps = Required<Pick<TabProps, 'component' | 'href'>>;

/**
 * Вложенный элемент компонента `<Tabs />`.
 */
@rootNode
export class Tab<T extends string = string> extends React.Component<TabProps<T>, TabState> {
  public static __KONTUR_REACT_UI__ = 'Tab';
  public static displayName = 'Tab';

  public static contextType = TabsContext;
  public context: TabsContextType = this.context;

  public static defaultProps: DefaultProps = {
    component: 'a',
    href: '',
  };

  private getProps = createPropsGetter(Tab.defaultProps);

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
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
    } = this.props;
    const { component: Component, href } = this.getProps();

    let isActive = false;
    let isVertical = false;

    const id = this.getId();
    if (typeof id === 'string') {
      isActive = this.context.activeTab === this.getId();
      isVertical = this.context.vertical;
    }
    const orientationStyles = isVertical ? verticalStyles : horizontalStyles;

    return (
      <CommonWrapper
        rootNodeRef={this.setRootNode}
        {...getVisualStateDataAttributes({ active: isActive, disabled })}
        {...this.props}
      >
        <Component
          data-tid={TabDataTids.root}
          className={cx({
            [styles.rootSmall(this.theme)]: this.context.size === 'small',
            [styles.rootMedium(this.theme)]: this.context.size === 'medium',
            [styles.rootLarge(this.theme)]: this.context.size === 'large',
            [styles.verticalSmall(this.theme)]: !!isVertical && this.context.size === 'small',
            [styles.verticalMedium(this.theme)]: !!isVertical && this.context.size === 'medium',
            [styles.verticalLarge(this.theme)]: !!isVertical && this.context.size === 'large',
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
          aria-describedby={ariaDescribedby}
          aria-label={ariaLabel}
        >
          <ResizeDetector onResize={this.context.notifyUpdate}>{children}</ResizeDetector>
          {this.state.focusedByKeyboard && (
            <div
              className={cx(globalClasses.focus, {
                [styles.focusSmall(this.theme)]: this.context.size === 'small',
                [styles.focusMedium(this.theme)]: this.context.size === 'medium',
                [styles.focusLarge(this.theme)]: this.context.size === 'large',
              })}
            />
          )}
        </Component>
      </CommonWrapper>
    );
  }

  private getId = () => this.props.id || this.getProps().href;

  private refTabComponent = (instance: React.ReactElement<any>) => {
    this.tabComponent = instance;
  };

  private getTabInstance = () => this;

  private switchTab = (event: React.MouseEvent<HTMLElement>) => {
    if (this.props.disabled) {
      event.preventDefault();
      return;
    }
    const { href, component } = this.getProps();

    const id = this.props.id || href;
    if (this.props.onClick) {
      this.props.onClick(event);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (typeof id === 'string') {
      this.context.switchTab(id);
    }
    if (component === 'a' && !href) {
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
    globalObject.requestAnimationFrame?.(() => {
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
