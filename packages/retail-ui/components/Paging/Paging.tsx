import * as React from 'react';
import { number, func } from 'prop-types';
import cn from 'classnames';
import ArrowChevronRightIcon from '@skbkontur/react-icons/ArrowChevronRight';
import { locale } from '../LocaleProvider/decorators';
import { PagingLocale, PagingLocaleHelper } from './locale';

import PagingHelper from './PagingHelper';
import NavigationHelper from './NavigationHelper';
import { Nullable } from '../../typings/utility-types';
import tabListener from '../../lib/events/tabListener';
import { emptyHandler } from '../../lib/utils';

import styles from './Paging.less';

const IGNORE_EVENT_TAGS = ['input', 'textarea'];

interface ItemComponentProps {
  active: boolean;
  children?: React.ReactNode;
  className: string;
  onClick: () => void;
  pageNumber: number | 'forward';
  tabIndex: number;
}

export interface PagingProps {
  activePage: number;
  /**
   * Компонент обертки по умолчанию
   * @default <span />
   */
  component: React.ComponentType<ItemComponentProps>;
  onPageChange: (pageNumber: number) => void;
  pagesCount: number;
  disabled?: boolean;
  strings?: { forward: string };
  /**
   * Отключает навигационные подсказки.
   * По-умолчанию подсказки появляются, когда доступно управление с клавиатуры
   * (либо элемент в фокусе, либо globalListeners === true)
   */
  withoutNavigationHint?: boolean;
  caption?: string;
  /**
   * Глобальный слушатель **keyDown**, для навигации клавишами без фокуса на компоненте.
   * Если на странице используется несколько элементов
   * **Paging** с useGlobalListener === true, то обработчик keyDown будет вызываться
   * на каждом из них. Такие случаи лучше обрабатывать отдельно.
   */
  useGlobalListener: boolean;
}

export interface PagingState {
  focusedByTab: boolean;
  focusedItem: Nullable<ItemType>;
  keyboardControl: boolean;
}

export type ItemType = number | '.' | 'forward';

@locale('Paging', PagingLocaleHelper)
export default class Paging extends React.Component<PagingProps, PagingState> {
  public static defaultProps = {
    component: ({ className, onClick, children }: any) => (
      <span className={className} onClick={onClick} children={children} />
    ),
    useGlobalListener: false,
  };

  public static propTypes = {};

  public static isForward(pageNumber: number | 'forward'): boolean /* %checks */ {
    return pageNumber === 'forward';
  }

  public state: PagingState = {
    focusedByTab: false,
    focusedItem: null,
    keyboardControl: this.props.useGlobalListener,
  };

  private readonly locale!: PagingLocale;

  private addedGlobalListener: boolean = false;
  private container: HTMLSpanElement | null = null;

  public componentDidMount() {
    if (this.props.useGlobalListener) {
      this.addGlobalListener();
    }
  }

  public componentWillReceiveProps(nextProps: PagingProps) {
    if (this.props.useGlobalListener !== nextProps.useGlobalListener) {
      this.setState({
        keyboardControl: nextProps.useGlobalListener,
      });
    }
  }

  public componentDidUpdate(prevProps: PagingProps) {
    if (!prevProps.useGlobalListener && this.props.useGlobalListener) {
      this.addGlobalListener();
    }

    if (prevProps.useGlobalListener && !this.props.useGlobalListener) {
      this.removeGlobalListener();
    }
  }

  public componentWillUnmount() {
    this.removeGlobalListener();
  }

