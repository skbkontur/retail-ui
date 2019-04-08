import cn from 'classnames';
import * as React from 'react';
import ReactDOM from 'react-dom';

import isActiveElement from './isActiveElement';
import ScrollContainer, { ScrollContainerScrollState } from '../../ScrollContainer/ScrollContainer';

import MenuItem, { MenuItemProps, isMenuItem } from '../../MenuItem';
import { isMenuHeader } from '../../MenuHeader';

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
}

export default class InternalMenu extends React.Component<MenuProps, MenuState> {
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
  };

  private scrollContainer: Nullable<ScrollContainer>;
  private highlighted: Nullable<MenuItem>;
  private rootElement: Nullable<HTMLDivElement>;
  private header: Nullable<HTMLDivElement>;
  private footer: Nullable<HTMLDivElement>;

  private getProps = createPropsGetter(InternalMenu.defaultProps);

  public componentDidMount() {
    this.setInitialSelection();
    this.calculateMaxHeight();
  }

  public componentDidUpdate(prevProps: MenuProps, prevState: MenuState) {
    if (this.shouldRecalculateMaxHeight(prevProps)) {
      this.calculateMaxHeight();
    }
  }

  public componentWillReceiveProps(nextProps: MenuProps) {
    if (nextProps.maxHeight !== this.props.maxHeight) {
      this.setState({
        maxHeight: nextProps.maxHeight || 'none',
      });
    }
  }

  public focus() {
    this.focusOnRootElement();
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
        style={{
          width: this.props.width,
          maxHeight: this.state.maxHeight,
        }}
        onKeyDown={this.handleKeyDown}
        ref={element => {
          this.rootElement = element;
        }}
        tabIndex={0}
      >
        {this.props.header ? this.renderHeader() : null}
        <ScrollContainer
          ref={this.refScrollContainer}
          maxHeight={this.props.maxHeight}
          preventWindowScroll={this.props.preventWindowScroll}
          onScrollStateChange={this.handleScrollStateChange}
        >
          {React.Children.map(this.props.children, (child, index) => {
            if (typeof child === 'string' || typeof child === 'number' || child == null) {
              return child;
            }
            if (typeof child.type === 'string') {
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
              const originalRef = ref;
              if (highlight) {
                ref = menuItem => this.refHighlighted(originalRef, menuItem);
              }

              return React.cloneElement<MenuItemProps, MenuItem>(child, {
                ref,
                state: highlight ? 'hover' : child.props.state,
                onClick: this.select.bind(this, index, false),
                onMouseEnter: () => this.highlightItem(index),
                onMouseLeave: this.unhighlight,
              });
            }

            return child;
          })}
        </ScrollContainer>
        {this.props.footer ? this.renderFooter() : null}
      </div>
    );
  }

  private renderHeader = () => {
    return (
      <div
        ref={el => (this.header = el)}
        className={cn({
          [styles.header]: true,
          [styles.fixedHeader]: this.state.scrollState !== 'top',
        })}
      >
        {this.props.header}
      </div>
    );
  };

  private renderFooter = () => {
    return (
      <div
        ref={el => (this.footer = el)}
        className={cn({
          [styles.footer]: true,
          [styles.fixedFooter]: this.state.scrollState !== 'bottom',
        })}
      >
        {this.props.footer}
      </div>
    );
  };

  private focusOnRootElement = (): void => {
    if (this.rootElement) {
      this.rootElement.focus();
    }
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
    let calculatedMaxHeight;

    if (typeof maxHeight === 'string' && typeof window !== 'undefined' && this.rootElement) {
      const rootElementMaxHeight = window.getComputedStyle(this.rootElement).maxHeight;

      if (rootElementMaxHeight) {
        parsedMaxHeight = parseFloat(rootElementMaxHeight);
      }
    }

    calculatedMaxHeight =
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

  private refHighlighted(
    originalRef: string | ((instance: MenuItem | null) => void) | React.RefObject<MenuItem> | null | undefined,
    menuItem: MenuItem | null,
  ) {
    this.highlighted = menuItem;

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
      this.scrollContainer.scrollTo(ReactDOM.findDOMNode(this.highlighted) as HTMLElement);
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
        item.props.onClick(event as React.MouseEvent<HTMLElement>);
      }
      if (this.props.onItemClick) {
        this.props.onItemClick(event);
      }
      return true;
    }
    return false;
  }

  private highlightItem = (index: number): void => {
    this.setState({ highlightedIndex: index });
    if (this.rootElement) {
      this.rootElement.focus();
    }
  };

  private unhighlight = () => {
    this.setState({ highlightedIndex: -1 });
  };

  private move(step: number) {
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
    }, this.scrollToSelected);
  }

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
        if (this.highlighted && this.highlighted.props.onClick) {
          this.highlighted.props.onClick(event);
        }
        break;

      default:
        break;
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

function childrenToArray(children: React.ReactNode): React.ReactChild[] {
  const ret: React.ReactChild[] = [];
  // Use forEach instead of map to avoid cloning for key unifying.
  React.Children.forEach(children, child => {
    ret.push(child);
  });
  return ret;
}
