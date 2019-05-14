import * as React from 'react';
import { ChangeEvent, FocusEvent, FocusEventHandler, KeyboardEvent, MouseEventHandler, ReactNode } from 'react';
import warningOutput from 'warning';
import * as ReactDOM from 'react-dom';
import TextWidthHelper from './TextWidthHelper';
import TokenInputMenu from './TokenInputMenu';
import { TokenInputAction, tokenInputReducer } from './TokenInputReducer';
import LayoutEvents from '../../lib/LayoutEvents';
import styles from './TokenInput.less';
import cn from 'classnames';
import Menu from '../Menu/Menu';
import Token, { TokenProps } from '../Token';
import { MenuItemState } from '../MenuItem';
import isEqual from 'lodash.isequal';
import { TokenActions } from '../Token/Token';
import { emptyHandler } from '../../lib/utils';

export enum TokenInputType {
  WithReference,
  WithoutReference,
  Combined,
}

export interface TokenInputProps<T> {
  selectedItems: T[];
  onChange: (items: T[]) => void;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  type?: TokenInputType;
  getItems?: (query: string) => Promise<T[]>;
  hideMenuIfEmptyInputValue?: boolean;
  renderItem: (item: T, state: MenuItemState) => React.ReactNode | null;
  renderValue: (item: T) => React.ReactNode;
  /**
   * Функция должна возвращать строковое представление токена
   * @default item => item
   */
  valueToString: (item: T) => string;
  renderNotFound?: () => React.ReactNode;
  valueToItem: (item: string) => T;
  toKey: (item: T) => string | number | undefined;
  placeholder?: string;
  delimiters?: string[];
  error?: boolean;
  warning?: boolean;
  disabled?: boolean;
  width?: string | number;
  renderToken?: (item: T, props: Partial<TokenProps & TokenActions>) => ReactNode;
  /**
   * @deprecated Use `renderToken` prop instead
   */
  renderTokenComponent?: (
    token: (props?: Partial<TokenProps>) => React.ReactElement<TokenProps>,
    value?: T,
  ) => React.ReactElement<TokenProps>;
}

export interface TokenInputState<T> {
  autocompleteItems?: T[];
  activeTokens: T[];
  inFocus?: boolean;
  inputValue: string;
  inputValueWidth: number;
  preventBlur?: boolean;
  loading?: boolean;
}

const defaultToKey = <T extends any>(item: T): string => item.toString();
const identity = <T extends any>(item: T): T => item;
const defaultRenderToken = <T extends any>(
  item: T,
  { isActive, onClick, onRemove }: Partial<TokenProps & TokenActions>,
) => (
  <Token key={item.toString()} isActive={isActive} onClick={onClick} onRemove={onRemove}>
    {item}
  </Token>
);

export default class TokenInput<T = string> extends React.PureComponent<TokenInputProps<T>, TokenInputState<T>> {
  public static defaultProps: Partial<TokenInputProps<any>> = {
    selectedItems: [],
    renderItem: identity,
    renderValue: identity,
    valueToString: identity,
    valueToItem: (item: string) => item,
    toKey: defaultToKey,
    onChange: () => void 0,
    width: 250 as string | number,
    onBlur: emptyHandler,
    onFocus: emptyHandler,
    onMouseEnter: emptyHandler,
    onMouseLeave: emptyHandler,
  };

  public state: TokenInputState<T> = {
    inputValue: '',
    inputValueWidth: 20,
    activeTokens: [],
  };

  private input: HTMLInputElement | null = null;
  private tokensInputMenu: TokenInputMenu<T> | null = null;
  private textHelper: TextWidthHelper | null = null;
  private wrapper: HTMLLabelElement | null = null;

  public componentDidMount() {
    this.updateInputTextWidth();
    document.addEventListener('copy', this.handleCopy);
    if (this.props.autoFocus) {
      this.focusInput();
    }
  }

  public componentDidUpdate(prevProps: TokenInputProps<T>, prevState: TokenInputState<T>) {
    if (prevState.inputValue !== this.state.inputValue) {
      this.updateInputTextWidth();
    }
    if (prevState.activeTokens.length === 0 && this.state.activeTokens.length > 0) {
      this.dispatch({
        type: 'SET_AUTOCOMPLETE_ITEMS',
        payload: undefined,
      });
    }
    if (prevProps.selectedItems.length !== this.props.selectedItems.length) {
      LayoutEvents.emit();
    }
    if (!this.isCursorVisibleForState(prevState) && this.isCursorVisible) {
      this.tryGetItems(this.state.inputValue);
    }
  }

