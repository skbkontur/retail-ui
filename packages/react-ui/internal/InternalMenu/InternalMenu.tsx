import React from 'react';

import { isKeyArrowDown, isKeyArrowUp, isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { ScrollContainer, ScrollContainerScrollState } from '../../components/ScrollContainer';
import { isMenuItem, MenuItem, MenuItemProps } from '../../components/MenuItem';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import { MenuContext } from '../Menu/MenuContext';

import { styles } from './InternalMenu.styles';
import { isActiveElement } from './isActiveElement';

const MAX_LEVEL_OF_DEEP_SEARCH = 5;

interface MenuProps {
  children?: React.ReactNode;
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
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;

  header?: React.ReactNode;
  footer?: React.ReactNode;

  // Циклический перебор айтемов меню (по-дефолтну включен)
  cyclicSelection?: boolean;
  initialSelectedItemIndex?: number;
}

interface MenuState {
  highlightedIndex: number;
  maxHeight: number | string;
  scrollState: ScrollContainerScrollState;
  enableIconPadding: boolean;
}

@rootNode
export class InternalMenu extends React.PureComponent<MenuProps, MenuState> {
  public static __KONTUR_REACT_UI__ = 'InternalMenu';

  public static defaultProps = {
    width: 'auto',
    maxHeight: 300,
    hasShadow: true,
    preventWindowScroll: true,
    cyclicSelection: true,
    initialSelectedItemIndex: -1,
  };

  public state: MenuState = {
    highlightedIndex: -1,
    maxHeight: this.props.maxHeight || 'none',
    scrollState: 'top',
    enableIconPadding: false,
  };

  private theme!: Theme;
  private scrollContainer: Nullable<ScrollContainer>;
  private highlighted: Nullable<MenuItem>;
  private setRootNode!: TSetRootNode;
  private header: Nullable<HTMLDivElement>;
  private footer: Nullable<HTMLDivElement>;
  private getProps = createPropsGetter(InternalMenu.defaultProps);
  private arrayOfMenuItems: React.ReactNode[] = [];

  public componentDidMount() {
    this.setInitialSelection();
    this.calculateMaxHeight();
  }

  public componentDidUpdate(prevProps: MenuProps) {
    if (this.shouldRecalculateMaxHeight(prevProps)) {
      this.calculateMaxHeight();
    }

    if (prevProps.maxHeight !== this.props.maxHeight) {
      this.setState({
        maxHeight: this.props.maxHeight || 'none',
      });
    }
  }

  public focus() {
    this.focusOnRootElement();
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

  private renderMain() {
    if (!this.props.children) {
      return null;
    }

    return (
      <div
        className={cx({
          [styles.root(this.theme)]: true,
          [styles.shadow(this.theme)]: this.props.hasShadow,
        })}
        style={{
          width: this.props.width,
          maxHeight: this.state.maxHeight,
        }}
        onKeyDown={this.handleKeyDown}
        ref={this.setRootNode}
        tabIndex={0}
      >
        {this.props.header ? this.renderHeader() : null}
        <ScrollContainer
          ref={this.refScrollContainer}
          maxHeight={this.props.maxHeight}
          preventWindowScroll={this.props.preventWindowScroll}
          onScrollStateChange={this.handleScrollStateChange}
        >
          <MenuContext.Provider value={{ enableIconPadding: this.state.enableIconPadding }}>
            {this.renderChildren()}
          </MenuContext.Provider>
        </ScrollContainer>
        {this.props.footer ? this.renderFooter() : null}
      </div>
    );
  }

  private renderChildren = () => {
    const updatedArrayOfMenuItems: any[] = [];
    const updatedChildren = this.deepSearch(this.props.children, MAX_LEVEL_OF_DEEP_SEARCH, updatedArrayOfMenuItems);

    this.arrayOfMenuItems = updatedArrayOfMenuItems;

    return updatedChildren;
  };

  private deepSearch: any = (currentLevelOfChildren: any, allowedLevelOfDeep: number, arrayOfMenuItems: any) => {
    if (!allowedLevelOfDeep) {
      return currentLevelOfChildren;
    }
    return React.Children.map(currentLevelOfChildren, (child) => {
      if (!isMenuItem(child)) {
        if (child?.props?.children) {
          return React.cloneElement(child, {
            children: this.deepSearch(child.props.children, allowedLevelOfDeep - 1, arrayOfMenuItems),
          });
        }

        return child;
      }

      this.updateEnableIconPadding(child);

      if (!isActiveElement(child)) {
        return child;
      }

      arrayOfMenuItems.push(child);

      const indexOfCurrentMenuItem = arrayOfMenuItems.indexOf(child);

      const highlight = this.state.highlightedIndex === indexOfCurrentMenuItem;

      return this.addPropsToMenuItem(child, indexOfCurrentMenuItem, highlight);
    });
  };

  private updateEnableIconPadding = (child: any) => {
    if (child.props.icon && this.state.enableIconPadding !== true) {
      this.setState({ enableIconPadding: true });
    }
  };

  private addPropsToMenuItem = (menuItem: any, index: number, highlight: boolean) => {
    // TODO @Khlutkova rewrite with mergeRefs
    let ref = menuItem.ref;
    if (highlight && typeof menuItem.ref !== 'string') {
      ref = this.refHighlighted.bind(this, menuItem.ref);
    }

    return React.cloneElement<MenuItemProps, MenuItem>(menuItem, {
      ref,
      state: highlight ? 'hover' : menuItem.props.state,
      onClick: this.select.bind(this, index, false),
      onMouseEnter: (event) => {
        this.highlightItem(index);
        if (isMenuItem(menuItem) && menuItem.props.onMouseEnter) {
          menuItem.props.onMouseEnter(event);
        }
      },
      onMouseLeave: (event) => {
        this.unhighlight();
        if (isMenuItem(menuItem) && menuItem.props.onMouseLeave) {
          menuItem.props.onMouseLeave(event);
        }
      },
    });
  };

  private renderHeader = () => {
    return (
      <div
        ref={(el) => (this.header = el)}
        className={cx({
          [styles.header()]: true,
          [styles.fixedHeader()]: this.state.scrollState !== 'top',
        })}
      >
        {this.props.header}
      </div>
    );
  };

  private renderFooter = () => {
    return (
      <div
        ref={(el) => (this.footer = el)}
        className={cx({
          [styles.footer()]: true,
          [styles.fixedFooter()]: this.state.scrollState !== 'bottom',
        })}
      >
        {this.props.footer}
      </div>
    );
  };

  private focusOnRootElement = (): void => {
    getRootNode(this)?.focus();
  };

  private shouldRecalculateMaxHeight = (prevProps: MenuProps): boolean => {
    const { maxHeight, header, footer, children } = this.props;
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
    const { maxHeight } = this.props;
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

  private setInitialSelection = () => {
    for (let i = this.getProps().initialSelectedItemIndex; i > -1; i--) {
      this.moveDown();
    }
  };

  private refScrollContainer = (scrollContainer: Nullable<ScrollContainer>) => {
    this.scrollContainer = scrollContainer;
  };

  private refHighlighted(
    originalRef: string | ((instance: MenuItem | null) => void) | React.RefObject<MenuItem> | null | undefined,
    menuItem: MenuItem | null,
  ) {
    this.highlighted = menuItem;

    // TODO @Khlutkova rewrite with mergeRefs
    if (!originalRef || typeof originalRef === 'string') {
      return;
    }

    if (typeof originalRef === 'function') {
      originalRef(menuItem);
    } else if (typeof originalRef === 'object') {
      // @ts-ignore see issue https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
      originalRef.current = menuItem;
    }
  }

  private scrollToSelected = () => {
    if (this.scrollContainer && this.highlighted) {
      this.scrollContainer.scrollTo(getRootNode(this.highlighted));
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
    item.props.onClick?.(event as React.MouseEvent<HTMLElement>);
    this.props.onItemClick?.(event);
    return true;
  }

  private highlightItem = (index: number): void => {
    this.setState({ highlightedIndex: index });
    getRootNode(this)?.focus();
  };

  private unhighlight = () => {
    this.setState({ highlightedIndex: -1 });
  };

  private move(step: number) {
    let index = this.state.highlightedIndex + step;
    if (index < 0) {
      index = this.arrayOfMenuItems.length - 1;
    } else if (index > this.arrayOfMenuItems.length) {
      index = 0;
    }
    this.setState({ highlightedIndex: index }, () => {
      this.scrollToSelected();
    });
  }

  private moveUp = () => {
    this.move(-1);
  };

  private moveDown = () => {
    this.move(1);
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(e);
    }

    if (e.defaultPrevented) {
      return;
    }

    if (isKeyArrowUp(e)) {
      e.preventDefault();
      this.moveUp();
    } else if (isKeyArrowDown(e)) {
      e.preventDefault();
      this.moveDown();
    } else if (isKeyEnter(e)) {
      if (this.highlighted && this.highlighted.props.onClick) {
        this.highlighted.props.onClick(e);
      }
    }
  };

  private handleScrollStateChange = (scrollState: ScrollContainerScrollState) => {
    if (this.state.scrollState !== scrollState) {
      this.setState({ scrollState });
    }
  };
}
