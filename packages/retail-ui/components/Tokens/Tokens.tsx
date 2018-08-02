import * as React from 'react';
import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import * as ReactDOM from 'react-dom';
import TextWidthHelper from './TextWidthHelper';
import { TokensTokens } from './TokensTokens';
import { TokensMenu } from './TokensMenu';
import { TokensInputAction, tokensReducer } from './TokensReducer';
import LayoutEvents from '../../lib/LayoutEvents';
import styles from './Tokens.less';
import cn from 'classnames';

export enum TokensInputType {
  WithReference,
  WithoutReference,
  Combined
}

export interface TokensProps<T> {
  type?: TokensInputType;
  selectedItems: T[];
  onChange: (items: T[]) => void;
  getItems?: (query: string) => Promise<T[]>;
  hideMenuIfEmptyInputValue?: boolean;
  renderItem?: (item: T) => React.ReactNode;
  renderValue?: (item: T) => React.ReactNode;
  renderNotFound?: () => React.ReactNode;
  placeholder?: string;
  delimiters?: string[];
  error?: boolean;
  warning?: boolean;
}

export interface TokensState<T> {
  autocompleteItems?: T[];
  activeTokens: T[];
  inFocus?: boolean;
  inputValue: string;
  inputValueWidth: number;
  preventBlur?: boolean;
}

/**
 * DRAFT - поле с токенами
 */
export class Tokens<T = string> extends React.Component<
  TokensProps<T>,
  TokensState<T>
