import React, { CSSProperties } from 'react';

import { ScrollContainer } from '../../components/ScrollContainer';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { isIE11 } from '../../lib/client';

import { styles } from './Menu.styles';
import { isActiveElement } from './isActiveElement';
import { MenuContext, MenuContextType, MenuItemContextType } from './MenuContext';

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
  align?: 'left' | 'right';
}

export interface MenuState {
  highlightedKey?: MenuContextType['highlightedKey'];
  enableIconPadding?: MenuContextType['enableIconPadding'];
}

@rootNode
export class Menu extends React.Component<MenuProps, MenuState> {
  public static __KONTUR_REACT_UI__ = 'Menu';

  public static defaultProps = {
    align: 'left',
    width: 'auto',
    maxHeight: 300,
    hasShadow: true,
    preventWindowScroll: true,
  };

  public state = {
    highlightedKey: undefined,
    enableIconPadding: false,
  };

  private theme!: Theme;
  private scrollContainer: Nullable<ScrollContainer>;
  private unmounted = false;
  private setRootNode!: TSetRootNode;
  private menuItems: MenuItemContextType[] = [];

  public componentWillUnmount() {
    this.unmounted = true;
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
    if (this.state.highlightedKey) {
      return this.select(this.state.highlightedKey, true, event);
    }
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
    return Boolean(this.state.highlightedKey !== undefined);
  }

  public highlightItem(key: string) {
    this.highlight(key);
  }

  public highlightItemByIndex(index: number) {
    const item = this.menuItems[index];
    if (item) {
      this.highlight(item.key);
    }
  }

  private renderMain() {
    if (this.isEmpty()) {
      return null;
    }

    return (
      <div
        className={cx(getAlignRightClass(this.props), {
          [styles.root(this.theme)]: true,
          [styles.shadow(this.theme)]: this.props.hasShadow,
        })}
        style={getStyle(this.props)}
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
                enableIconPadding: this.state.enableIconPadding,
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
    this.props.onItemClick?.();
    return true;
  }

  private highlight = (key?: MenuItemContextType['key']) => {
    this.setState({ highlightedKey: key });
  };

  private move(step: number) {
    if (this.unmounted) {
      // NOTE workaround, because `ComboBox` call `process.nextTick` in reducer
      return;
    }

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

  private isEmpty() {
    const { children } = this.props;
    return !children || !childrenToArray(children).filter(isExist).length;
  }

  private addMenuItem = (newItem: MenuItemContextType) => {
    if (newItem.item.props.icon && !this.state.enableIconPadding) {
      this.setState({ enableIconPadding: true });
    }
    this.menuItems.push(newItem);
  };

  private deleteMenuItem = (key: MenuItemContextType['key']) => {
    const index = this.menuItems.findIndex((x) => x.key === key);
    if (index >= 0) {
      this.menuItems.splice(index, 1);
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

const getStyle = (props: MenuProps): CSSProperties => {
  if (props.align === 'right') {
    return {
      maxWidth: props.width,
      minWidth: props.width,
      maxHeight: props.maxHeight,
    };
  }

  return {
    width: props.width,
    maxHeight: props.maxHeight,
  };
};

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
