import React, { CSSProperties } from 'react';

import { isNonNullable } from '../../lib/utils';
import { ScrollContainer } from '../../components/ScrollContainer';
import { MenuItem, MenuItemProps } from '../../components/MenuItem';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { addIconPaddingIfPartOfMenu } from '../InternalMenu/addIconPaddingIfPartOfMenu';
import { isIE11 } from '../../lib/client';

import { styles } from './Menu.styles';
import { isActiveElement } from './isActiveElement';

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
    highlightedIndex: -1,
  };

  private theme!: Theme;
  private scrollContainer: Nullable<ScrollContainer>;
  private highlighted: Nullable<MenuItem>;
  private unmounted = false;
  private setRootNode!: TSetRootNode;

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
          <div className={styles.scrollContainer(this.theme)}>{this.getChildList()}</div>
        </ScrollContainer>
      </div>
    );
  }

  private getChildList = () => {
    const enableIconPadding = React.Children.toArray(this.props.children).some(
      (x) => React.isValidElement(x) && x.props.icon,
    );

    return React.Children.map(this.props.children, (child, index) => {
      if (!child) {
        return child;
      }

      if (typeof child === 'string' || typeof child === 'number') {
        return child;
      }

      const modifiedChild = addIconPaddingIfPartOfMenu(child, enableIconPadding);

      if (isActiveElement(modifiedChild)) {
        const highlight = this.state.highlightedIndex === index;

        let ref = modifiedChild.ref;
        if (highlight && typeof modifiedChild.ref !== 'string') {
          ref = this.refHighlighted.bind(this, modifiedChild.ref);
        }

        return React.cloneElement<MenuItemProps, MenuItem>(modifiedChild, {
          ref,
          state: highlight ? 'hover' : modifiedChild.props.state,
          onClick: this.select.bind(this, index, false),
          onMouseEnter: this.highlight.bind(this, index),
          onMouseLeave: this.unhighlight,
        });
      }

      return modifiedChild;
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
    const item = childrenToArray(this.props.children)[index];
    if (isActiveElement(item)) {
      if (shouldHandleHref && item.props.href) {
        if (item.props.target) {
          window.open(item.props.href, item.props.target);
        } else {
          location.href = item.props.href;
        }
      }
      if (item.props.onClick) {
        item.props.onClick(event);
      }
      if (this.props.onItemClick) {
        this.props.onItemClick();
      }
      return true;
    }
    return false;
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

    const children = childrenToArray(this.props.children);
    const activeElements = children.filter(isActiveElement);
    if (!activeElements.length) {
      return;
    }
    let index = this.state.highlightedIndex;
    do {
      index += step;
      if (index < 0) {
        index = children.length - 1;
      } else if (index > children.length) {
        index = 0;
      }

      const child = children[index];
      if (isActiveElement(child)) {
        this.setState({ highlightedIndex: index }, () => {
          switch (activeElements.indexOf(child)) {
            case 0:
              this.scrollToTop();
              break;
            case activeElements.length - 1:
              this.scrollToBottom();
              break;
            default:
              this.scrollToSelected();
          }
        });
        return;
      }
    } while (index !== this.state.highlightedIndex);
  }

  private isEmpty() {
    const { children } = this.props;
    return !children || !childrenToArray(children).filter(isNonNullable).length;
  }
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
