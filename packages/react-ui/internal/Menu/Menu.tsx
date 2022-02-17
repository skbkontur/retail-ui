import React from 'react';

import { ScrollContainer } from '../../components/ScrollContainer';
import { MenuItem } from '../../components/MenuItem';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles } from './Menu.styles';
import { isActiveElement } from './isActiveElement';
import { MenuContext } from './MenuContext';

export interface MenuProps {
  children: React.ReactNode;
  hasShadow?: boolean;
  maxHeight?: number | string;
  onItemClick?: () => void;
  width?: number | string;
  preventWindowScroll?: boolean;
  /**
   * Отключение кастомного скролла контейнера
   */
  disableScrollContainer?: boolean;
}

export interface MenuState {
  highlightedKey: string | undefined;
  _enableIconPadding: boolean;
}

@rootNode
export class Menu extends React.Component<MenuProps, MenuState> {
  public static __KONTUR_REACT_UI__ = 'Menu';

  public static defaultProps = {
    width: 'auto',
    maxHeight: 300,
    hasShadow: true,
    preventWindowScroll: true,
  };

  public state = {
    highlightedKey: undefined,
    _enableIconPadding: false,
  };

  private theme!: Theme;
  private scrollContainer: Nullable<ScrollContainer>;
  private highlighted: Nullable<MenuItem>;
  // private _enableIconPadding: boolean | undefined;
  private setRootNode!: TSetRootNode;
  private menuItems: Array<{ key: string; item: MenuItem }> = [];

  public componentWillUnmount() {
    // this.unmounted = true;
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

  public getMenuItems = () => {
    return this.menuItems;
  };

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
    return this.state.highlightedKey && this.select(this.state.highlightedKey, true, event);
  }

  /**
   * @public
   */
  public reset() {
    this.setState({ highlightedKey: undefined });
  }

  /**
   * @public
   */
  public hasHighlightedItem() {
    return Boolean(this.state.highlightedKey);
  }

  public highlightItem(key: string) {
    this.highlight(key);
  }

  public highlightItemByIndex(index: number) {
    const items = this.menuItems;
    const item = items[index];
    if (!item) return;
    this.highlight((item as any)?.key);
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
        style={{ width: this.props.width, maxHeight: this.props.maxHeight }}
        ref={this.setRootNode}
      >
        <ScrollContainer
          ref={this.refScrollContainer}
          maxHeight={this.props.maxHeight}
          preventWindowScroll={this.props.preventWindowScroll}
          disabled={this.props.disableScrollContainer}
        >
          <div className={styles.scrollContainer(this.theme)}>
            <MenuContext.Provider
              value={{
                addMenuItem: this.addMenuItem,
                deleteMenuItem: this.deleteMenuItem,
                setHighlightedKey: this.highlight,
                highlightedKey: this.state.highlightedKey,
                _enableIconPadding: this.state._enableIconPadding,
                onClick: this.select.bind(this),
              }}
            >
              {this.props.children}
            </MenuContext.Provider>
          </div>
        </ScrollContainer>
      </div>
    );
  }

  private refScrollContainer = (scrollContainer: Nullable<ScrollContainer>) => {
    this.scrollContainer = scrollContainer;
  };

  private scrollToSelected = () => {
    if (this.scrollContainer && this.highlighted) {
      this.scrollContainer.scrollTo(getRootNode(this.highlighted));
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

  private select(key: string, shouldHandleHref: boolean, event: React.SyntheticEvent<HTMLElement>): boolean {
    const items: Array<{ key: string; item: MenuItem }> = this.menuItems;
    const selectedItem = items.find((item: { key: string; item: MenuItem }) => item.key === key)?.item as any;
    if (!selectedItem) {
      return false;
    }
    if (isActiveElement(selectedItem)) {
      if (shouldHandleHref && selectedItem.props.href) {
        if (selectedItem.props.target) {
          window.open(selectedItem.props.href, selectedItem.props.target);
        } else {
          location.href = selectedItem.props.href;
        }
      }
      if (selectedItem.props.onClick) {
        selectedItem.props.onClick(event);
      }
      if (this.props.onItemClick) {
        this.props.onItemClick();
      }
      return true;
    }
    return false;
  }

  private highlight = (key: string | undefined) => {
    this.setState({ highlightedKey: key });
  };

  // private unhighlight = () => {
  //   this.setState({ highlightedIndex: -1 });
  // };

  private move(step: number) {
    const menuItems = this.menuItems;
    if (!menuItems.length) {
      return;
    }

    let highlightedIndex = -1;
    if (this.state.highlightedKey) {
      highlightedIndex = this.menuItems.findIndex((item) => item.key === this.state.highlightedKey);
    }

    const newHighlightedIndex = highlightedIndex + step;
    if (newHighlightedIndex < 0) {
      this.setState({ highlightedKey: menuItems[menuItems.length - 1].key });
      this.scrollToBottom();
      return;
    }

    if (newHighlightedIndex >= menuItems.length) {
      this.setState({ highlightedKey: menuItems[0].key });
      this.scrollToTop();
      return;
    }

    this.setState({ highlightedKey: menuItems[newHighlightedIndex].key });

    switch (newHighlightedIndex) {
      case 0:
        this.scrollToTop();
        break;
      case menuItems.length - 1:
        this.scrollToBottom();
        break;
      default:
        this.scrollToSelected();
    }
  }

  private isEmpty() {
    const { children } = this.props;
    return !children || !childrenToArray(children).filter(isExist).length;
  }

  private addMenuItem = (key: string, item: MenuItem) => {
    item.props.icon && !this.state._enableIconPadding && this.setState({ _enableIconPadding: true });
    const items: Array<{ key: string; item: MenuItem }> = this.menuItems;
    items.push({ key, item });
    this.menuItems = items;
  };

  private deleteMenuItem = (key: string) => {
    const items: Array<{ key: string; item: MenuItem }> = this.menuItems;
    const newItems = items.filter((x) => x.key !== key);
    this.menuItems = newItems;
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
