import React, { AriaAttributes, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { globalObject, isBrowser } from '@skbkontur/global-object';
import type { Emotion } from '@emotion/css/create-instance';

import { scrollYCenterIntoNearestScrollable } from '../../lib/dom/scrollYCenterIntoNearestScrollable';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { Nullable } from '../../typings/utility-types';
import { isExternalLink, isFunction, isNonNullable, isReactUIComponent } from '../../lib/utils';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { SizeProp } from '../../lib/types/props';
import { MenuContext, MenuContextType } from '../../internal/Menu/MenuContext';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './MenuItem.styles';

export type MenuItemState = null | 'hover' | 'selected' | void;

export interface MenuItemProps
  extends Pick<AriaAttributes, 'aria-describedby' | 'aria-label'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
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
  /**
   * Запрещает выделение и выбор данного пункта меню
   *
   */
  isNotSelectable?: boolean;

  isMobile?: boolean;
  /** @ignore */
  scrollIntoView?: boolean;
}

export const MenuItemDataTids = {
  root: 'MenuItem__root',
  content: 'MenuItem__content',
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
  public static displayName = 'MenuItem';
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
    highlighted: false,
  };

  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private mouseEntered = false;
  private setRootNode!: TSetRootNode;
  private rootRef: Nullable<HTMLElement> = null;
  private contentRef = React.createRef<HTMLElement>();
  static contextType = MenuContext;

  public context!: MenuContextType;

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                this.theme = theme;
                return (
                  <CommonWrapper
                    rootNodeRef={this.setRootNode}
                    {...getVisualStateDataAttributes({
                      hover: this.isHover,
                      selected: this.isSelected,
                    })}
                    {...this.props}
                  >
                    {this.renderMain(this.props)}
                  </CommonWrapper>
                );
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  public componentDidMount() {
    if (this.props.scrollIntoView && this.rootRef) {
      scrollYCenterIntoNearestScrollable(this.rootRef);
    }
    if (this.rootRef && isBrowser(globalObject)) {
      this.setState({ iconOffsetTop: globalObject.getComputedStyle(this.rootRef).getPropertyValue('padding-top') });
    }
    if (this.contentRef.current && !this.props.isNotSelectable) {
      this.context.navigation?.add(this.contentRef.current, this);
    }
    if (this.props.icon) {
      this.context.setEnableIconPadding?.(true);
    }
  }

  public componentWillUnmount() {
    if (this.contentRef.current) {
      !this.props.isNotSelectable && this.context.navigation?.remove(this.contentRef.current);
      this.context.setEnableIconPadding?.(this.hasIconAmongItems());
    }
  }

  public componentDidUpdate(prevProps: Readonly<MenuItemProps>) {
    if (prevProps.icon !== this.props.icon) {
      this.context.setEnableIconPadding?.(!!this.props.icon || this.hasIconAmongItems());
    }
    if (this.contentRef.current && prevProps.isNotSelectable !== this.props.isNotSelectable) {
      if (this.props.isNotSelectable) {
        this.unhighlight();
        this.context.navigation?.remove(this.contentRef.current);
      } else {
        this.context.navigation?.add(this.contentRef.current, this);
      }
    }
  }

  public highlight = () => {
    this.setState({ highlighted: true });
  };

  public unhighlight = () => {
    this.setState({ highlighted: false });
  };

  public select = (event: React.SyntheticEvent<HTMLElement>) => {
    this.handleClick(event as React.MouseEvent<HTMLElement>);
  };

  public isEnabled = () => {
    return !this.props.disabled;
  };

  public navigate = () => {
    if (!this.props.href) {
      return;
    }
    if (this.props.target) {
      window.open(this.props.href, this.props.target);
    } else {
      location.href = this.props.href;
    }
  };

  private getRootSizeClassName() {
    const styles = this.styles;
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
    const styles = this.styles;
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
    const styles = this.styles;
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
      scrollIntoView,
      rel = this.props.href && isExternalLink(this.props.href) ? 'noopener noreferrer' : this.props.rel,
      isNotSelectable,
      ...rest
    } = props;

    const styles = this.styles;
    let iconElement = null;
    if (icon) {
      iconElement = (
        <div
          style={{ top: this.state.iconOffsetTop }}
          className={this.emotion.cx({
            [styles.icon()]: true,
            [this.getIconSizeClassName()]: true,
          })}
        >
          {icon}
        </div>
      );
    }

    const className = this.emotion.cx({
      [styles.root(this.theme)]: true,
      [this.getRootSizeClassName()]: true,
      [styles.rootMobile(this.theme)]: isMobile,
      [styles.loose()]: !!loose,
      [styles.hover(this.theme)]: this.isHover,
      [styles.selected(this.theme)]: this.isSelected,
      [styles.link(this.theme)]: !!link,
      [this.getWithIconSizeClassName()]: Boolean(iconElement) || !!_enableIconPadding || this.context.enableIconPadding,
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
        state={this.activeState}
        onMouseOver={this.handleMouseEnterFix}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        className={className}
        href={href}
        rel={href ? rel : undefined}
        tabIndex={-1}
      >
        {iconElement}
        <span
          className={this.emotion.cx({
            [styles.mobileContentWithIcon()]: isMobile && isNonNullable(icon),
          })}
          ref={this.contentRef}
          data-tid={MenuItemDataTids.content}
        >
          {typeof content === 'function' ? content() : content}
        </span>
        {this.props.comment && (
          <div
            data-tid={MenuItemDataTids.comment}
            className={this.emotion.cx({
              [styles.comment(this.theme)]: true,
              [styles.commentHover(this.theme)]: this.isHover,
            })}
          >
            {comment}
          </div>
        )}
      </Component>
    );
  };

  private get activeState() {
    return this.state.highlighted ? 'hover' : this.props.state;
  }

  private get isHover(): boolean {
    return (this.state.highlighted || this.props.state === 'hover') && !this.props.disabled;
  }

  private get isSelected(): boolean {
    return this.props.state === 'selected' && !this.state.highlighted;
  }

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  private handleMouseEnterFix = (e: React.MouseEvent<HTMLElement>) => {
    if (!this.mouseEntered) {
      this.mouseEntered = true;
      this.props.onMouseEnter?.(e);
      !this.props.isNotSelectable && this.context.navigation?.highlight(this);
    }
  };

  private handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    this.mouseEntered = false;
    this.props.onMouseLeave?.(e);
    !this.props.isNotSelectable && this.context.navigation?.unhighlight();
  };

  private handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.isNotSelectable) {
      return;
    }
    this.props.onClick?.(e);
    this.context.onItemClick?.(e);
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

  private hasIconAmongItems = () => {
    return Boolean(this.context.navigation?.items.some((item) => item.props.icon));
  };
}

export const isMenuItem = isReactUIComponent('MenuItem');
