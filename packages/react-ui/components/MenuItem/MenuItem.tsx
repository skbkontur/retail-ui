import type { AriaAttributes, HTMLAttributes } from 'react';
import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import type { GlobalObject } from '../../lib/globalObject.js';
import { isBrowser } from '../../lib/globalObject.js';
import type { Nullable } from '../../typings/utility-types.js';
import { scrollYCenterIntoNearestScrollable } from '../../lib/dom/scrollYCenterIntoNearestScrollable.js';
import { isExternalLink, isFunction, isNonNullable, isReactUIComponent } from '../../lib/utils.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import type { SizeProp } from '../../lib/types/props.js';
import type { MenuContextType } from '../../internal/Menu/MenuContext.js';
import { MenuContext } from '../../internal/Menu/MenuContext.js';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './MenuItem.styles.js';

export type MenuItemState = null | 'hover' | 'selected' | void;

export interface MenuItemProps
  extends
    Pick<AriaAttributes, 'aria-describedby' | 'aria-label'>,
    Pick<HTMLAttributes<HTMLElement>, 'id'>,
    Omit<CommonProps, 'children'> {
  /** Добавляет отступ иконке.
   * @ignore */
  _enableIconPadding?: boolean;

  /** Добавляет описание для элемента меню. */
  comment?: React.ReactNode;

  /** Делает компонент недоступным. */
  disabled?: boolean;

  /** Добавляет иконку элементу меню. */
  icon?: React.ReactElement;

  /** Задает размер контрола. */
  size?: SizeProp;

  /** @ignore */
  loose?: boolean;

  /** @ignore */
  state?: MenuItemState;

  /** Задает функцию, которая вызывается при клике. */
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Задает функцию, которая вызывается при наведении мышкой (событие `onmouseenter`). */
  onMouseEnter?: React.MouseEventHandler;

  /** Задает функцию, которая вызывается при уходе мышки с объекта (событие `onmouseleave`). */
  onMouseLeave?: React.MouseEventHandler;

  /** @ignore */
  children?: React.ReactNode | ((state: MenuItemState) => React.ReactNode);

  /** Задает HTML-атрибут `target`. */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];

  /** Задает HTML-атрибут `title`. */
  title?: React.AnchorHTMLAttributes<HTMLAnchorElement>['title'];

  /** Задает HTML-атрибут `href` - адрес, на который следует перейти. */
  href?: React.AnchorHTMLAttributes<HTMLAnchorElement>['href'];

  /** Задает HTML-атрибут `rel`. Для внешних ссылок аттрибут rel по умолчанию равен "noopener noreferrer". */
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];

  /** Заменяет корневой элемент, на компонент переданный в проп.
   * По умолчанию корневой элемент рендерится как `button`. <br />Если передан `href`, то вместо `button` рендерится `a`. */
  component?: React.ComponentType<any>;

  /** Запрещает выделение и выбор данного пункта меню. */
  isNotSelectable?: boolean;

  /** Устанавливает стиль для отображения в мобильной версии. */
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
 * `MenuItem` - это вложенный компонент, задающий базовые стили для элемента меню и позволяющий навигироваться по элементам меню с помощью клавиатуры.
 *
 * Сущности в которых может быть использован `MenuItem`: DropdownMenu, Kebab, TooltipMenu и Select.
 */
@withRenderEnvironment
@rootNode
export class MenuItem extends React.Component<MenuItemProps> {
  public static __KONTUR_REACT_UI__ = 'MenuItem';
  public static displayName = 'MenuItem';
  public static __MENU_ITEM__ = true;

  public state = {
    iconOffsetTop: 0,
    highlighted: false,
  };

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private mouseEntered = false;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private rootRef: Nullable<HTMLElement> = null;
  private contentRef = React.createRef<HTMLElement>();
  static contextType = MenuContext;

