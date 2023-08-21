import React, { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';

import { isKeyArrowDown, isKeyArrowUp, isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { MenuSeparator } from '../../components/MenuSeparator';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import { isHTMLElement } from '../../lib/SSRSafe';
import { responsiveLayout } from '../../components/ResponsiveLayout/decorator';
import { ScrollContainer, ScrollContainerScrollState } from '../../components/ScrollContainer';
import { isMenuItem, MenuItem } from '../../components/MenuItem';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { isIE11 } from '../../lib/client';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { mergeRefs } from '../../lib/utils';

import { styles } from './Menu.styles';
import { isActiveElement } from './isActiveElement';
import { MenuContext } from './MenuContext';

const MAX_LEVEL_OF_DEEP_SEARCH = 5;

export interface MenuProps extends Pick<HTMLAttributes<HTMLDivElement>, 'id'> {
  children: React.ReactNode;
  hasShadow?: boolean;
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
  highlightedIndex: number;
  maxHeight: number | string;
  scrollState: ScrollContainerScrollState;
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
    | 'maxHeight'
    | 'hasShadow'
    | 'preventWindowScroll'
    | 'cyclicSelection'
    | 'initialSelectedItemIndex'
  >
>;

@responsiveLayout
@rootNode
export class Menu extends React.PureComponent<MenuProps, MenuState> {
  public static __KONTUR_REACT_UI__ = 'Menu';

  public static defaultProps: DefaultProps = {
    align: 'left',
    width: 'auto',
    maxHeight: 300,
    hasShadow: true,
    preventWindowScroll: true,
    cyclicSelection: true,
    initialSelectedItemIndex: -1,
  };

  private getProps = createPropsGetter(Menu.defaultProps);

  public state: MenuState = {
    highlightedIndex: -1,
    maxHeight: this.getProps().maxHeight || 'none',
    scrollState: 'top',
    enableIconPadding: false,
  };

  private theme!: Theme;
  private scrollContainer: Nullable<ScrollContainer>;
  private isMobileLayout!: boolean;
  private highlighted: Nullable<MenuItem>;
  private unmounted = false;
  private setRootNode!: TSetRootNode;
  private header: Nullable<HTMLDivElement>;
  private footer: Nullable<HTMLDivElement>;
  private arrayOfMenuItems: React.ReactNode[] = [];

  public componentWillUnmount() {
    this.unmounted = true;
  }

  public componentDidMount() {
    this.setInitialSelection();
    this.calculateMaxHeight();
  }

  public componentDidUpdate(prevProps: MenuProps) {
    if (this.shouldRecalculateMaxHeight(prevProps)) {
      this.calculateMaxHeight();
    }

    if (prevProps.maxHeight !== this.getProps().maxHeight) {
      this.setState({
        maxHeight: this.props.maxHeight || 'none',
      });
    }
  }

  public focus() {
    this.focusOnRootElement();
  }

  private focusOnRootElement = (): void => {
    const rootNode = getRootNode(this);
    if (isHTMLElement(rootNode)) {
      rootNode?.focus();
    }
  };

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
    return this.select(this.state.highlightedIndex, true, event);
  }

  /**
   * @public
   */
  public reset() {
    this.setState({ highlightedIndex: -1 });
  }

  /**
   * @public
   */
  public hasHighlightedItem() {
    return this.state.highlightedIndex !== -1;
  }

  public highlightItem(index: number) {
    this.highlight(index);
  }

  private renderMain() {
    if (!this.props.children) {
      return null;
    }
    const { hasShadow, maxHeight, preventWindowScroll } = this.getProps();

    const offsetY = isTheme2022(this.theme)
      ? {
          top: `${this.theme.scrollContainerScrollBarOffsetY}`,
          right: 0,
          bottom: `${this.theme.scrollContainerScrollBarOffsetY}`,
        }
      : {};

    const isMobile = this.isMobileLayout;
    return (
      <div
        data-tid={MenuDataTids.root}
        className={cx(getAlignRightClass(this.props), {
          [styles.root(this.theme)]: true,
          [styles.mobileRoot(this.theme)]: isMobile,
          [styles.shadow(this.theme)]: hasShadow && !isMobile,
        })}
        style={this.getStyle(this.props)}
        id={this.props.id}
        onKeyDown={this.handleKeyDown}
        ref={this.setRootNode}
        tabIndex={0}
      >
        {this.props.header && this.renderHeader()}
        <ScrollContainer
          ref={this.refScrollContainer}
          maxHeight={maxHeight}
          preventWindowScroll={preventWindowScroll}
          onScrollStateChange={this.handleScrollStateChange}
          disabled={this.props.disableScrollContainer}
          offsetY={offsetY}
        >
          <div
            className={cx({
              [styles.scrollContainer(this.theme)]: true,
              [styles.scrollContainerMobile(this.theme)]: isMobile,
            })}
          >
            <MenuContext.Provider value={{ enableIconPadding: this.state.enableIconPadding }}>
              {this.renderChildren()}
            </MenuContext.Provider>
          </div>
        </ScrollContainer>
        {this.props.footer && this.renderFooter()}
      </div>
    );
  }

  private renderHeader = () => {
    return (
      <div
        className={cx({
          [styles.wrapper()]: true,
          [styles.headerWrapper()]: true,
        })}
        ref={(el) => (this.header = el)}
      >
        <div className={styles.contentWrapper()}>{this.props.header}</div>
        <div className={styles.menuSeparatorWrapper(this.theme)}>
          {this.state.scrollState !== 'top' && this.renderMenuSeparatorWithNoMargin()}
        </div>
      </div>
    );
  };

  private renderFooter = () => {
    return (
      <div
        className={cx({
          [styles.wrapper()]: true,
          [styles.footerWrapper()]: true,
        })}
        ref={(el) => (this.footer = el)}
      >
        <div className={styles.menuSeparatorWrapper(this.theme)}>
          {this.state.scrollState !== 'bottom' && this.renderMenuSeparatorWithNoMargin()}
        </div>
        <div className={styles.contentWrapper()}>{this.props.footer}</div>
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

  private renderChildren = () => {
    const updatedArrayOfMenuItems: React.ReactNode[] = [];
    const updatedChildren = this.deepSearch(this.props.children, MAX_LEVEL_OF_DEEP_SEARCH, updatedArrayOfMenuItems);

    this.arrayOfMenuItems = updatedArrayOfMenuItems;

    return updatedChildren;
  };

  private deepSearch: (
    currentLevelOfChildren: ReactNode,
    allowedLevelOfDeep: number,
    arrayOfMenuItems: ReactNode[],
  ) => ReactNode = (currentLevelOfChildren, allowedLevelOfDeep, arrayOfMenuItems) => {
    if (!allowedLevelOfDeep) {
      return currentLevelOfChildren;
    }
    return React.Children.map(currentLevelOfChildren, (child) => {
      if (!isMenuItem(child)) {
        const localChild = child as ReactElement;
        if (localChild?.props?.children) {
          return React.cloneElement(localChild, {
            children: this.deepSearch(localChild.props.children, allowedLevelOfDeep - 1, arrayOfMenuItems),
          });
        }
        return child;
      }

      if (child.props.icon && !this.state.enableIconPadding) {
        this.setState({ enableIconPadding: true });
      }

      if (!isActiveElement(child)) {
        return child;
      }

      arrayOfMenuItems.push(child);

      const indexOfCurrentMenuItem = arrayOfMenuItems.indexOf(child);

      const highlight = this.state.highlightedIndex === indexOfCurrentMenuItem;

      return this.addPropsToMenuItem(child, indexOfCurrentMenuItem, highlight);
    });
  };

  private addPropsToMenuItem = (menuItem: ReactNode, index: number, highlight: boolean) => {
    const child = menuItem as any;
    let ref = child?.ref;
    if (highlight && typeof ref !== 'string') {
      ref = mergeRefs([ref, this.refHighlighted.bind(this, ref)]);
    }

    return React.cloneElement(child, {
      ref,
      state: highlight ? 'hover' : child.props.state,
      onClick: this.select.bind(this, index, false),
      onMouseEnter: this.highlight.bind(this, index),
      onMouseLeave: this.unhighlight,
    });
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

    if (typeof maxHeight === 'string' && typeof window !== 'undefined' && rootNode) {
      const rootElementMaxHeight = window.getComputedStyle(rootNode).maxHeight;

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

  private refHighlighted(
    originalRef: ((menuItem: MenuItem | null) => any) | React.RefObject<MenuItem> | null | undefined,
    menuItem: MenuItem | null,
  ) {
    this.highlighted = menuItem;

    if (typeof originalRef === 'function') {
      originalRef(menuItem);
    }
  }

  private scrollToSelected = () => {
    if (this.scrollContainer && this.highlighted) {
      const rootNode = getRootNode(this.highlighted);
      // TODO: Remove this check once IF-647 is resolved
      if (rootNode instanceof HTMLElement) {
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

  private select(index: number, shouldHandleHref: boolean, event: React.SyntheticEvent<HTMLElement>): boolean {
    const item = this.arrayOfMenuItems[index];
    if (!isActiveElement(item)) {
      return false;
    }
    if (shouldHandleHref && item.props.href) {
      if (item.props.target) {
        window.open(item.props.href, item.props.target);
      } else {
        location.href = item.props.href;
      }
    }
    item.props.onClick?.(event);
    this.props.onItemClick?.(event);
    return true;
  }

  private highlight = (index: number) => {
    this.setState({ highlightedIndex: index });
  };

  private unhighlight = () => {
    this.setState({ highlightedIndex: -1 });
  };

  private move(step: number) {
    if (this.unmounted) {
      // NOTE workaround, because `ComboBox` call `process.nextTick` in reducer
      return;
    }

    let index = this.state.highlightedIndex + step;
    if (index < 0) {
      index = this.arrayOfMenuItems.length - 1;
    } else if (index >= this.arrayOfMenuItems.length) {
      index = 0;
    }
    this.setState({ highlightedIndex: index }, () => {
      switch (index) {
        case 0:
          this.scrollToTop();
          break;
        case this.arrayOfMenuItems.length - 1:
          this.scrollToBottom();
          break;
        default:
          this.scrollToSelected();
      }
    });
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
      if (this.highlighted && this.highlighted.props.onClick) {
        this.highlighted.props.onClick(event);
      }
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

  private handleScrollStateChange = (scrollState: ScrollContainerScrollState) => {
    if (this.state.scrollState !== scrollState) {
      this.setState({ scrollState });
    }
  };
}

const getAlignRightClass = (props: MenuProps) => {
  if (props.align === 'right') {
    return cx({
      [styles.alignRight()]: !isIE11,
      [styles.alignRightIE11()]: isIE11,
      [styles.alignRightIE11FixAutoWidth()]: isIE11 && props.width === 'auto',
    });
  }

  return null;
};