  public componentWillUnmount() {
    document.removeEventListener('copy', this.handleCopy);
  }

  public render(): ReactNode {
    if (this.type !== TokenInputType.WithoutReference && !this.props.getItems) {
      throw Error('Missed getItems for type ' + this.type);
    }

    const {
      selectedItems,
      width,
      error,
      warning,
      disabled,
      placeholder,
      renderItem,
      renderNotFound,
      hideMenuIfEmptyInputValue,
      onMouseEnter,
      onMouseLeave,
    } = this.props;

    const { activeTokens, inFocus, inputValueWidth, inputValue, autocompleteItems, loading } = this.state;

    const showMenu =
      this.type !== TokenInputType.WithoutReference &&
      this.isCursorVisible &&
      activeTokens.length === 0 &&
      (inputValue !== '' || !hideMenuIfEmptyInputValue);

    const inputInlineStyles: React.CSSProperties = {
      // вычисляем ширину чтобы input автоматически перенёсся на следующую строку при необходимости
      width: Math.max(50, inputValueWidth + 7),
      // input растягивается на всю ширину чтобы placeholder не обрезался
      flex: selectedItems && selectedItems.length === 0 ? 1 : undefined,
      // в ie не работает, но альтернативный способ --- дать tabindex для label --- предположительно ещё сложнее
      caretColor: this.isCursorVisible ? undefined : 'transparent',
    };

    return (
      <div data-tid="TokenInput" className={styles.root} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {/* расчёт ширины текста с последующим обновлением ширины input */}
        <TextWidthHelper ref={this.textHelperRef} text={inputValue} />
        <label
          ref={this.wrapperRef}
          style={{ width }}
          className={cn(styles.label, {
            [styles.labelFocused]: inFocus,
            [styles.error]: error,
            [styles.warning]: warning,
          })}
          onMouseDown={this.handleWrapperMouseDown}
          onMouseUp={this.handleWrapperMouseUp}
        >
          {this.renderTokenFields()}
          <input
            type="text"
            ref={this.inputRef}
            value={inputValue}
            style={inputInlineStyles}
            autoComplete="off"
            spellCheck={false}
            disabled={disabled}
            className={styles.input}
            placeholder={selectedItems.length > 0 ? undefined : placeholder}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            onChange={this.handleChangeInputValue}
            onKeyDown={this.handleKeyDown}
            onPaste={this.handleInputPaste}
          />
          {showMenu && (
            <TokenInputMenu
              ref={this.tokensInputMenuRef}
              items={autocompleteItems}
              loading={loading}
              opened={showMenu}
              anchorElement={this.input!}
              inputValue={inputValue}
              renderNotFound={renderNotFound}
              renderItem={renderItem}
              onAddItem={this.handleAddItem}
              onChange={this.handleChange}
              showAddItemHint={this.showAddItemHint}
            />
          )}
        </label>
      </div>
    );
  }

  private hasValueInItems = (items: T[], value: T) => {
    if (typeof value === 'string') {
      return items.includes(value);
    }
    // todo: как то не очень
    return items.some(item => isEqual(item, value));
  };

  private get showAddItemHint() {
    const items = this.state.autocompleteItems;
    const value = this.props.valueToItem!(this.state.inputValue);

    if (items && this.hasValueInItems(items, value)) {
      return false;
    }

    const selectedItems = this.props.selectedItems;
    if (selectedItems && this.hasValueInItems(selectedItems, value)) {
      return false;
    }

    if (this.type === TokenInputType.Combined && this.state.inputValue !== '') {
      return true;
    }
  }

  private get type() {
    return this.props.type ? this.props.type : TokenInputType.WithReference;
  }

  private get delimiters() {
    return this.props.delimiters ? this.props.delimiters : [','];
  }

  private get menuRef(): Menu | null {
    return this.tokensInputMenu && this.tokensInputMenu.getMenuRef();
  }

  private get isCursorVisible() {
    return this.isCursorVisibleForState(this.state);
  }

  private isCursorVisibleForState(state: TokenInputState<T>) {
    return state.inFocus && (state.inputValue !== '' || state.activeTokens.length === 0);
  }

