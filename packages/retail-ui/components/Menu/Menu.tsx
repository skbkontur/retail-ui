import cn from 'classnames';
import * as React from 'react';
import ReactDOM from 'react-dom';

import isActiveElement from './isActiveElement';
import ScrollContainer from '../ScrollContainer/ScrollContainer';

import MenuItem from '../MenuItem/MenuItem';

import styles from './Menu.less';

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
    preventWindowScroll: true
  };

  public state = {
    highlightedIndex: -1
  };

  private _scrollContainer: Nullable<ScrollContainer>;
  private _highlighted: Nullable<MenuItem>;

  public render() {
    const enableIconPadding = React.Children.toArray(this.props.children).some(
      x => typeof x === 'object' && x.props.icon
    );

    if (this._isEmpty()) {
      return null;
    }

    return (
      <div
        className={cn(styles.root, this.props.hasShadow && styles.shadow)}
        style={{ width: this.props.width, maxHeight: this.props.maxHeight }}
      >
        <ScrollContainer
          ref={this._refScrollContainer}
          maxHeight={this.props.maxHeight}
          preventWindowScroll={this.props.preventWindowScroll}
        >
          {React.Children.map(this.props.children, (child, index) => {
            if (typeof child === 'string' || typeof child === 'number') {
              return child;
            }
            if (typeof child.type === 'string') {
              return child;
            }
            const isMenuItem =
              child && (child.type as typeof MenuItem).__MENU_ITEM__;
            const isMenuHeader =
              child && (child.type as typeof MenuItem).__MENU_HEADER__;
            if (enableIconPadding && (isMenuItem || isMenuHeader)) {
              child = React.cloneElement(child, {
                _enableIconPadding: true
              });
            }
            if (isActiveElement(child)) {
              const highlight = this.state.highlightedIndex === index;

              let ref = child.ref;
              if (highlight) {
                ref = this._refHighlighted.bind(this, child.ref);
              }

              return React.cloneElement(child, {
                ref,
                state: highlight ? 'hover' : child.props.state,
                onClick: this._select.bind(this, index, false),
                onMouseEnter: this._highlightItem.bind(this, index),
                onMouseLeave: this._unhighlight
              });
            }
            return child;
          })}
        </ScrollContainer>
      </div>
    );
  }

  public up() {
    this._move(-1);
  }

  public down() {
    this._move(1);
  }

  public enter(event: React.SyntheticEvent<HTMLElement>) {
    return this._select(this.state.highlightedIndex, true, event);
  }

  public reset() {
    this.setState({ highlightedIndex: -1 });
  }

  private _refScrollContainer = (
    scrollContainer: Nullable<ScrollContainer>
  ) => {
    this._scrollContainer = scrollContainer;
  };

  private _refHighlighted(
    originalRef: (menuItem: MenuItem | null) => any,
    menuItem: MenuItem | null
  ) {
    this._highlighted = menuItem;

    if (originalRef) {
      originalRef(menuItem);
    }
  }

  private _scrollToSelected = () => {
    if (this._scrollContainer && this._highlighted) {
      this._scrollContainer.scrollTo(ReactDOM.findDOMNode(
        this._highlighted
      ) as HTMLElement);
    }
  };

  private _select(
    index: number,
    shouldHandleHref: boolean,
    event: React.SyntheticEvent<HTMLElement>
  ): boolean {
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

  private _highlightItem(index: number) {
    this.setState({ highlightedIndex: index });
  }

  private _unhighlight = () => {
    this.setState({ highlightedIndex: -1 });
  };

  private _move(step: number) {
    const children = childrenToArray(this.props.children);
    if (!children.some(isActiveElement)) {
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
        this.setState({ highlightedIndex: index }, this._scrollToSelected);
        return;
      }
    } while (index !== this.state.highlightedIndex);
  }

  private _isEmpty() {
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
