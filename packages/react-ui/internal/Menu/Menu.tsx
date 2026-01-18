import type { CSSProperties, HTMLAttributes } from 'react';
import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import type { GlobalObject } from '../../lib/globalObject.js';
import { isBrowser } from '../../lib/globalObject.js';
import { isKeyArrowDown, isKeyArrowUp, isKeyEnter } from '../../lib/events/keyboard/identifiers.js';
import { MenuSeparator } from '../../components/MenuSeparator/index.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import { getDOMRect } from '../../lib/dom/getDOMRect.js';
import { responsiveLayout } from '../../components/ResponsiveLayout/decorator.js';
import { isNonNullable } from '../../lib/utils.js';
import type { ScrollContainerScrollStateY } from '../../components/ScrollContainer/index.js';
import { ScrollContainer } from '../../components/ScrollContainer/index.js';
import type { MenuItem } from '../../components/MenuItem/index.js';
import { MenuItemDataTids } from '../../components/MenuItem/index.js';
import type { Nullable } from '../../typings/utility-types.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { getRootNode, rootNode } from '../../lib/rootNode/index.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { isInstanceOf } from '../../lib/isInstanceOf.js';
import type { CommonProps } from '../CommonWrapper/index.js';
import { CommonWrapper } from '../CommonWrapper/index.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './Menu.styles.js';
import { MenuNavigation } from './MenuNavigation.js';
import { MenuContext } from './MenuContext.js';

export interface MenuProps extends CommonProps, Pick<HTMLAttributes<HTMLDivElement>, 'id'> {
  children: React.ReactNode;
  hasMargin?: boolean;
  /**
   * Максимальная высота применяется только для скролл контейнера
   *
   * Высота `header` и `footer` в нее не включены
   */
  maxHeight?: number | string;
  onItemClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
  width?: number | string;
  preventWindowScroll?: boolean;
  /**
   * Отключение кастомного скролла контейнера
   */
  disableScrollContainer?: boolean;
  align?: 'left' | 'right';
  /**
   * Предотвращает выравнивание текста всех пунктов меню относительно друг друга.
   * Так, если хотя бы у одного пункта меню есть иконка, текст в  остальных пунктах меню будет выровнен относительно пункта меню с иконкой
   */
  preventIconsOffset?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;

  header?: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * Циклический перебор айтемов меню (по-дефолтну включен)
   */
  cyclicSelection?: boolean;
  initialSelectedItemIndex?: number;
}

export interface MenuState {
  maxHeight: number | string;
  scrollState: ScrollContainerScrollStateY;
  enableIconPadding: boolean;
}

export const MenuDataTids = {
  root: 'Menu__root',
} as const;

type DefaultProps = Required<
  Pick<
    MenuProps,
    | 'align'
    | 'width'
    | 'hasMargin'
    | 'maxHeight'
    | 'preventWindowScroll'
    | 'cyclicSelection'
    | 'initialSelectedItemIndex'
  >
>;

@withRenderEnvironment
@responsiveLayout
@rootNode
export class Menu extends React.PureComponent<MenuProps, MenuState> {
  public static __KONTUR_REACT_UI__ = 'Menu';
  public static displayName = 'Menu';

  public static defaultProps: DefaultProps = {
    align: 'left',
    width: 'auto',
    maxHeight: 300,
    hasMargin: true,
    preventWindowScroll: true,
    cyclicSelection: true,
    initialSelectedItemIndex: -1,
  };

  private getProps = createPropsGetter(Menu.defaultProps);

  public state: MenuState = {
    maxHeight: this.getProps().maxHeight || 'none',
    scrollState: 'top',
    enableIconPadding: false,
  };

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private scrollContainer: Nullable<ScrollContainer>;
  private isMobileLayout!: boolean;
  private unmounted = false;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private header: Nullable<HTMLDivElement>;
  private footer: Nullable<HTMLDivElement>;
  private contentRef = React.createRef<HTMLDivElement>();
  private menuNavigation: MenuNavigation<MenuItem> = new MenuNavigation(this.contentRef, MenuItemDataTids.content);

  public componentWillUnmount(): void {
    this.unmounted = true;
  }

  public componentDidMount(): void {
    this.setInitialSelection();
    this.calculateMaxHeight();
    this.unmounted = false;
  }

  public componentDidUpdate(prevProps: MenuProps): void {
    if (this.shouldRecalculateMaxHeight(prevProps)) {
      this.calculateMaxHeight();
    }

    if (prevProps.maxHeight !== this.getProps().maxHeight) {
      this.setState({
        maxHeight: this.props.maxHeight || 'none',
      });
    }
  }