  private inputRef = (node: HTMLInputElement) => (this.input = node);
  private tokensInputMenuRef = (node: TokenInputMenu<T>) => (this.tokensInputMenu = node);
  private textHelperRef = (node: TextWidthHelper) => (this.textHelper = node);
  private wrapperRef = (node: HTMLLabelElement) => (this.wrapper = node);

  private dispatch = (action: TokenInputAction, cb?: () => void) => {
    this.setState(prevState => tokenInputReducer(prevState, action), cb);
  };

  private updateInputTextWidth() {
    if (this.textHelper) {
      const inputValueWidth = this.textHelper.getTextWidth();
      this.dispatch({ type: 'SET_INPUT_VALUE_WIDTH', payload: inputValueWidth }, LayoutEvents.emit);
    }
  }

  private handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    this.dispatch({ type: 'SET_FOCUS_IN' });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (this.isBlurToMenu(event) || this.state.preventBlur) {
      event.preventDefault();
      // первый focus нужен для предотвращения/уменьшения моргания в других браузерах
      this.input!.focus();
      // в firefox не работает без второго focus
      process.nextTick(() => this.input!.focus());
      this.dispatch({ type: 'SET_PREVENT_BLUR', payload: false });
    } else {
      this.dispatch({ type: 'BLUR' });
    }
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private isBlurToMenu = (event: FocusEvent<HTMLElement>) => {
    if (this.menuRef) {
      const menu = ReactDOM.findDOMNode(this.menuRef) as HTMLElement | null;
      const relatedTarget = (event.relatedTarget || document.activeElement) as HTMLElement;
      if (menu && menu.contains(relatedTarget)) {
        return true;
      }
    }
    return false;
  };

