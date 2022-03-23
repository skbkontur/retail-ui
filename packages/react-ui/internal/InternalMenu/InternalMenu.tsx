import React from 'react';

import { isKeyArrowDown, isKeyArrowUp, isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { ScrollContainer, ScrollContainerScrollState } from '../../components/ScrollContainer';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { MenuContext, MenuContextType, MenuItemContextType } from '../Menu/MenuContext';

import { styles } from './InternalMenu.styles';
import { isActiveElement } from './isActiveElement';

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
  highlightedKey?: MenuItemContextType['key'];
  enableIconPadding?: MenuContextType['enableIconPadding'];
  maxHeight: number | string;
  scrollState: ScrollContainerScrollState;
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
    maxHeight: this.props.maxHeight || 'none',
    scrollState: 'top',
  };

  private theme!: Theme;
  private scrollContainer: Nullable<ScrollContainer>;
  private setRootNode!: TSetRootNode;
  private header: Nullable<HTMLDivElement>;
  private footer: Nullable<HTMLDivElement>;
  private getProps = createPropsGetter(InternalMenu.defaultProps);
  private menuItems: MenuItemContextType[] = [];

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
    if (this.isEmpty()) {
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
          <MenuContext.Provider
            value={{
              addMenuItem: this.addMenuItem,
              deleteMenuItem: this.deleteMenuItem,
              setHighlightedKey: this.highlight,
              highlightedKey: this.state.highlightedKey,
              enableIconPadding: this.state.enableIconPadding,
              onClick: this.select.bind(this),
            }}
          >
            {this.props.children}
          </MenuContext.Provider>
        </ScrollContainer>
        {this.props.footer ? this.renderFooter() : null}
      </div>
    );
  }

  private addMenuItem = (newItem: MenuItemContextType) => {
    if (newItem.item.props.icon && !this.state.enableIconPadding) {
      this.setState({ enableIconPadding: true });
    }
    this.menuItems.push(newItem);
  };

  private deleteMenuItem = (key: MenuItemContextType['key']) => {
    const index = this.menuItems.findIndex((x: MenuItemContextType) => x.key === key);
    if (index >= 0) {
      this.menuItems.splice(index, 1);
    }
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
          ((this.header && this.header.getBoundingClientRect().height) || 0) +
          ((this.footer && this.footer.getBoundingClientRect().height) || 0)
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

  private select(key: string, shouldHandleHref: boolean, event: React.SyntheticEvent<HTMLElement>): boolean {
    const selectedItem = this.menuItems.find((item: MenuItemContextType) => item.key === key)?.item as any;
    if (!selectedItem || !isActiveElement(selectedItem)) {
      return false;
    }

    if (shouldHandleHref && selectedItem.props.href) {
      if (selectedItem.props.target) {
        window.open(selectedItem.props.href, selectedItem.props.target);
      } else {
        location.href = selectedItem.props.href;
      }
    }

    selectedItem.props.onClick?.(event);
    this.props.onItemClick?.(event);
    return true;
  }

  private highlight = (key?: MenuItemContextType['key']) => {
    this.setState({ highlightedKey: key });
    getRootNode(this)?.focus();
  };

  private move(step: number) {
    if (!this.menuItems.length) {
      return;
    }

    let highlightedIndex = -1;
    if (this.state.highlightedKey) {
      highlightedIndex = this.menuItems.findIndex((item) => item.key === this.state.highlightedKey);
    }

    const newHighlightedIndex = highlightedIndex + step;

    if (newHighlightedIndex < 0) {
      this.setState({ highlightedKey: this.menuItems[this.menuItems.length - 1].key });
      this.scrollToBottom();
      return;
    }

    if (newHighlightedIndex >= this.menuItems.length) {
      this.setState({ highlightedKey: this.menuItems[0].key });
      this.scrollToTop();
      return;
    }

    this.setState({ highlightedKey: this.menuItems[newHighlightedIndex].key });

    switch (newHighlightedIndex) {
      case 0:
        this.scrollToTop();
        break;
      case this.menuItems.length - 1:
        this.scrollToBottom();
        break;
      default:
        this.scrollToSelected();
    }
  }

  private scrollToSelected = () => {
    const highlighted = this.menuItems.find(
      (item: MenuItemContextType) => item.key === this.state.highlightedKey,
    )?.item;
    if (this.scrollContainer && highlighted) {
      this.scrollContainer.scrollTo(getRootNode(highlighted));
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

  private moveUp = () => {
    this.move(-1);
  };

  private moveDown = () => {
    this.move(1);
  };

  private isEmpty() {
    const { children } = this.props;
    return !children || !childrenToArray(children).filter(isExist).length;
  }

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
      const highlighted = this.menuItems.find(
        (item: MenuItemContextType) => item.key === this.state.highlightedKey,
      )?.item;
      if (highlighted) {
        highlighted.props.onClick?.(e);
      }
    }
  };

  private handleScrollStateChange = (scrollState: ScrollContainerScrollState) => {
    if (this.state.scrollState !== scrollState) {
      this.setState({ scrollState });
    }
  };
}

function isExist(value: any): value is any {
  return value !== null && value !== undefined;
}

function childrenToArray(children: React.ReactNode): React.ReactNode[] {
  const ret: React.ReactNode[] = [];
  // Use forEach instead of map to avoid cloning for key unifying.
  React.Children.forEach(children, (child) => {
    ret.push(child);
  });
  return ret;
}
