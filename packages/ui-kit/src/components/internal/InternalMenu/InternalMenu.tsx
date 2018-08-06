import * as React from 'react';
import ReactDOM from 'react-dom';

import ScrollContainer from '../../ScrollContainer/ScrollContainer';
import { isActiveElement, isMenuHeader, isMenuItem } from './utils';

import MenuItem, { MenuItemProps } from '../../MenuItem/MenuItem';
import { InternalMenuStyledWrapper, InternalMenuWrapper } from './InternalMenuView';

export interface InternalMenuProps {
  hasShadow?: boolean;
  maxHeight?: number | string;
  onItemClick?: (eventType: string) => void;
  width?: number | string;
  preventWindowScroll?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  /**
   * Циклический перебор айтемов меню (по-дефолтну включен)
   */
  cyclicSelection?: boolean;
  initialSelectedItemIndex?: number;
}

export interface InternalMenuState {
  highlightedIndex: number;
}

export default class InternalMenu extends React.Component<InternalMenuProps, InternalMenuState> {
  public static defaultProps = {
    width: 'auto',
    maxHeight: 301,
    hasShadow: true,
    preventWindowScroll: true,
    cyclicSelection: true,
    initialSelectedItemIndex: -1
  };

  public state: InternalMenuState = {
    highlightedIndex: -1
  };

  private scrollContainer: ScrollContainer | null = null;
  private highlighted: MenuItem | null = null;
  private rootElement: InternalMenuWrapper | null = null;

  public componentDidMount() {
    this.focusWithScrollRestore();
    this.setInitialSelection();
  }

  public render() {
    const enableIconPadding = React.Children.toArray(this.props.children).some(
      x => x && typeof x === 'object' && x.props.icon
    );

    if (this.isEmpty()) {
      return null;
    }

    return (
      <InternalMenuStyledWrapper
        style={{ width: this.props.width, maxHeight: this.props.maxHeight }}
        onKeyDown={this.handleKeyDown}
        innerRef={this.rootElementRef}
        tabIndex={0}
      >
        <ScrollContainer
          ref={this.refScrollContainer}
          maxHeight={this.props.maxHeight}
          preventWindowScroll={this.props.preventWindowScroll}
        >
          {React.Children.map(this.props.children, (child, index) => {
            if (!React.isValidElement(child)) {
              return child;
            }

            if (enableIconPadding && (isMenuItem(child) || isMenuHeader(child))) {
              child = React.cloneElement(child as React.ReactElement<MenuItemProps>, {
                _enableIconPadding: true
              });
            }

            if (isActiveElement(child)) {
              const isHighlightedMenuItem = this.state.highlightedIndex === index;

              return React.cloneElement(child, {
                ref: (element: MenuItem) => {
                  if (isHighlightedMenuItem) {
                    this.highlighted = element;
                  }
                  return element;
                },
                state: isHighlightedMenuItem ? 'hover' : child.props.state,
                onClick: this.select.bind(this, index, false),
                onMouseEnter: () => this.highlightItem(index),
                onMouseLeave: this.unhighlight
              });
            }
            return child;
          })}
        </ScrollContainer>
      </InternalMenuStyledWrapper>
    );
  }

  private rootElementRef = (element: InternalMenuWrapper) => {
    this.rootElement = element;
  };

  private focusWithScrollRestore = (): void => {
    if (this.rootElement && window) {
      const scrollX: number = window.scrollX;
      const scrollY: number = window.scrollY;

      this.rootElement.focus();
      window.scrollTo(scrollX, scrollY);
    }
  };

  private setInitialSelection = () => {
    if (this.props.initialSelectedItemIndex === undefined) {
      return;
    }

    for (let i = this.props.initialSelectedItemIndex; i > -1; i--) {
      this.moveDown();
    }
  };

  private refScrollContainer = (scrollContainer: ScrollContainer) => {
    this.scrollContainer = scrollContainer;
  };

  private scrollToSelected = () => {
    if (this.scrollContainer && this.highlighted) {
      const highlightedDomNode = ReactDOM.findDOMNode(this.highlighted);
      if (highlightedDomNode instanceof HTMLElement) {
        this.scrollContainer.scrollTo(highlightedDomNode);
      }
    }
  };

  private select(
    index: number,
    shouldHandleHref: boolean,
    event: React.SyntheticEvent<HTMLElement>
  ): boolean {
    const item = childrenToArray(this.props.children)[index] as React.ReactElement<MenuItemProps>;
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
        this.props.onItemClick(event.type);
      }

      return true;
    }
    return false;
  }

  private highlightItem = (index: number): void => {
    this.setState({ highlightedIndex: index });
    if (this.rootElement && this.rootElement.focus) {
      this.rootElement.focus();
    }
  };

  private unhighlight = () => {
    this.setState({ highlightedIndex: -1 });
  };

  private moveUp = () => {
    this.move(-1);
  };

  private moveDown = () => {
    this.move(1);
  };

  private move(step: number) {
    this.setState(state => {
      const children = childrenToArray(this.props.children);
      if (!children.some(isActiveElement)) {
        return null;
      }
      let index: number = state.highlightedIndex;
      do {
        index += step;
        if (!this.props.cyclicSelection && (index < 0 || index > children.length)) {
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
    }, this.scrollToSelected);
  }

  private isEmpty() {
    const { children } = this.props;
    return !children || !childrenToArray(children).filter(isExist).length;
  }

  private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event);
    }

    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.moveUp();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.moveDown();
        break;

      case 'Enter':
        event.preventDefault();
        this.select(this.state.highlightedIndex, false, event);
        break;

      default:
        break;
    }
  };
}

function isExist(value: React.ReactChild) {
  return value !== null && value !== undefined;
}

function childrenToArray(children: React.ReactNode) {
  const ret: React.ReactChild[] = [];
  // Use forEach instead of map to avoid cloning for key unifying.
  React.Children.toArray(children).forEach(child => {
    ret.push(child);
  });
  return ret;
}