  public context!: MenuContextType;

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  public componentDidMount() {
    if (this.props.scrollIntoView && this.rootRef) {
      scrollYCenterIntoNearestScrollable(this.rootRef);
    }
    if (this.rootRef && isBrowser(this.globalObject)) {
      this.setState({
        iconOffsetTop: this.globalObject.getComputedStyle(this.rootRef).getPropertyValue('padding-top'),
      });
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

  public highlight = (): void => {
    this.setState({ highlighted: true });
  };

  public unhighlight = (): void => {
    this.setState({ highlighted: false });
  };

  public select = (event: React.SyntheticEvent<HTMLElement>): void => {
    this.handleClick(event as React.MouseEvent<HTMLElement>);
  };

  public isEnabled = (): boolean => {
    return !this.props.disabled;
  };

  public navigate = (): void => {
    if (!this.props.href) {
      return;
    }
    if (this.props.target) {
      this.globalObject.open?.(this.props.href, this.props.target);
    } else if (this.globalObject.location) {
      this.globalObject.location.href = this.props.href;
    }
  };

  private getRootSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return this.styles.rootLarge(this.theme);
      case 'medium':
        return this.styles.rootMedium(this.theme);
      case 'small':
      default:
        return this.styles.rootSmall(this.theme);
    }
  }

  private getIconSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return this.styles.iconLarge(this.theme);
      case 'medium':
        return this.styles.iconMedium(this.theme);
      case 'small':
      default:
        return this.styles.iconSmall(this.theme);
    }
  }

  private getWithIconSizeClassName() {
    switch (this.props.size) {
      case 'large':
        return this.styles.withIconLarge(this.theme);
      case 'medium':
        return this.styles.withIconMedium(this.theme);
      case 'small':
      default:
        return this.styles.withIconSmall(this.theme);
    }
  }

  private renderMain = () => {
    const {
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
      rel = href && isExternalLink(href, this.globalObject) ? 'noopener noreferrer' : this.props.rel,
      isNotSelectable,
      children,
      className: unusedClasses,
      style,
      'data-tid': dataTid,
      ...rest
    } = this.props;

    let iconElement = null;
    if (icon) {
      iconElement = (
        <div
          style={{ top: this.state.iconOffsetTop }}
          className={this.cx({
            [this.styles.icon()]: true,
            [this.getIconSizeClassName()]: true,
          })}
        >
          {icon}
        </div>
      );
    }

    const className = this.cx({
      [this.styles.root(this.theme)]: true,
      [this.getRootSizeClassName()]: true,
      [this.styles.rootMobile(this.theme)]: isMobile,
      [this.styles.loose()]: !!loose,
      [this.styles.hover(this.theme)]: this.isHover,
      [this.styles.selected(this.theme)]: this.isSelected,
      [this.getWithIconSizeClassName()]: Boolean(iconElement) || !!_enableIconPadding || this.context.enableIconPadding,
      [this.styles.nonSelectable()]: !!isNotSelectable,
      [this.styles.disabled(this.theme)]: !!disabled,
    });

    let content = children;
    if (isFunction(children)) {
      content = children(this.activeState);
    }

    const Component = this.getComponent();

    return (
      <CommonWrapper
        rootNodeRef={this.setRootNode}
        {...getVisualStateDataAttributes({
          hover: this.isHover,
          selected: this.isSelected,
        })}
        {...this.props}
      >
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
            className={this.cx({
              [this.styles.mobileContentWithIcon()]: isMobile && isNonNullable(icon),
            })}
            ref={this.contentRef}
            data-tid={MenuItemDataTids.content}
          >
            {typeof content === 'function' ? content() : content}
          </span>
          {comment && (
            <div
              data-tid={MenuItemDataTids.comment}
              className={this.cx({
                [this.styles.comment(this.theme)]: true,
                [this.styles.commentHover(this.theme)]: this.isHover,
              })}
            >
              {comment}
            </div>
          )}
        </Component>
      </CommonWrapper>
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