  public focus(): void {
    this.focusOnRootElement();
  }

  private focusOnRootElement = (): void => {
    const rootNode = getRootNode(this);
    if (isInstanceOf(rootNode, this.globalObject.HTMLElement)) {
      rootNode?.focus();
    }
  };

  public render() {
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

  /**
   * @public
   */
  public up() {
    this.move(-1);
  }

  /**
   * @public
   */
  public down() {
    this.move(1);
  }

  /**
   * @public
   */
  public enter(event: React.SyntheticEvent<HTMLElement>) {
    this.menuNavigation.highlightedItem?.navigate();
    return this.menuNavigation.select(event);
  }

  /**
   * @public
   */
  public reset(): void {
    this.menuNavigation.reset();
  }

  /**
   * @public
   */
  public hasHighlightedItem() {
    return !!this.menuNavigation.highlightedItem;
  }

  public highlightItem(index: number) {
    this.menuNavigation.highlightByIndex(index);
  }

  private renderMain() {
    if (this.isEmpty()) {
      return null;
    }
    const { hasMargin, maxHeight, preventWindowScroll } = this.getProps();

    const offsetY = {
      top: `${this.theme.scrollContainerScrollBarOffsetY}`,
      right: 0,
      bottom: `${this.theme.scrollContainerScrollBarOffsetY}`,
    };

    const isMobile = this.isMobileLayout;
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div
          data-tid={MenuDataTids.root}
          className={this.cx(getAlignRightClass(this.props, this.cx, this.styles), {
            [this.styles.root(this.theme)]: true,
            [this.styles.hasMargin(this.theme)]: hasMargin,
            [this.styles.mobileRoot(this.theme)]: isMobile,
            [this.styles.shadow(this.theme)]: !isMobile,
          })}
          style={this.getStyle(this.props)}
          id={this.props.id}
          onKeyDown={this.handleKeyDown}
          tabIndex={0}
        >
          {this.props.header && this.renderHeader()}
          <ScrollContainer
            ref={this.refScrollContainer}
            maxHeight={maxHeight}
            preventWindowScroll={preventWindowScroll}
            onScrollStateChangeY={this.handleScrollStateChange}
            disabled={this.props.disableScrollContainer}
            offsetY={offsetY}
          >
            <div
              className={this.cx({
                [this.styles.scrollContainer(this.theme)]: true,
                [this.styles.scrollContainerMobile(this.theme)]: isMobile,
              })}
              ref={this.contentRef}
            >
              <MenuContext.Provider
                value={{
                  navigation: this.menuNavigation,
                  onItemClick: this.props.onItemClick,
                  enableIconPadding: this.state.enableIconPadding,
                  setEnableIconPadding: this.setEnableIconPadding,
                }}
              >
                {this.props.children}
              </MenuContext.Provider>
            </div>
          </ScrollContainer>
          {this.props.footer && this.renderFooter()}
        </div>
      </CommonWrapper>
    );
  }

  private renderHeader = () => {
    return (
      <div
        className={this.cx({
          [this.styles.wrapper()]: true,
          [this.styles.headerWrapper()]: true,
        })}
        ref={(el) => {
          this.header = el;
        }}
      >
        <div className={this.styles.contentWrapper()}>{this.props.header}</div>
        <div className={this.styles.menuSeparatorWrapper(this.theme)}>
          {this.state.scrollState !== 'top' && this.renderMenuSeparatorWithNoMargin()}
        </div>
      </div>
    );
  };

  private renderFooter = () => {
    return (
      <div
        className={this.cx({
          [this.styles.wrapper()]: true,
          [this.styles.footerWrapper()]: true,
        })}
        ref={(el) => {
          this.footer = el;
        }}
      >
        <div className={this.styles.menuSeparatorWrapper(this.theme)}>
          {this.state.scrollState !== 'bottom' && this.renderMenuSeparatorWithNoMargin()}
        </div>
        <div className={this.styles.contentWrapper()}>{this.props.footer}</div>
      </div>
    );
  };

  private renderMenuSeparatorWithNoMargin = () => {
    return (
      <ThemeContext.Provider value={ThemeFactory.create({ menuSeparatorMarginY: '0' }, this.theme)}>
        <MenuSeparator />
      </ThemeContext.Provider>
    );
  };

  private setInitialSelection = () => {
    for (let i = this.getProps().initialSelectedItemIndex; i > -1; i--) {
      this.down();
    }
  };

