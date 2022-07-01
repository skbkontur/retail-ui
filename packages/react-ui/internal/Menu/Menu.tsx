import React, { CSSProperties, ReactNode } from 'react';

import { ScrollContainer } from '../../components/ScrollContainer';
import { isMenuItem, MenuItem } from '../../components/MenuItem';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { isIE11 } from '../../lib/client';

import { styles } from './Menu.styles';
import { isActiveElement } from './isActiveElement';
import { MenuContext } from './MenuContext';

const MAX_LEVEL_OF_DEEP_SEARCH = 5;

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
  highlightedIndex: number;
  enableIconPadding: boolean;
}

export const MenuDataTids = {
  root: 'Menu__root',
} as const;

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
    highlightedIndex: -1,
    enableIconPadding: false,
  };

  private theme!: Theme;
  private scrollContainer: Nullable<ScrollContainer>;
  private highlighted: Nullable<MenuItem>;
  private unmounted = false;
  private setRootNode!: TSetRootNode;
  private arrayOfMenuItems: React.ReactNode[] = [];

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

    return (
      <div
        data-tid={MenuDataTids.root}
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
            <MenuContext.Provider value={{ enableIconPadding: this.state.enableIconPadding }}>
              {this.renderChildren()}
            </MenuContext.Provider>
          </div>
        </ScrollContainer>
      </div>
    );
  }

  private renderChildren = () => {
    const updatedArrayOfMenuItems: React.ReactNode[] = [];
    const updatedChildren = this.deepSearch(this.props.children, MAX_LEVEL_OF_DEEP_SEARCH, updatedArrayOfMenuItems);

    this.arrayOfMenuItems = updatedArrayOfMenuItems;

    return updatedChildren;
  };

  private deepSearch: any = (
    currentLevelOfChildren: ReactNode,
    allowedLevelOfDeep: number,
    arrayOfMenuItems: ReactNode[],
  ) => {
    if (!allowedLevelOfDeep) {
      return currentLevelOfChildren;
    }
    return React.Children.map(currentLevelOfChildren, (child) => {
      if (!isMenuItem(child)) {
        const localChild = child as any;
        if (localChild?.props?.children) {
          return React.cloneElement(localChild, {
            children: this.deepSearch(localChild.props.children, allowedLevelOfDeep - 1, arrayOfMenuItems),
          });
        }

        return child;
      }

      if (child.props.icon && this.state.enableIconPadding !== true) {
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
    // TODO @Khlutkova rewrite with mergeRefs
    let ref = child.ref;
    if (highlight && typeof ref !== 'string') {
      ref = this.refHighlighted.bind(this, ref);
    }

    return React.cloneElement(child, {
      ref,
      state: highlight ? 'hover' : child.props.state,
      onClick: this.select.bind(this, index, false),
      onMouseEnter: this.highlight.bind(this, index),
      onMouseLeave: this.unhighlight,
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
    this.props.onItemClick?.();
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
