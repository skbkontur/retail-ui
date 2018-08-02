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
}

export class Tokens<T = string> extends React.Component<
  TokensProps<T>,
  TokensState<T>
> {
  rootRef = React.createRef<HTMLDivElement>();
  inputRef = React.createRef<HTMLInputElement>();
  tokensInputMenu = React.createRef<TokensMenu<T>>();
  textHelperRef = React.createRef<TextWidthHelper>();
  wrapperRef = React.createRef<HTMLDivElement>();

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
      this.state.inFocus &&
      this.state.activeTokens.length === 0 &&
      this.type !== TokensInputType.WithoutReference &&
      (this.state.inputValue !== '' || !this.props.hideMenuIfEmptyInputValue);

    const inputInlineStyles = {
      width: Math.max(50, this.state.inputValueWidth! + 7),
      flex:
        this.props.selectedItems && this.props.selectedItems.length === 0
          ? 1
          : undefined
    };

    return (
      <div ref={this.rootRef} className={styles.root} data-tid="Tokens">
        {/* hack */}
        <TextWidthHelper
          ref={this.textHelperRef}
          text={this.state.inputValue}
        />
        <div
          ref={this.wrapperRef}
          className={cn(styles.label, {
            [styles.labelFocused]: this.state.inFocus
          })}
          tabIndex={0}
          onKeyDown={this.handleWrapperKeyDown}
          onBlur={this.handleWrapperBlur}
          onClick={this.handleWrapperClick}
          onFocus={() => console.log('wrapper focus')}
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
            onKeyDown={this.handleInputKeyDown}
            onPaste={this.handleInputPaste}
          />
        </div>
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

  private getRelatedTarget(event: FocusEvent<HTMLElement>) {
    return (event.relatedTarget || document.activeElement) as HTMLElement;
  }

  private handleInputFocus = async (event: FocusEvent<HTMLInputElement>) => {
    console.log('handleInputFocus');
    // event.stopPropagation();
    if (!this.state.inFocus) {
      this.dispatch({ type: 'SET_FOCUS_IN' });
    }
    if (!this.props.hideMenuIfEmptyInputValue) {
      this.tryGetItems(this.state.inputValue);
    }
  };

  private handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    console.log('handleInputBlur', this.isBlurToMenu(event));
    event.stopPropagation();
    if (this.isBlurToMenu(event)) {
      this.focusInput();
    } else if (!this.isBlurToWrapper(event)) {
      this.dispatch({ type: 'BLUR' });
    }
  };

  private handleWrapperBlur = (event: FocusEvent<HTMLElement>) => {
    console.log(
      'handleWrapperBlur',
      event.relatedTarget,
      document.activeElement
    );
    if (!this.isBlurToWrapper(event)) {
      this.dispatch({ type: 'BLUR' });
    }
    this.dispatch({ type: 'REMOVE_ALL_ACTIVE_TOKENS' });
  };

  private handleWrapperClick = () => {
    console.log('handleWrapperClick');
    process.nextTick(() => {
      console.log(
        'handleWrapperClick 1',
        this.state.inFocus,
        this.state.activeTokens.length === 0
      );
      if (!this.state.inFocus && this.state.activeTokens.length === 0) {
        console.log('handleWrapperClick 2');
        this.inputRef.current!.focus();
      }
      this.dispatch({ type: 'SET_FOCUS_IN' });
    });
  };

  private handleCopy = (event: any) => {
    if (
      this.type === TokensInputType.WithReference ||
      !this.state.inFocus ||
      this.state.activeTokens.length === 0
    ) {
      return;
    }
    event.preventDefault();
    // упорядочивание токенов
    const tokens = this.state.activeTokens
      .map(token => this.props.selectedItems.indexOf(token))
      .sort()
      .map(index => this.props.selectedItems[index]);
    // const event = new ClipboardEvent('copy', { data: tokens.join(this.getCopyDelimeter()), dataType: 'text/plain' });
    // debugger
    // console.log(event)
    event.clipboardData.setData('text/plain', tokens.join(this.delimiters[0]));
  };

  private handleInputPaste = (event: React.ClipboardEvent<HTMLElement>) => {
    if (this.type === TokensInputType.WithReference) {
      return;
    }
    let paste = event.clipboardData.getData('text');
    const delimiters = this.delimiters;
    if (delimiters.some(delimeter => paste.includes(delimeter))) {
      event.preventDefault();
      event.stopPropagation();
      for (const delimeter of delimiters) {
        paste = paste.split(delimeter).join(delimiters[0]);
      }
      const tokens = paste.split(delimiters[0]);
      this.handleAddItems(tokens as any[]);
    }
  };

  private tryGetItems = async (query: string = '') => {
    if (this.props.getItems) {
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

  private isBlurToMenu = (event: FocusEvent<HTMLElement>) => {
    if (this.menuRef) {
      const menu = ReactDOM.findDOMNode(this.menuRef) as HTMLElement | null;
      if (menu && menu.contains(this.getRelatedTarget(event))) {
        return true;
      }
    }
    return false;
  };

  private isBlurToWrapper = (event: FocusEvent<HTMLElement>) => {
    // console.log('isBlurToWrapper', event.relatedTarget, document.activeElement);
    const relatedTarget = this.getRelatedTarget(event);
    return relatedTarget && this.rootRef.current!.contains(relatedTarget);
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
    console.log('moveFocusToLastToken');
    const items = this.props.selectedItems;
    if (this.state.inputValue === '' && items && items.length > 0) {
      this.dispatch(
        { type: 'SET_ACTIVE_TOKENS', payload: items.slice(-1) },
        this.focusWrapper
      );
    }
  }

  private focusInput = () => {
    process.nextTick(() => this.inputRef.current!.focus());
  };

  private focusWrapper = () => {
    console.log('focusWrapper', this.wrapperRef.current);
    process.nextTick(() => this.wrapperRef.current!.focus());
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
    if (!this.props.hideMenuIfEmptyInputValue) {
      this.tryGetItems();
    }
  };

  private handleAddItems(items: T[]) {
    items = items.filter(item => !this.props.selectedItems.includes(item));
    const newItems = this.props.selectedItems.concat(items);
    this.props.onChange(newItems);
  }

  private handleRemoveToken = (item: T) => {
    this.props.onChange(this.props.selectedItems.filter(_ => _ !== item));
  };

  private handleTokenClick = (
    event: React.MouseEvent<HTMLElement>,
    itemNew: T
  ) => {
    const items = this.state.activeTokens;
    if (event.ctrlKey) {
      const itemsNew = this.state.activeTokens.includes(itemNew)
        ? items.filter(item => item !== itemNew)
        : [...items, itemNew];
      this.dispatch({ type: 'SET_ACTIVE_TOKENS', payload: itemsNew });
    } else {
      this.dispatch({ type: 'SET_ACTIVE_TOKENS', payload: [itemNew] });
    }
  };

  private handleChangeInputValue = async (e: ChangeEvent<HTMLInputElement>) => {
    let query = e.target.value.trimLeft();
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
