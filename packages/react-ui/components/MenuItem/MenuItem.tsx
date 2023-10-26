// TODO: Enable this rule in functional components.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { AriaAttributes } from 'react';
import PropTypes from 'prop-types';
import { globalObject, isBrowser } from '@skbkontur/global-object';

import { Nullable } from '../../typings/utility-types';
import { isExternalLink, isFunction, isNonNullable, isReactUIComponent } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { SizeProp } from '../../lib/types/props';

import { styles } from './MenuItem.styles';

/**
 * @deprecated use SizeProp
 */
export type MenuItemSize = SizeProp;

export type MenuItemState = null | 'hover' | 'selected' | void;

export interface MenuItemProps
  extends Pick<AriaAttributes, 'aria-describedby' | 'aria-label'>,
    Omit<CommonProps, 'children'> {
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
   * Размер
   */
  size?: SizeProp;
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
   * HTML-атрибут `rel`.
   *
   * Для внешних ссылок аттрибут rel по умолчанию равен "noopener noreferrer"
   */
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
  /**
   * Заменяет корневой элемент, на компонент переданный в проп.
   *
   * По умолчанию корневой элемент рендерится как `button`. <br />Если передан `href`, то вместо `button` рендерится `a`.
   */
  component?: React.ComponentType<any>;

  isMobile?: boolean;
}

export const MenuItemDataTids = {
  root: 'MenuItem__root',
  comment: 'MenuItem__comment',
} as const;

/**
 *
 * `MenuItem` - это вложенный компонент, задающий базовые стили для элемента меню и позволяющий навигироваться по элементам меню с помощью клавиатуры.
 *
 * Сущности в которых может быть использован `MenuItem`: [DropdownMenu](#/Components/DropdownMenu), [Kebab](#/Components/Kebab), [TooltipMenu](#/Components/TooltipMenu) и [Select](#/Components/Select).
 */
@rootNode
export class MenuItem extends React.Component<MenuItemProps> {
  public static __KONTUR_REACT_UI__ = 'MenuItem';
  public static __MENU_ITEM__ = true;

  public static propTypes = {
    comment: PropTypes.node,

    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.node,

    loose: PropTypes.bool,

    state: PropTypes.string,

    target: PropTypes.string,

    onClick: PropTypes.func,

    size: PropTypes.string,
  };

  public state = {
    iconOffsetTop: 0,
  };

  private theme!: Theme;
  private mouseEntered = false;
  private setRootNode!: TSetRootNode;
  private rootRef: Nullable<HTMLElement> = null;

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

  public componentDidMount() {
    if (this.rootRef && isBrowser(globalObject)) {
      this.setState({ iconOffsetTop: globalObject.getComputedStyle(this.rootRef).getPropertyValue('padding-top') });
    }
  }

  private getRootSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return styles.rootLarge(this.theme);
      case 'medium':
        return styles.rootMedium(this.theme);
      case 'small':
      default:
        return styles.rootSmall(this.theme);
    }
  }

  private getIconSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return styles.iconLarge(this.theme);
      case 'medium':
        return styles.iconMedium(this.theme);
      case 'small':
      default:
        return styles.iconSmall(this.theme);
    }
  }

  private getWithIconSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return styles.withIconLarge(this.theme);
      case 'medium':
        return styles.withIconMedium(this.theme);
      case 'small':
      default:
        return styles.withIconSmall(this.theme);
    }
  }

  private renderMain = (props: CommonWrapperRestProps<MenuItemProps>) => {
    const {
      link,
      comment,
      icon,
      loose,
      state,
      size,
      _enableIconPadding,
      component,
      onMouseEnter,
      onMouseLeave,
      isMobile,
      href,
      disabled,
      rel = this.props.href && isExternalLink(this.props.href) ? 'noopener noreferrer' : this.props.rel,
      ...rest
    } = props;

    const hover = state === 'hover' && !disabled;

    let iconElement = null;
    if (icon) {
      iconElement = (
        <div
          style={{ top: this.state.iconOffsetTop }}
          className={cx({
            [styles.icon(this.theme)]: true,
            [this.getIconSizeClassName()]: true,
          })}
        >
          {icon}
        </div>
      );
    }

    const className = cx({
      [styles.root(this.theme)]: true,
      [this.getRootSizeClassName()]: true,
      [styles.rootMobile(this.theme)]: isMobile,
      [styles.loose()]: !!loose,
      [styles.hover(this.theme)]: hover,
      [styles.selected(this.theme)]: state === 'selected',
      [styles.link(this.theme)]: !!link,
      [this.getWithIconSizeClassName()]: Boolean(iconElement) || !!_enableIconPadding,
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
        ref={this.setRootRef}
        data-tid={MenuItemDataTids.root}
        {...rest}
        disabled={disabled}
        state={state}
        onMouseOver={this.handleMouseEnterFix}
        onMouseLeave={this.handleMouseLeave}
        className={className}
        href={href}
        rel={href ? rel : undefined}
        tabIndex={-1}
      >
        {iconElement}
        <span
          className={cx({
            [styles.mobileContentWithIcon()]: isMobile && isNonNullable(icon),
          })}
        >
          {content}
        </span>
        {this.props.comment && (
          <div
            data-tid={MenuItemDataTids.comment}
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

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  private handleMouseEnterFix = (e: React.MouseEvent<HTMLElement>) => {
    if (!this.mouseEntered && this.props.onMouseEnter) {
      this.mouseEntered = true;
      this.props.onMouseEnter(e);
    }
  };

  private handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    this.mouseEntered = false;
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };

  private setRootRef = (element: HTMLElement) => {
    this.rootRef = element;
  };

  private getComponent = () => {
    const { disabled, component, href } = this.props;

    if (component) {
      return component;
    }

    if (disabled) {
      return 'button';
    }

    if (href) {
      return 'a';
    }

    return 'button';
  };
}

export const isMenuItem = isReactUIComponent('MenuItem');