> {
  rootRef = React.createRef<HTMLDivElement>();
  inputRef = React.createRef<HTMLInputElement>();
  tokensInputMenu = React.createRef<TokensMenu<T>>();
  textHelperRef = React.createRef<TextWidthHelper>();
  wrapperRef = React.createRef<HTMLLabelElement>();

  get type() {
    return this.props.type ? this.props.type : TokensInputType.WithReference;
  }

  get delimiters() {
    return this.props.delimiters ? this.props.delimiters : [','];
  }

  get menuRef() {
    return (
      this.tokensInputMenu.current &&
      this.tokensInputMenu.current.getMenuRef().current
    );
  }

  isCursorVisibleForState(state: TokensState<T>) {
    return (
      state.inFocus &&
      (state.inputValue !== '' || state.activeTokens.length === 0)
    );
  }

  get isCursorVisible() {
    return this.isCursorVisibleForState(this.state);
  }

  state: TokensState<T> = {
    inputValue: '',
    inputValueWidth: 20,
    activeTokens: []
  };

  componentDidMount() {
    this.updateInputTextWidth();
    document.addEventListener('copy', this.handleCopy);
  }

  componentDidUpdate(prevProps: TokensProps<T>, prevState: TokensState<T>) {
    if (prevState.inputValue !== this.state.inputValue) {
      this.updateInputTextWidth();
    }
    if (
      prevState.activeTokens.length === 0 &&
      this.state.activeTokens.length > 0
    ) {
      this.dispatch({ type: 'SET_AUTOCOMPLETE_ITEMS', payload: undefined });
    }
    if (prevProps.selectedItems.length !== this.props.selectedItems.length) {
      LayoutEvents.emit();
    }
    if (!this.isCursorVisibleForState(prevState) && this.isCursorVisible) {
      this.tryGetItems();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('copy', this.handleCopy);
  }

  render(): JSX.Element {
    if (
      this.type !== TokensInputType.WithoutReference &&
      !this.props.getItems
    ) {
      throw Error('Missed getItems for type ' + this.type);
    }

    const showMenu =
      this.type !== TokensInputType.WithoutReference &&
      this.isCursorVisible &&
      this.state.activeTokens.length === 0 &&
      (this.state.inputValue !== '' || !this.props.hideMenuIfEmptyInputValue);

    const inputInlineStyles: React.CSSProperties = {
      // вычисляем ширину чтобы input автоматически перенёсся на следующую строку при необходимости
      width: Math.max(50, this.state.inputValueWidth! + 7),
      // input растягивается на всю ширину чтобы placeholder не обрезался
      flex:
        this.props.selectedItems && this.props.selectedItems.length === 0
          ? 1
          : undefined,
      // в ie не работает, но альтернативный способ --- дать tabindex для label --- предположительно ещё сложнее
      caretColor: this.isCursorVisible ? undefined : 'transparent'
    };

    return (
      <div data-tid="Tokens" ref={this.rootRef} className={styles.root}>
        {/* расчёт ширины текста с последующим обновлением ширины input */}
        <TextWidthHelper
          ref={this.textHelperRef}
          text={this.state.inputValue}
        />
        <label
          ref={this.wrapperRef}
          className={cn(styles.label, {
            [styles.labelFocused]: this.state.inFocus,
            [styles.error]: this.props.error,
            [styles.warning]: this.props.warning
          })}
          onMouseDown={this.handleWrapperMouseDown}
          onMouseUp={this.handleWrapperMouseUp}
        >
          <TokensTokens
            selectedItems={this.props.selectedItems}
            activeTokens={this.state.activeTokens}
            renderValue={this.props.renderValue}
            onRemoveToken={this.handleRemoveToken}
            onTokenClick={this.handleTokenClick}
          />
          <input
            type="text"
            ref={this.inputRef}
            value={this.state.inputValue}
            style={inputInlineStyles}
            autoComplete="off"
            spellCheck={false}
            className={styles.input}
            placeholder={
              this.props.selectedItems.length > 0
                ? undefined
                : this.props.placeholder
            }
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            onChange={this.handleChangeInputValue}
            onKeyDown={this.handleKeyDown}
            onPaste={this.handleInputPaste}
          />
        </label>
        {showMenu && (
          <TokensMenu
            ref={this.tokensInputMenu}
            anchorElement={this.inputRef.current!}
            inputValue={this.state.inputValue}
            onAddItem={this.handleAddItem}
            autocompleteItems={this.state.autocompleteItems}
            renderNotFound={this.props.renderNotFound}
            renderItem={this.props.renderItem}
            showAddItemHint={
              this.type === TokensInputType.Combined &&
              this.state.inputValue !== ''
            }
          />
        )}
      </div>
    );
  }

  private dispatch = (action: TokensInputAction, cb?: () => void) => {
    this.setState(prevState => tokensReducer(prevState, action), cb);
  };

  private updateInputTextWidth() {
    const inputValueWidth = this.textHelperRef.current!.getTextWidth();
    this.dispatch(
      { type: 'SET_INPUT_VALUE_WIDTH', payload: inputValueWidth },
      LayoutEvents.emit
    );
  }

  private handleInputFocus = () => {
    this.dispatch({ type: 'SET_FOCUS_IN' });
  };

  private handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (this.isBlurToMenu(event) || this.state.preventBlur) {
      event.preventDefault();
      // первый focus нужен для предотвращения/уменьшения моргания в других браузерах
      this.inputRef.current!.focus();
      // в firefox не работает без второго focus
      process.nextTick(() => this.inputRef.current!.focus());
      this.dispatch({ type: 'SET_PREVENT_BLUR', payload: false });
    } else {
      this.dispatch({ type: 'BLUR' });
    }
  };

  private isBlurToMenu = (event: FocusEvent<HTMLElement>) => {
    if (this.menuRef) {
      const menu = ReactDOM.findDOMNode(this.menuRef) as HTMLElement | null;
      const relatedTarget = (event.relatedTarget ||
        document.activeElement) as HTMLElement;
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
      target &&
      this.wrapperRef.current!.contains(target) &&
      target !== this.wrapperRef.current! &&
      target !== this.inputRef.current!;
    if (!isClickOnToken) {
      this.dispatch({ type: 'REMOVE_ALL_ACTIVE_TOKENS' });
    }
  };

  private handleWrapperMouseUp = () => {
    this.dispatch({ type: 'SET_PREVENT_BLUR', payload: false });
  };

  private handleCopy = (event: any) => {
    if (
      !this.state.inFocus ||
      this.state.activeTokens.length === 0 ||
      this.isCursorVisible
    ) {
      return;
    }
    event.preventDefault();
    // упорядочивание токенов по индексу
    const tokens = this.state.activeTokens
      .map(token => this.props.selectedItems.indexOf(token))
      .sort()
      .map(index => this.props.selectedItems[index]);
    event.clipboardData.setData('text/plain', tokens.join(this.delimiters[0]));
  };

  private handleInputPaste = (event: React.ClipboardEvent<HTMLElement>) => {
    if (this.type === TokensInputType.WithReference || !event.clipboardData) {
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
      this.handleAddItems(tokens as any[]);
    }
  };

  private tryGetItems = async (query: string = '') => {
    if (
      this.props.getItems &&
      (this.state.inputValue !== '' || !this.props.hideMenuIfEmptyInputValue)
    ) {
      const autocompleteItems = await this.props.getItems(query);

      const autocompleteItemsUnique = autocompleteItems.filter(
        item => !this.props.selectedItems.includes(item)
      );
      if (query === '' || this.state.inputValue !== '') {
        this.dispatch(
          { type: 'SET_AUTOCOMPLETE_ITEMS', payload: autocompleteItemsUnique },
          () => {
            LayoutEvents.emit();
            this.highlightMenuItem();
          }
        );
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

    if (
      this.type !== TokensInputType.WithReference &&
      (event.key === 'Enter' || this.delimiters.includes(event.key))
    ) {
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
        this.inputRef.current!.blur();
        break;
      case 'Backspace':
        this.moveFocusToLastToken();
        break;
      case 'ArrowLeft':
        if (this.inputRef.current!.selectionStart === 0) {
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
    process.nextTick(() => this.inputRef.current!.focus());
  };

  private handleWrapperKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        const itemsNew = this.props.selectedItems.filter(
          item => !this.state.activeTokens.includes(item)
        );
        this.props.onChange(itemsNew);
        this.dispatch({ type: 'REMOVE_ALL_ACTIVE_TOKENS' }, () => {
          LayoutEvents.emit();
          this.inputRef.current!.focus();
        });
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        this.handleWrapperArrows(event);
        break;
      case 'Escape':
        this.wrapperRef.current!.blur();
        break;
      case 'a':
        if (event.ctrlKey) {
          event.preventDefault();
          this.dispatch({
            type: 'SET_ACTIVE_TOKENS',
            payload: this.props.selectedItems
          });
        }
        break;
    }
  };

  private handleWrapperArrows = (event: KeyboardEvent<HTMLElement>) => {
    event.preventDefault();
    const activeTokens = this.state.activeTokens;
    const activeItemIndex = this.props.selectedItems.indexOf(activeTokens[0]);
    const newItemIndex =
      activeItemIndex + (event.key === 'ArrowLeft' ? -1 : +1);
    const isLeftEdge = activeItemIndex === 0 && event.key === 'ArrowLeft';
    const isRightEdge =
      activeItemIndex === this.props.selectedItems.length - 1 &&
      event.key === 'ArrowRight';
    if (!event.shiftKey && activeTokens.length === 1) {
      this.handleWrapperArrowsWithoutShift(
        isLeftEdge,
        isRightEdge,
        newItemIndex
      );
    } else {
      this.handleWrapperArrowsWithShift(isLeftEdge, isRightEdge, newItemIndex);
    }
  };

  private handleWrapperArrowsWithoutShift = (
    isLeftEdge: boolean,
    isRightEdge: boolean,
    newItemIndex: number
  ) => {
    if (isRightEdge) {
      this.dispatch({ type: 'REMOVE_ALL_ACTIVE_TOKENS' }, () =>
        this.inputRef.current!.focus()
      );
    } else if (!isLeftEdge) {
      this.dispatch({
        type: 'SET_ACTIVE_TOKENS',
        payload: [this.props.selectedItems[newItemIndex]]
      });
    }
  };

  private handleWrapperArrowsWithShift = (
    isLeftEdge: boolean,
    isRightEdge: boolean,
    newItemIndex: number
  ) => {
    if (!isLeftEdge && !isRightEdge) {
      const itemNew = this.props.selectedItems[newItemIndex];
      const itemsNew = [
        itemNew,
        ...this.state.activeTokens.filter(item => item !== itemNew)
      ];
      this.dispatch({ type: 'SET_ACTIVE_TOKENS', payload: itemsNew });
    }
  };

  private handleAddItem = (item: T) => {
    if (this.props.selectedItems.includes(item)) {
      return;
    }
    this.handleAddItems([item]);
    this.dispatch({ type: 'CLEAR_INPUT' });
    this.tryGetItems();
  };

  private handleAddItems(items: T[]) {
    items = items.filter(item => !this.props.selectedItems.includes(item));
    const newItems = this.props.selectedItems.concat(items);
    this.props.onChange(newItems);
  }

  private handleRemoveToken = (item: T) => {
    this.props.onChange(this.props.selectedItems.filter(_ => _ !== item));
    const filteredActiveTokens = this.state.activeTokens.filter(
      _ => _ !== item
    );
    this.dispatch({ type: 'SET_ACTIVE_TOKENS', payload: filteredActiveTokens });
    if (filteredActiveTokens.length === 0) {
      this.focusInput();
    }
  };

  private handleTokenClick = (
    event: React.MouseEvent<HTMLElement>,
    itemNew: T
  ) => {
    const items = this.state.activeTokens;
    if (event.ctrlKey) {
      const newItems = this.state.activeTokens.includes(itemNew)
        ? items.filter(item => item !== itemNew)
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
    this.dispatch({ type: 'UPDATE_QUERY', payload: query }, () =>
      this.tryGetItems(query)
    );
  };

  private highlightMenuItem = () => {
    if (
      this.menuRef &&
      this.state.autocompleteItems &&
      this.state.autocompleteItems.length > 0 &&
      this.type !== TokensInputType.Combined
    ) {
      this.menuRef.highlightItem(0);
    }
  };
}
