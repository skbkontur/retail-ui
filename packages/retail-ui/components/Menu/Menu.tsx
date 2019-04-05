import cn from 'classnames';
import * as React from 'react';
import ReactDOM from 'react-dom';

import isActiveElement from './isActiveElement';
import ScrollContainer from '../ScrollContainer/ScrollContainer';

import MenuItem, { MenuItemProps, isMenuItem } from '../MenuItem/MenuItem';
import { isMenuHeader } from '../MenuHeader/MenuHeader';

import styles from './Menu.less';
import { Nullable } from '../../typings/utility-types';

interface MenuProps {
  children: React.ReactNode;
  hasShadow?: boolean;
  maxHeight?: number | string;
  onItemClick?: () => void;
  width?: number | string;
  preventWindowScroll?: boolean;
}

interface MenuState {
  highlightedIndex: number;
}

export default class Menu extends React.Component<MenuProps, MenuState> {
  public static defaultProps = {
    width: 'auto',
    maxHeight: 300,
    hasShadow: true,
    preventWindowScroll: true,
  };

  public state = {
    highlightedIndex: -1,
  };

  private scrollContainer: Nullable<ScrollContainer>;
  private highlighted: Nullable<MenuItem>;

  private unmounted = false;

  public componentWillUnmount() {
    this.unmounted = true;
  }

  public render() {
    const enableIconPadding = React.Children.toArray(this.props.children).some(
      x => typeof x === 'object' && x.props.icon,
    );

    if (this.isEmpty()) {
      return null;
    }

    return (
      <div
        className={cn(styles.root, this.props.hasShadow && styles.shadow)}
        style={{ width: this.props.width, maxHeight: this.props.maxHeight }}
      >
        <ScrollContainer
          ref={this.refScrollContainer}
          maxHeight={this.props.maxHeight}
          preventWindowScroll={this.props.preventWindowScroll}
        >
          {React.Children.map(this.props.children, (child, index) => {
            if (!child) {
              return child;
            }
            if (typeof child === 'string' || typeof child === 'number') {
              return child;
            }

            if (enableIconPadding && (isMenuItem(child) || isMenuHeader(child))) {
              child = React.cloneElement(child, {
                _enableIconPadding: true,
              });
            }
            if (isActiveElement(child)) {
              const highlight = this.state.highlightedIndex === index;

              let ref = child.ref;
              if (highlight && typeof child.ref !== 'string') {
                ref = this.refHighlighted.bind(this, child.ref);
              }

              return React.cloneElement<MenuItemProps, MenuItem>(child, {
                ref,
                state: highlight ? 'hover' : child.props.state,
                onClick: this.select.bind(this, index, false),
                onMouseEnter: this.highlight.bind(this, index),
                onMouseLeave: this.unhighlight,
              });
            }
            return child;
          })}
        </ScrollContainer>
      </div>
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
      this.scrollContainer.scrollTo(ReactDOM.findDOMNode(this.highlighted) as HTMLElement);
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
    return !children || !childrenToArray(children).filter(isExist).length;
  }
}

function isExist(value: any): value is any {
  return value !== null && value !== undefined;
}

function childrenToArray(children: React.ReactNode): React.ReactChild[] {
  const ret: React.ReactChild[] = [];
  // Use forEach instead of map to avoid cloning for key unifying.
  React.Children.forEach(children, child => {
    ret.push(child);
  });
  return ret;
}