  private shouldRecalculateMaxHeight = (prevProps: MenuProps): boolean => {
    const { header, footer, children } = this.props;
    const maxHeight = this.getProps().maxHeight;
    const prevMaxHeight = prevProps.maxHeight;
    const prevHeader = prevProps.header;
    const prevFooter = prevProps.footer;
    const prevChildrenCount = React.Children.count(prevProps.children);

    return (
      maxHeight !== prevMaxHeight ||
      footer !== prevFooter ||
      header !== prevHeader ||
      React.Children.count(children) !== prevChildrenCount
    );
  };

  private calculateMaxHeight = () => {
    const maxHeight = this.getProps().maxHeight;
    let parsedMaxHeight = maxHeight;
    const rootNode = getRootNode(this);

    if (typeof maxHeight === 'string' && isBrowser(this.globalObject) && rootNode) {
      const rootElementMaxHeight = this.globalObject.getComputedStyle?.(rootNode).maxHeight;

      if (rootElementMaxHeight) {
        parsedMaxHeight = parseFloat(rootElementMaxHeight);
      }
    }

    const calculatedMaxHeight =
      typeof parsedMaxHeight === 'number'
        ? parsedMaxHeight +
          ((this.header && getDOMRect(this.header).height) || 0) +
          ((this.footer && getDOMRect(this.footer).height) || 0)
        : maxHeight;

    this.setState({
      maxHeight: calculatedMaxHeight || 'none',
    });
  };

  private refScrollContainer = (scrollContainer: Nullable<ScrollContainer>) => {
    this.scrollContainer = scrollContainer;
  };

  private scrollToSelected = () => {
    const highlightedItem = this.menuNavigation.highlightedItem;
    if (this.scrollContainer && highlightedItem) {
      const rootNode = getRootNode(highlightedItem);
      // TODO: Remove this check once IF-647 is resolved
      if (isInstanceOf(rootNode, this.globalObject.HTMLElement)) {
        this.scrollContainer.scrollTo(rootNode);
      }
    }
  };

  private scrollToTop = () => {
    if (this.scrollContainer) {
      this.scrollContainer.scrollToTop();
    }
  };

  private scrollToBottom = () => {
    if (this.scrollContainer) {
      this.scrollContainer.scrollToBottom();
    }
  };

  private scroll = (nextIndex: number) => {
    switch (nextIndex) {
      case 0:
        this.scrollToTop?.();
        break;
      case this.menuNavigation.items.length - 1:
        this.scrollToBottom?.();
        break;
      default:
        this.scrollToSelected?.();
    }
  };

  private move(step: number) {
    if (this.unmounted) {
      // NOTE workaround, because `ComboBox` call `process.nextTick` in reducer
      return;
    }
    const nextIndex = this.menuNavigation.move(step, this.getProps().cyclicSelection);
    this.scroll(nextIndex);
  }

  private isEmpty() {
    const { children } = this.props;
    return !children || !childrenToArray(children).filter(isNonNullable).length;
  }

  private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event);
    }

    if (event.defaultPrevented) {
      return;
    }

    if (isKeyArrowUp(event)) {
      event.preventDefault();
      this.up();
    } else if (isKeyArrowDown(event)) {
      event.preventDefault();
      this.down();
    } else if (isKeyEnter(event)) {
      this.menuNavigation.select(event);
    }
  };

  private getStyle = (props: MenuProps): CSSProperties => {
    if (props.align === 'right') {
      return {
        maxWidth: props.width,
        minWidth: props.width,
        maxHeight: this.state.maxHeight,
      };
    }

    return {
      width: props.width,
      maxHeight: this.state.maxHeight,
    };
  };

  private handleScrollStateChange = (scrollState: ScrollContainerScrollStateY) => {
    if (this.state.scrollState !== scrollState) {
      this.setState({ scrollState });
    }
  };

  private setEnableIconPadding = (isIconPaddingEnabled: boolean) => {
    !this.getProps().preventIconsOffset && this.setState({ enableIconPadding: isIconPaddingEnabled });
  };
}

function childrenToArray(children: React.ReactNode): React.ReactNode[] {
  const ret: React.ReactNode[] = [];
  // Use forEach instead of map to avoid cloning for key unifying.
  React.Children.forEach(children, (child) => {
    ret.push(child);
  });
  return ret;
}

const getAlignRightClass = (props: MenuProps, cx: Emotion['cx'], styles: ReturnType<typeof getStyles>) => {
  if (props.align === 'right') {
    return cx(styles.alignRight());
  }

  return null;
};