  public render() {
    return (
      <span
        tabIndex={0}
        className={styles.paging}
        onKeyDown={this.props.useGlobalListener ? undefined : this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseDown={this.handleMouseDown}
        ref={this.refContainer}
      >
        {this.getItems().map(this.renderItem)}
      </span>
    );
  }

  private renderItem = (item: ItemType, index: number) => {
    const focused = this.getFocusedItem() === item;
    switch (item) {
      case '.':
        const key = `dots${index < 5 ? 'Left' : 'Right'}`;
        return this.renderDots(key);
      case 'forward':
        const disabled = this.isItemDisabled(item);
        return this.renderForwardLink(disabled, focused);
      default:
        const active = this.props.activePage === item;
        return this.renderPageLink(item, active, focused);
    }
  };

  private renderDots = (key: string) => {
    return (
      <span key={key} className={styles.dots}>
        {'...'}
      </span>
    );
  };

  private renderForwardLink = (disabled: boolean, focused: boolean): JSX.Element => {
    const classes = cn({
      [styles.forwardLink]: true,
      [styles.focused]: focused,
      [styles.disabled]: disabled,
    });
    const { component: Component, strings: { forward = this.locale.forward } = {}, caption } = this.props;

    return (
      <Component
        key={'forward'}
        active={false}
        className={classes}
        onClick={disabled ? emptyHandler : this.goForward}
        tabIndex={-1}
        pageNumber={'forward' as 'forward'}
      >
        {caption || forward}
        <span className={styles.forwardIcon}>
          <ArrowChevronRightIcon size="18px" />
        </span>
      </Component>
    );
  };

  private renderPageLink = (pageNumber: number, active: boolean, focused: boolean): JSX.Element => {
    const classes = cn({
      [styles.pageLink]: true,
      [styles.focused]: focused,
      [styles.active]: active,
    });
    const Component = this.props.component;
    const handleClick = () => this.goToPage(pageNumber);

    return (
      <span key={pageNumber} className={styles.pageLinkWrapper}>
        <Component active={active} className={classes} onClick={handleClick} tabIndex={-1} pageNumber={pageNumber}>
          {pageNumber}
        </Component>
        {active && this.renderNavigationHint()}
      </span>
    );
  };

  private renderNavigationHint = () => {
    if (this.props.withoutNavigationHint) {
      return null;
    }

    const { keyboardControl } = this.state;
    const canGoBackward = this.canGoBackward();
    const canGoForward = this.canGoForward();

    if (keyboardControl && (canGoBackward || canGoForward)) {
      return (
        <span className={styles.pageLinkHint}>
          <span className={canGoBackward ? '' : styles.transparent}>{'←'}</span>
          <span>{NavigationHelper.getKeyName()}</span>
          <span className={canGoForward ? '' : styles.transparent}>{'→'}</span>
        </span>
      );
    }

    return <div className={styles.pageLinkHintPlaceHolder} />;
  };

  private handleMouseDown = () => {
    this.setState({ focusedByTab: false, focusedItem: null });
  };

  private handleKeyDown = (event: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
    if (event.shiftKey) {
      return;
    }

    const target = event.target;
    const key = event.key;

    const isArrowLeft = key === 'ArrowLeft' || key === 'Left';
    const isArrowRight = key === 'ArrowRight' || key === 'Right';

    if (
      target instanceof Element &&
      (IGNORE_EVENT_TAGS.includes(target.tagName.toLowerCase()) || (target as HTMLElement).isContentEditable)
    ) {
      return;
    }

    if (NavigationHelper.checkKeyPressed(event) && isArrowLeft) {
      this.setState({ focusedItem: null }, this.goBackward);
      return;
    }
    if (NavigationHelper.checkKeyPressed(event) && isArrowRight) {
      this.setState({ focusedItem: null }, this.goForward);
      return;
    }

    if (this.container && this.container === event.target) {
      if (isArrowLeft) {
        this.setState({ focusedByTab: true }, this.moveFocusLeft);
        return;
      }
      if (isArrowRight) {
        this.setState({ focusedByTab: true }, this.moveFocusRight);
        return;
      }
      if (event.key === 'Enter') {
        this.executeItemAction(this.getFocusedItem());
        return;
      }
    }
  };

  private handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ keyboardControl: true });

    // focus event fires before keyDown eventlistener
    // so we should check tabPressed in async way
    process.nextTick(() => {
      if (tabListener.isTabPressed) {
        this.setState({ focusedByTab: true });
        tabListener.isTabPressed = false;
      }
    });
  };

  private handleBlur = () => {
    this.setState({
      focusedByTab: false,
      keyboardControl: this.props.useGlobalListener || false,
    });
  };

  private getItems = (): ItemType[] => {
    return PagingHelper.getItems(this.props.activePage, this.props.pagesCount).concat('forward');
  };

  private getFocusedItem = (): Nullable<ItemType> => {
    if (!this.state.focusedByTab) {
      return null;
    }

    const { focusedItem } = this.state;
    if (focusedItem && this.getItems().indexOf(focusedItem) !== -1 && this.isItemFocusable(focusedItem)) {
      return focusedItem;
    }

    return this.props.activePage;
  };

  private isItemFocusable = (item: ItemType) => {
    return !this.isItemDisabled(item);
  };

  private isItemDisabled = (item: ItemType) => {
    switch (item) {
      case '.':
        return true;
      case 'forward':
        return !this.canGoForward();
      default:
        return false;
    }
  };

  private executeItemAction = (item: Nullable<ItemType>) => {
    if (item === 'forward') {
      this.goForward();
    }
    if (typeof item === 'number') {
      this.goToPage(item);
    }
  };

  private moveFocusLeft = () => {
    this.moveFocus(-1);
  };

  private moveFocusRight = () => {
    this.moveFocus(1);
  };

  private moveFocus = (step: number) => {
    const focusedItem = this.getFocusedItem();
    const items = this.getItems();
    let index = items.findIndex(x => x === focusedItem);
    do {
      index = (index + step + items.length) % items.length;
    } while (!this.isItemFocusable(items[index]));
    this.setState({ focusedItem: items[index] });
  };

  private canGoBackward = (): boolean => {
    return this.props.activePage > 1;
  };

  private canGoForward = (): boolean => {
    return this.props.activePage < this.props.pagesCount;
  };

  private goBackward = () => {
    this.goToPage(this.props.activePage - 1);
  };

  private goForward = () => {
    this.goToPage(this.props.activePage + 1);
  };

  private goToPage = (pageNumber: number) => {
    if (1 <= pageNumber && pageNumber !== this.props.activePage && pageNumber <= this.props.pagesCount) {
      this.props.onPageChange(pageNumber);
    }
  };

  private addGlobalListener = () => {
    if (this.addedGlobalListener) {
      return;
    }

    document.addEventListener('keydown', this.handleKeyDown);
    this.addedGlobalListener = true;
  };

  private removeGlobalListener = () => {
    if (this.addedGlobalListener) {
      document.removeEventListener('keydown', this.handleKeyDown);

      this.addedGlobalListener = false;
    }
  };

  private refContainer = (element: HTMLSpanElement | null) => {
    this.container = element;
  };
}

Paging.propTypes = {
  /**
   * Current active page
   */
  activePage: number.isRequired,

  /**
   * React component that would be used for rendering items
   *
   * Usefull for router integration
   */
  component: func,

  /**
   * Total page count
   */
  pagesCount: number.isRequired,

  /**
   * Calls when page has been changed
   */
  onPageChange: func.isRequired,
};
