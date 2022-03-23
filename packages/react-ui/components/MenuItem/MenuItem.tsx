import React from 'react';
import PropTypes from 'prop-types';

import { getRandomID, isFunction, isReactUIComponent } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode/rootNodeDecorator';
import { MenuContext, MenuContextType } from '../../internal/Menu/MenuContext';

import { styles } from './MenuItem.styles';

export type MenuItemState = null | 'hover' | 'selected' | void;

export interface MenuItemProps extends CommonProps {
  /**
   * @ignore
   */
  _enableIconPadding?: boolean;
  /**
   * Добавляет описание для элемента меню.
   */
  comment?: React.ReactNode;
  /**
   * Отключенное состояние.
   */
  disabled?: boolean;
  /**
   * Добавляет элементу меню иконку.
   */
  icon?: React.ReactElement<any>;
  /**
   * Меняет цвет текста на синий.
   */
  link?: boolean;
  /**
   * @ignore
   */
  loose?: boolean;
  /**
   * @ignore
   */
  state?: MenuItemState;
  /**
   * HTML-событие `onclick`.
   */
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * HTML-событие `mouseenter`.
   */
  onMouseEnter?: React.MouseEventHandler;
  /**
   * HTML-событие `mouseleave`.
   */
  onMouseLeave?: React.MouseEventHandler;
  children?: React.ReactNode | ((state: MenuItemState) => React.ReactNode);
  /**
   * HTML-атрибут `target`.
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  /**
   * HTML-атрибут `title`.
   */
  title?: React.AnchorHTMLAttributes<HTMLAnchorElement>['title'];
  /**
   * HTML-атрибут `href`.
   */
  href?: React.AnchorHTMLAttributes<HTMLAnchorElement>['href'];
  /**
   * Заменяет корневой элемент, на компонент переданный в проп.
   *
   * По умолчанию корневой элемент рендерится как `button`. <br />Если передан `href`, то вместо `button` рендерится `a`.
   */
  component?: React.ComponentType<any>;

  isMobile?: boolean;
}

/**
 *
 * `MenuItem` - это вложенный компонент, задающий базовые стили для элемента меню и позволяющий навигироваться по элементам меню с помощью клавиатуры.
 *
 * Сущности в которых может быть использован `MenuItem`: [`DropdownMenu`](#/Components/DropdownMenu), [`Kebab`](#/Components/Kebab), [`TooltipMenu`](#/Components/TooltipMenu) и [`Select`](#/Components/Select).
 */
@rootNode
export class MenuItem extends React.Component<MenuItemProps> {
  public static __KONTUR_REACT_UI__ = 'MenuItem';
  public static __MENU_ITEM__ = true;

  public static propTypes = {
    comment: PropTypes.node,

    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    loose: PropTypes.bool,

    state: PropTypes.string,

    target: PropTypes.string,

    onClick: PropTypes.func,
  };

  private theme!: Theme;
  private mouseEntered = false;
  private setRootNode!: TSetRootNode;
  private commonRef = React.createRef();
  private _key = getRandomID();

  public static contextType = MenuContext;
  public context: MenuContextType = this.context;

  public componentDidMount() {
    if (!this.props.disabled) {
      this.context.addMenuItem?.(this._key, this);
    }
  }

  public componentWillUnmount() {
    this.context.deleteMenuItem?.(this._key);
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              {this.renderMain}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain = (props: CommonWrapperRestProps<MenuItemProps>) => {
    const {
      link,
      comment,
      icon,
      loose,
      state,
      _enableIconPadding,
      component,
      onMouseEnter,
      onMouseLeave,
      isMobile,
      ...rest
    } = props;

    const hover = (state === 'hover' || this._key === this.context.highlightedKey) && !this.props.disabled;

    let iconElement = null;
    if (icon) {
      iconElement = <div className={styles.icon(this.theme)}>{icon}</div>;
    }

    const shouldEnableIconPadding = !!_enableIconPadding || this.context._enableIconPadding;

    const className = cx({
      [styles.root(this.theme)]: true,
      [styles.rootMobile(this.theme)]: isMobile,
      [styles.loose()]: !!loose,
      [styles.hover(this.theme)]: hover,
      [styles.selected(this.theme)]: state === 'selected',
      [styles.link(this.theme)]: !!link,
      [styles.withIcon(this.theme)]: Boolean(iconElement) || shouldEnableIconPadding,
      [styles.disabled(this.theme)]: !!this.props.disabled,
    });

    const { children } = this.props;

    let content = children;
    if (isFunction(children)) {
      content = children(this.props.state);
    }

    const Component = this.getComponent();

    return (
      <Component
        {...rest}
        state={state}
        onMouseOver={this.handleMouseEnterFix}
        onMouseLeave={this.handleMouseLeave}
        className={className}
        tabIndex={-1}
        ref={this.commonRef}
        onClick={this.onClick}
      >
        {iconElement}
        {content}
        {this.props.comment && (
          <div
            data-tid="MenuItem__comment"
            className={cx({
              [styles.comment(this.theme)]: true,
              [styles.commentHover(this.theme)]: hover,
            })}
          >
            {comment}
          </div>
        )}
      </Component>
    );
  };

  public getRef = () => {
    return this.commonRef.current;
  };

  private onClick = (event: React.MouseEvent<HTMLElement>) => {
    this.context.onClick?.(this._key, false, event);
  };

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  private handleMouseEnterFix = (e: React.MouseEvent<HTMLElement>) => {
    this.context.setHighlightedKey?.(this._key);
    if (!this.mouseEntered && this.props.onMouseEnter) {
      this.mouseEntered = true;
      this.props.onMouseEnter(e);
    }

    if (!this.mouseEntered && this.context.onMouseEnter) {
      this.mouseEntered = true;
      this.context.onMouseEnter(e);
    }
  };

  private handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    this.mouseEntered = false;
    this.props.onMouseLeave?.(e);
    this.context.setHighlightedKey?.();
    this.context.onMouseLeave?.(e);
  };

  private getComponent = () => {
    const { disabled, component, href } = this.props;

    if (disabled) {
      return 'button';
    }

    if (component) {
      return component;
    }

    if (href) {
      return 'a';
    }

    return 'button';
  };
}

export const isMenuItem = isReactUIComponent('MenuItem');
