import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import { isKeyArrowDown, isKeyArrowUp, isKeyEnter } from '../../lib/events/keyboard/identifiers';
import { ScrollContainer, ScrollContainerScrollState } from '../../components/ScrollContainer';
import { isMenuItem, MenuItem, MenuItemProps } from '../../components/MenuItem';
import { isMenuHeader } from '../../components/MenuHeader';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { cx } from '../../lib/theming/Emotion';

import { jsStyles } from './InternalMenu.styles';
import { isActiveElement } from './isActiveElement';

interface MenuProps {
  children?: React.ReactNode;
  hasShadow?: boolean;
  onItemClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
  width?: number | string;
  preventWindowScroll?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  /**
   * Отключить дефолтные отступы контейнеров
   */
  disableDefaultPaddings?: boolean;
  /**
   * Показывать, даже если контейнер пустой
   */
  showEmpty?: boolean;
  backgroundTransparent?: boolean;

  header?: React.ReactNode;
  /**
   * Тень для хедера. По умолчанию нижнее подчеркивание
   */
  headerBoxShadow?: React.CSSProperties['boxShadow'];

  footer?: React.ReactNode;

  // Циклический перебор айтемов меню (по-дефолтну включен)
  cyclicSelection?: boolean;
  initialSelectedItemIndex?: number;

  /**
   * Максимальная высота
   */
  maxHeight?: number | string;

  /**
   * Максимальная высота применится для:
   * - 'all' - для всего меню
   * - 'items' - только для скролл-контейнера. Не учитываются высоты `header` и `footer`
   * @default 'items'
   */
  maxHeightFor?: 'all' | 'items';
}

interface MenuState {
  highlightedIndex: number;
  maxHeight: number | string;
  scrollState: ScrollContainerScrollState;

  scrollContainerMaxHeight: number | string;
}

export class InternalMenu extends React.Component<MenuProps, MenuState> {
  public static __KONTUR_REACT_UI__ = 'InternalMenu';

  public static defaultProps = {
    width: 'auto',
    maxHeight: 300,
    hasShadow: true,
    preventWindowScroll: true,
    cyclicSelection: true,
    initialSelectedItemIndex: -1,
    maxHeightFor: 'items',
  };

  public state: MenuState = {
    highlightedIndex: -1,
    maxHeight: this.props.maxHeight || 'none',
    scrollState: 'top',

    scrollContainerMaxHeight: this.props.maxHeight || 'none',
  };

  private theme!: Theme;
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

  public componentDidUpdate(prevProps: MenuProps) {
    if (this.shouldRecalculateMaxHeight(prevProps)) {
      this.calculateMaxHeight();
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: MenuProps) {
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
    const enableIconPadding = React.Children.toArray(this.props.children).some(
      (x) => React.isValidElement(x) && x.props.icon,
    );

    if (!this.props.showEmpty && this.isEmpty()) {
      return null;
    }

    return (
      <div
        className={cn({
          [jsStyles.root(this.theme)]: true,
          [jsStyles.disablePadding()]: this.props.disableDefaultPaddings,
          [jsStyles.backgroundTransparent()]: this.props.backgroundTransparent,
          [jsStyles.shadow(this.theme)]: this.props.hasShadow,
        })}
        style={{
          width: this.props.width,
          maxHeight: this.state.maxHeight,
        }}
        onKeyDown={this.handleKeyDown}
        ref={(element) => {
          this.rootElement = element;
        }}
        tabIndex={0}
      >
        {this.props.header ? this.renderHeader() : null}
        <ScrollContainer
          ref={this.refScrollContainer}
          maxHeight={this.state.scrollContainerMaxHeight}
          preventWindowScroll={this.props.preventWindowScroll}
          onScrollStateChange={this.handleScrollStateChange}
        >
          {React.Children.map(this.props.children, (child, index) => {
            if (typeof child === 'string' || typeof child === 'number' || child == null) {
              return child;
            }
            if (React.isValidElement(child) && typeof child.type === 'string') {
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
                ref = (menuItem) => this.refHighlighted(originalRef, menuItem);
              }

              return React.cloneElement<MenuItemProps, MenuItem>(child, {
                ref,
                state: highlight ? 'hover' : child.props.state,
                onClick: this.select.bind(this, index, false),
                onMouseEnter: (event) => {
                  this.highlightItem(index);
                  if (isMenuItem(child) && child.props.onMouseEnter) {
                    child.props.onMouseEnter(event);
                  }
                },
                onMouseLeave: (event) => {
                  this.unhighlight();
                  if (isMenuItem(child) && child.props.onMouseLeave) {
                    child.props.onMouseLeave(event);
                  }
                },
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
    const isScrolled = this.state.scrollState !== 'top';

    return (
      <div
        ref={(el) => (this.header = el)}
        className={cx({
          [jsStyles.header()]: true,
          [jsStyles.fixedHeader()]: isScrolled,
          [jsStyles.disablePadding()]: this.props.disableDefaultPaddings,
          [jsStyles.disableTop()]: this.props.disableDefaultPaddings,
        })}
        style={{
          boxShadow: isScrolled ? this.props.headerBoxShadow : undefined,
        }}
      >
        {this.props.header}
      </div>
    );
  };

  private renderFooter = () => {
    return (
      <div
        ref={(el) => (this.footer = el)}
        className={cn({
          [jsStyles.footer()]: true,
          [jsStyles.fixedFooter()]: this.state.scrollState !== 'bottom',
          [jsStyles.disablePadding()]: this.props.disableDefaultPaddings,
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
    const { maxHeightFor } = this.props;

    if (maxHeightFor === 'items') {
      this.calculateMaxHeightForItems();
    }

    if (maxHeightFor === 'all') {
      this.calculateMaxHeightForAll();
    }
  };

  private calculateMaxHeightForItems = () => {
    const { maxHeight } = this.props;

    let parsedMaxHeight = maxHeight;
    if (typeof maxHeight === 'string' && typeof window !== 'undefined' && this.rootElement) {
      const rootElementMaxHeight = window.getComputedStyle(this.rootElement).maxHeight;

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
      scrollContainerMaxHeight: this.props.maxHeight || 'none',
    });
  };

  private calculateMaxHeightForAll = () => {
    const { maxHeight } = this.props;

    let parsedMaxContainerHeight = maxHeight;
    if (parsedMaxContainerHeight) {
      if (typeof maxHeight === 'string') {
        parsedMaxContainerHeight = parseFloat(maxHeight);
      }
    }

    const calculatedContainerMaxHeight =
      parsedMaxContainerHeight && typeof parsedMaxContainerHeight === 'number'
        ? parsedMaxContainerHeight -
          ((this.header && this.header.getBoundingClientRect().height) || 0) -
          ((this.footer && this.footer.getBoundingClientRect().height) || 0)
        : undefined;

    this.setState({
      maxHeight: this.props.maxHeight || 'none',
      scrollContainerMaxHeight: calculatedContainerMaxHeight || 'none',
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
      if (this.highlighted && this.highlighted.props.onClick) {
        this.highlighted.props.onClick(e);
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
