import cn from 'classnames';
import * as React from 'react';
import ReactDOM from 'react-dom';

import isActiveElement from './isActiveElement';
import ScrollContainer from '../../ScrollContainer/ScrollContainer';

import MenuItem, { MenuItemProps } from '../../MenuItem';

import styles from './InternalMenu.less';
import { createPropsGetter } from '../createPropsGetter';
import { Nullable } from '../../../typings/utility-types';

interface MenuProps {
  children?: React.ReactNode;
  hasShadow?: boolean;
  maxHeight?: number | string;
  onItemClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
  width?: number | string;
  preventWindowScroll?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;

  // Циклический перебор айтемов меню (по-дефолтну включен)
  cyclicSelection?: boolean;
  initialSelectedItemIndex?: number;
}

interface MenuState {
  highlightedIndex: number;
}

export default class InternalMenu extends React.Component<
  MenuProps,
  MenuState
> {
  public static defaultProps = {
    width: 'auto',
    maxHeight: 300,
    hasShadow: true,
    preventWindowScroll: true,
    cyclicSelection: true,
    initialSelectedItemIndex: -1
  };

  public state = {
    highlightedIndex: -1
  };

  private _scrollContainer: Nullable<ScrollContainer>;
  private _highlighted: Nullable<MenuItem>;
  private _rootElement: Nullable<HTMLDivElement>;

  private getProps = createPropsGetter(InternalMenu.defaultProps);

  public componentDidMount() {
    this._focusWithScrollRestore();
    this._setInitialSelection();
  }

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
        onKeyDown={this._handleKeyDown}
        ref={element => {
          this._rootElement = element;
        }}
        tabIndex={0}
      >
        <ScrollContainer
          ref={this._refScrollContainer}
          maxHeight={this.props.maxHeight}
          preventWindowScroll={this.props.preventWindowScroll}
        >
          {React.Children.map(this.props.children, (child, index) => {
            if (
              typeof child === 'string' ||
              typeof child === 'number' ||
              child == null
            ) {
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

              return React.cloneElement<MenuItemProps, MenuItem>(child, {
                ref,
                state: highlight ? 'hover' : child.props.state,
                onClick: this._select.bind(this, index, false),
                onMouseEnter: () => this._highlightItem(index),
                onMouseLeave: this._unhighlight
              });
            }

            return child;
          })}
        </ScrollContainer>
      </div>
    );
  }

  private _focusWithScrollRestore = (): void => {
    if (this._rootElement && window) {
      const scrollX: number = window.scrollX || window.pageXOffset;
      const scrollY: number = window.scrollY || window.pageYOffset;

      this._rootElement.focus();
      window.scrollTo(scrollX, scrollY);
    }
  };

  private _setInitialSelection = () => {
    for (let i = this.getProps().initialSelectedItemIndex; i > -1; i--) {
      this._moveDown();
    }
  };

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
        item.props.onClick(event as React.MouseEvent<HTMLElement>);
      }
      if (this.props.onItemClick) {
        this.props.onItemClick(event);
      }
      return true;
    }
    return false;
  }

  private _highlightItem = (index: number): void => {
    this.setState({ highlightedIndex: index });
    if (this._rootElement) {
      this._rootElement.focus();
    }
  };

  private _unhighlight = () => {
    this.setState({ highlightedIndex: -1 });
  };

  private _move(step: number) {
    this.setState((state, props) => {
      const children = childrenToArray(props.children);
      if (!children.some(isActiveElement)) {
        return null;
      }
      let index = state.highlightedIndex;
      do {
        index += step;
        if (!props.cyclicSelection && (index < 0 || index > children.length)) {
          return null;
        }

        if (index < 0) {
          index = children.length - 1;
        } else if (index > children.length) {
          index = 0;
        }

        const child = children[index];
        if (isActiveElement(child)) {
          return { highlightedIndex: index };
        }
      } while (index !== state.highlightedIndex);
      return null;
    }, this._scrollToSelected);
  }

  private _moveUp = () => {
    this._move(-1);
  };

  private _moveDown = () => {
    this._move(1);
  };

  private _isEmpty() {
    const { children } = this.props;
    return !children || !childrenToArray(children).filter(isExist).length;
  }

  private _handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event);
    }

    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this._moveUp();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this._moveDown();
        break;

      case 'Enter':
        if (this._highlighted && this._highlighted.props.onClick) {
          this._highlighted.props.onClick(event);
        }
        break;

      default:
        break;
    }
  };
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
