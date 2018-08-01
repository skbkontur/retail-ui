import * as React from 'react';
import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import * as ReactDOM from 'react-dom';
import TextWidthHelper from './TextWidthHelper';
import { TokensTokens } from './TokensTokens';
import { TokensMenu } from './TokensMenu';
import { TokensInputAction, TokensReducer } from './TokensReducer';
import LayoutEvents from '../../lib/LayoutEvents';
import styles from './Tokens.less';
import cn from 'classnames';

export enum TokensInputType {
  WithReference,
  WithoutReference,
  Combined
}

interface Props<T> {
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
}

export interface State<T> {
  autocompleteItems?: T[];
  activeTokens: T[];
  inFocus?: boolean;
  inputValue: string;
  inputValueWidth: number;
}

export class Tokens<T = string> extends React.Component<Props<T>, State<T>> {
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

  state: State<T> = {
    inputValue: '',
    inputValueWidth: 20,
    activeTokens: []
  };

  componentDidMount() {
    this.updateInputTextWidth();
  }

  componentDidUpdate(prevProps: Props<T>, prevState: State<T>) {
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
      <div ref={this.rootRef} className={styles.root}>
        <TextWidthHelper
          ref={this.textHelperRef}
          text={this.state.inputValue}
        />
        <label
          ref={this.wrapperRef}
          className={cn(styles.label, {
            [styles.labelFocused]: this.state.inFocus
          })}
          tabIndex={0}
          onKeyDown={this.handleWrapperKeyDown}
          onBlur={this.handleWrapperBlur}
          onFocus={this.handleWrapperFocus}
        >
          <TokensTokens
            selectedItems={this.props.selectedItems}
            activeTokens={this.state.activeTokens}
            renderValue={this.props.renderValue}
            onRemoveToken={this.handleRemoveToken}
          />
          <input
            ref={this.inputRef}
            value={this.state.inputValue}
            style={inputInlineStyles}
            type="text"
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
    this.setState(prevState => TokensReducer(prevState, action), cb);
  };

  private updateInputTextWidth() {
    const inputValueWidth = this.textHelperRef.current!.getTextWidth();
    this.dispatch(
      { type: 'SET_INPUT_VALUE_WIDTH', payload: inputValueWidth },
      LayoutEvents.emit
    );
  }

  private handleInputFocus = async (event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (!this.state.inFocus) {
      this.dispatch({ type: 'SET_FOCUS_IN' });
    }
    if (!this.props.hideMenuIfEmptyInputValue) {
      this.tryGetItems(this.state.inputValue);
    }
  };

  private handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (this.isBlurToMenu(event)) {
      this.inputRef.current!.focus();
    } else if (!this.isBlurToWrapper(event)) {
      this.dispatch({ type: 'BLUR_FROM_INPUT' });
    }
  };

  private handleWrapperBlur = (event: FocusEvent<HTMLLabelElement>) => {
    if (event.relatedTarget !== this.inputRef.current!) {
      this.dispatch({ type: 'BLUR_FROM_WRAPPER' });
    }
    this.dispatch({ type: 'REMOVE_ALL_ACTIVE_TOKENS' });
  };

  private handleWrapperFocus = () => {
    if (!this.state.inFocus) {
      this.inputRef.current!.focus();
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
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (this.menuRef) {
      const menu = ReactDOM.findDOMNode(this.menuRef) as HTMLElement | null;
      if (menu && menu.contains(relatedTarget)) {
        return true;
      }
    }
    return false;
  };

  private isBlurToWrapper = (event: FocusEvent<HTMLElement>) => {
    const relatedTarget = event.relatedTarget as HTMLElement;
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
    const items = this.props.selectedItems;
    if (this.state.inputValue === '' && items && items.length > 0) {
      this.dispatch(
        { type: 'SET_ACTIVE_TOKENS', payload: items.slice(-1) },
        () => this.wrapperRef.current!.focus()
      );
    }
  }

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
    this.props.onChange([...this.props.selectedItems, item]);
    this.dispatch({ type: 'CLEAR_INPUT' });
    if (!this.props.hideMenuIfEmptyInputValue) {
      this.tryGetItems();
    }
  };

  private handleRemoveToken = (item: T) => {
    this.props.onChange(this.props.selectedItems.filter(_ => _ !== item));
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