  private handleWrapperMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    this.dispatch({ type: 'SET_PREVENT_BLUR', payload: true });
    const target = event.target as HTMLElement;
    const isClickOnToken =
      target && this.wrapper!.contains(target) && target !== this.wrapper! && target !== this.input!;
    if (!isClickOnToken) {
      this.dispatch({ type: 'REMOVE_ALL_ACTIVE_TOKENS' });
    }
  };

  private handleWrapperMouseUp = () => {
    this.dispatch({ type: 'SET_PREVENT_BLUR', payload: false });
  };

  private handleCopy = (event: any) => {
    if (!this.state.inFocus || this.state.activeTokens.length === 0 || this.isCursorVisible) {
      return;
    }
    event.preventDefault();

    // упорядочивание токенов по индексу
    const tokens = this.state.activeTokens
      .map(token => this.props.selectedItems.indexOf(token))
      .sort()
      .map(index => this.props.selectedItems[index])
      .map(item => this.props.valueToString(item));
    event.clipboardData.setData('text/plain', tokens.join(this.delimiters[0]));
  };

  private handleInputPaste = (event: React.ClipboardEvent<HTMLElement>) => {
    if (this.type === TokenInputType.WithReference || !event.clipboardData) {
      return;
    }
    let paste = event.clipboardData.getData('text');
    const delimiters = this.delimiters;
    if (delimiters.some(delimiter => paste.includes(delimiter))) {
      event.preventDefault();
      event.stopPropagation();
      for (const delimiter of delimiters) {
        paste = paste.split(delimiter).join(delimiters[0]);
      }
      const tokens = paste.split(delimiters[0]);
      const items = tokens
        .map(token => this.props.valueToItem!(token))
        .filter(item => !this.hasValueInItems(this.props.selectedItems, item));
      const newItems = this.props.selectedItems.concat(items);
      this.props.onChange(newItems);
    }
  };

  private tryGetItems = async (query: string = '') => {
    if (this.props.getItems && (this.state.inputValue !== '' || !this.props.hideMenuIfEmptyInputValue)) {
      this.dispatch({ type: 'SET_LOADING', payload: true });
      const autocompleteItems = await this.props.getItems(query);
      this.dispatch({ type: 'SET_LOADING', payload: false });

      const autocompleteItemsUnique = autocompleteItems.filter(
        item => !this.hasValueInItems(this.props.selectedItems, item),
      );
      if (query === '' || this.state.inputValue !== '') {
        this.dispatch({ type: 'SET_AUTOCOMPLETE_ITEMS', payload: autocompleteItemsUnique }, () => {
          LayoutEvents.emit();
          this.highlightMenuItem();
        });
      }
    }
  };

  private handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (this.isCursorVisible) {
      this.handleInputKeyDown(event);
    } else {
      this.handleWrapperKeyDown(event);
    }
  };

  private handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();

    if (this.type !== TokenInputType.WithReference && (event.key === 'Enter' || this.delimiters.includes(event.key))) {
      event.preventDefault();
      const newValue = this.state.inputValue as any;
      if (newValue !== '') {
        this.handleAddItem(newValue);
      }
    }

    switch (event.key) {
      case 'Enter':
        if (this.menuRef) {
          this.menuRef.enter(event);
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        if (this.menuRef) {
          if (event.key === 'ArrowUp') {
            this.menuRef.up();
          } else {
            this.menuRef.down();
          }
        }
        break;
      case 'Escape':
        this.input!.blur();
        break;
      case 'Backspace':
        this.moveFocusToLastToken();
        break;
      case 'ArrowLeft':
        if (this.input!.selectionStart === 0) {
          this.moveFocusToLastToken();
        }
        break;
    }
  };

  private moveFocusToLastToken() {
    const items = this.props.selectedItems;
    if (this.state.inputValue === '' && items && items.length > 0) {
      this.dispatch({ type: 'SET_ACTIVE_TOKENS', payload: items.slice(-1) });
    }
  }

  private focusInput = () => {
    process.nextTick(() => this.input!.focus());
  };

  private handleWrapperKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        const itemsNew = this.props.selectedItems.filter(item => !this.hasValueInItems(this.state.activeTokens, item));
        this.props.onChange(itemsNew);
        this.dispatch({ type: 'REMOVE_ALL_ACTIVE_TOKENS' }, () => {
          LayoutEvents.emit();
          this.input!.focus();
        });
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        this.handleWrapperArrows(event);
        break;
      case 'Escape':
        this.wrapper!.blur();
        break;
      case 'a':
        if (event.ctrlKey) {
          event.preventDefault();
          this.dispatch({
            type: 'SET_ACTIVE_TOKENS',
            payload: this.props.selectedItems,
          });
        }
        break;
    }
  };

  private handleWrapperArrows = (event: KeyboardEvent<HTMLElement>) => {
    event.preventDefault();
    const activeTokens = this.state.activeTokens;
    const activeItemIndex = this.props.selectedItems.indexOf(activeTokens[0]);
    const newItemIndex = activeItemIndex + (event.key === 'ArrowLeft' ? -1 : +1);
    const isLeftEdge = activeItemIndex === 0 && event.key === 'ArrowLeft';
    const isRightEdge = activeItemIndex === this.props.selectedItems.length - 1 && event.key === 'ArrowRight';
    if (!event.shiftKey && activeTokens.length === 1) {
      this.handleWrapperArrowsWithoutShift(isLeftEdge, isRightEdge, newItemIndex);
    } else {
      this.handleWrapperArrowsWithShift(isLeftEdge, isRightEdge, newItemIndex);
    }
  };

  private handleWrapperArrowsWithoutShift = (isLeftEdge: boolean, isRightEdge: boolean, newItemIndex: number) => {
    if (isRightEdge) {
      this.dispatch({ type: 'REMOVE_ALL_ACTIVE_TOKENS' }, () => this.input!.focus());
    } else if (!isLeftEdge) {
      this.dispatch({
        type: 'SET_ACTIVE_TOKENS',
        payload: [this.props.selectedItems[newItemIndex]],
      });
    }
  };

  private handleWrapperArrowsWithShift = (isLeftEdge: boolean, isRightEdge: boolean, newItemIndex: number) => {
    if (!isLeftEdge && !isRightEdge) {
      const itemNew = this.props.selectedItems[newItemIndex];
      const itemsNew = [itemNew, ...this.state.activeTokens.filter(item => !isEqual(item, itemNew))];
      this.dispatch({ type: 'SET_ACTIVE_TOKENS', payload: itemsNew });
    }
  };

  private handleChange = (item: T) => {
    if (this.hasValueInItems(this.props.selectedItems, item)) {
      return;
    }

    const newItems = this.props.selectedItems.concat([item]);
    this.props.onChange(newItems);

    this.dispatch({ type: 'CLEAR_INPUT' });
    this.tryGetItems();
  };

  private handleAddItem = (item: string) => {
    const value = this.props.valueToItem!(item);
    if (this.hasValueInItems(this.props.selectedItems, value)) {
      return;
    }

    const newItems = this.props.selectedItems.concat([value]);
    this.props.onChange(newItems);

    this.dispatch({ type: 'CLEAR_INPUT' });
    this.tryGetItems();
  };

  private handleRemoveToken = (item: T) => {
    this.props.onChange(this.props.selectedItems.filter(_ => !isEqual(_, item)));
    const filteredActiveTokens = this.state.activeTokens.filter(_ => !isEqual(_, item));

    this.dispatch({ type: 'SET_ACTIVE_TOKENS', payload: filteredActiveTokens });
    if (filteredActiveTokens.length === 0) {
      this.focusInput();
    }

    this.tryGetItems();
  };

  private handleTokenClick = (event: React.MouseEvent<HTMLElement>, itemNew: T) => {
    const items = this.state.activeTokens;
    if (event.ctrlKey) {
      const newItems = this.hasValueInItems(this.state.activeTokens, itemNew)
        ? items.filter(item => !isEqual(item, itemNew))
        : [...items, itemNew];
      this.dispatch({ type: 'SET_ACTIVE_TOKENS', payload: newItems });
    } else {
      this.dispatch({ type: 'SET_ACTIVE_TOKENS', payload: [itemNew] });
    }
    this.focusInput();
  };

  private handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    let query = event.target.value.trimLeft();
    if (query.endsWith(' ')) {
      query = query.trimRight() + ' ';
    }
    if (this.state.inputValue !== '' && query === '') {
      this.dispatch({ type: 'SET_AUTOCOMPLETE_ITEMS', payload: undefined });
    }
    this.dispatch({ type: 'UPDATE_QUERY', payload: query }, () => this.tryGetItems(query));
  };

  private highlightMenuItem = () => {
    if (
      this.menuRef &&
      this.state.autocompleteItems &&
      this.state.autocompleteItems.length > 0 &&
      this.type !== TokenInputType.Combined
    ) {
      this.menuRef.highlightItem(0);
    }
  };

  private renderTokenFields = () => {
    return this.props.selectedItems.map(this.renderTokenSelector);
  };

  private renderTokenSelector = (item: T) => {
    switch (true) {
      case this.props.renderToken !== undefined:
        return this.renderToken(item);
      case this.props.renderTokenComponent !== undefined:
        return this.renderTokenComponent(item);
      default:
        return this.renderToken(item);
    }
  };

  /**
   * @deprecated
   */
  private renderTokenComponent = (item: T) => {
    if (process.env.NODE_ENV !== 'production') {
      warningOutput(
        this.props.renderTokenComponent !== undefined,
        `Prop \`renderTokenComponent\` has been deprecated, use \`renderToken\` instead`,
      );
    }

    const { renderValue, toKey } = this.props;
    const isActive = this.state.activeTokens.indexOf(item) !== -1;
    const handleIconClick: React.MouseEventHandler<SVGElement> = event => {
      event.stopPropagation();
      this.handleRemoveToken(item);
    };
    const handleTokenClick: React.MouseEventHandler<HTMLDivElement> = event => {
      event.stopPropagation();
      this.handleTokenClick(event, item);
    };

    const token = ({ colors, error, warning }: Partial<TokenProps> = {}) => (
      <Token
        {...{
          key: toKey(item),
          isActive,
          colors,
          error,
          warning,
          onClick: handleTokenClick,
          onRemove: handleIconClick,
          children: renderValue(item),
        }}
      />
    );

    if (this.props.renderTokenComponent) {
      return this.props.renderTokenComponent(token, item);
    }

    // DEAD CODE
    return token();
  };

  private renderToken = (item: T) => {
    const { renderToken = defaultRenderToken } = this.props;

    const isActive = this.state.activeTokens.indexOf(item) !== -1;

    // TODO useCallback
    const handleIconClick: React.MouseEventHandler<SVGElement> = event => {
      event.stopPropagation();
      this.handleRemoveToken(item);
    };

    // TODO useCallback
    const handleTokenClick: React.MouseEventHandler<HTMLDivElement> = event => {
      event.stopPropagation();
      this.handleTokenClick(event, item);
    };

    return renderToken(item, {
      isActive,
      onClick: handleTokenClick,
      onRemove: handleIconClick,
    });
  };
}
