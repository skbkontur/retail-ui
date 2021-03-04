import React, { ChangeEvent, FocusEvent, FocusEventHandler, KeyboardEvent, MouseEventHandler, ReactNode } from 'react';
import { findDOMNode } from 'react-dom';
import isEqual from 'lodash.isequal';
import cn from 'classnames';

import {
  isKeyArrowHorizontal,
  isKeyArrowLeft,
  isKeyArrowRight,
  isKeyArrowUp,
  isKeyArrowVertical,
  isKeyBackspace,
  isKeyDelete,
  isKeyEnter,
  isKeyEscape,
  isShortcutSelectAll,
} from '../../lib/events/keyboard/identifiers';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { Menu } from '../../internal/Menu';
import { Token, TokenProps } from '../Token';
import { MenuItemState } from '../MenuItem';
import { emptyHandler } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { locale } from '../../lib/locale/decorators';
import { MenuItem } from '../MenuItem/MenuItem';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { TokenInputLocale, TokenInputLocaleHelper } from './locale';
import { jsStyles } from './TokenInput.styles';
import { TokenInputAction, tokenInputReducer } from './TokenInputReducer';
import { TokenInputMenu } from './TokenInputMenu';
import { TextWidthHelper } from './TextWidthHelper';

export enum TokenInputType {
  WithReference,
  WithoutReference,
  Combined,
}

export interface TokenInputProps<T> extends CommonProps {
  selectedItems: T[];
  onValueChange: (items: T[]) => void;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  onFocus: FocusEventHandler<HTMLTextAreaElement>;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
  autoFocus?: boolean;
  type?: TokenInputType;

  /**
   * Функция поиска элементов, должна возвращать Promise с массивом элементов.
   * По умолчанию ожидаются строки.
   *
   * Элементы могут быть любого типа. В этом случае необходимо определить
   * свойства `renderItem`, `valueToString`
   */
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
  delimiters: string[];
  error?: boolean;
  warning?: boolean;
  disabled?: boolean;
  width?: string | number;
  maxMenuHeight?: number | string;
  renderToken?: (item: T, props: Partial<TokenProps>) => ReactNode;
  /**
   * Вызывается при изменении текста в поле ввода,
   */
  onInputValueChange?: (value: string) => void;
  /**
   * Функция отрисовки кнопки добавления в выпадающем списке
   */
  renderAddButton?: (query?: string, onAddItem?: () => void) => ReactNode;
  /**
   * Функция для обработки ситуации, когда была введена
   * строка в инпут и был потерян фокус с компонента
   *
   * Функция срабатывает с аргументом инпута строки
   *
   * Если при потере фокуса в выпадающем списке будет только один
   * элемент и  результат `valueToString` с этим элементом будет
   * совпадать со значение в текстовом поле, то
   * сработает `onValueChange` со значением данного элемента
   *
   * Сама функция также может вернуть значение,
   * неравное `undefined`, с которым будет вызван `onValueChange`.
   * Если возвращаемое значение будет равно `null`,
   * то сработает очистка текущего значения инпута,
   * а в режиме редактирования токен будет удален
   */
  onUnexpectedInput?: (value: string) => void | null | undefined | T;
}

export interface TokenInputState<T> {
  autocompleteItems?: T[];
  activeTokens: T[];
  editingTokenIndex: number;
  clickedToken?: T;
  clickedTokenTimeout?: number;
  inFocus?: boolean;
  inputValue: string;
  reservedInputValue: string | undefined;
  inputValueWidth: number;
  inputValueHeight: number;
  preventBlur?: boolean;
  loading?: boolean;
}

export const DefaultState = {
  inputValue: '',
  reservedInputValue: undefined,
  autocompleteItems: undefined,
  activeTokens: [],
  editingTokenIndex: -1,
  inFocus: false,
  loading: false,
  preventBlur: false,
  inputValueWidth: 2,
  inputValueHeight: 22,
};

const defaultToKey = <T extends any>(item: T): string => item.toString();
const identity = <T extends any>(item: T): T => item;
const defaultRenderToken = <T extends any>(
  item: T,
  { isActive, onClick, onDoubleClick, onRemove, disabled }: Partial<TokenProps>,
) => (
  <Token
    key={item.toString()}
    isActive={isActive}
    onClick={onClick}
    onDoubleClick={onDoubleClick}
    onRemove={onRemove}
    disabled={disabled}
  >
    {item}
  </Token>
);

@locale('TokenInput', TokenInputLocaleHelper)
export class TokenInput<T = string> extends React.PureComponent<TokenInputProps<T>, TokenInputState<T>> {
  public static __KONTUR_REACT_UI__ = 'TokenInput';

  public static defaultProps: Partial<TokenInputProps<any>> = {
    selectedItems: [],
    delimiters: [',', ' '],
    renderItem: identity,
    renderValue: identity,
    valueToString: identity,
    valueToItem: (item: string) => item,
    toKey: defaultToKey,
    onValueChange: () => void 0,
    width: 250 as string | number,
    onBlur: emptyHandler,
    onFocus: emptyHandler,
    onMouseEnter: emptyHandler,
    onMouseLeave: emptyHandler,
  };

  public state: TokenInputState<T> = DefaultState;

  private readonly locale!: TokenInputLocale;
  private theme!: Theme;
  private input: HTMLTextAreaElement | null = null;
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
      this.tryGetItems(this.isEditingMode ? '' : this.state.inputValue);
    }
  }

  public componentWillUnmount() {
    document.removeEventListener('copy', this.handleCopy);
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    if (this.type !== TokenInputType.WithoutReference && !this.props.getItems) {
      throw Error('Missed getItems for type ' + this.type);
    }

    const {
      selectedItems,
      width,
      maxMenuHeight,
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

    const {
      activeTokens,
      inFocus,
      inputValueWidth,
      inputValue,
      reservedInputValue,
      autocompleteItems,
      loading,
      inputValueHeight,
    } = this.state;

    const showMenu =
      this.type !== TokenInputType.WithoutReference &&
      this.isCursorVisible &&
      activeTokens.length === 0 &&
      (inputValue !== '' || !hideMenuIfEmptyInputValue);

    const theme = this.theme;

    const lineHeight = parseInt(theme.tokenInputLineHeight, 10) || 0;

    const inputInlineStyles: React.CSSProperties = {
      // вычисляем ширину чтобы input автоматически перенёсся на следующую строку при необходимости
      width: inputValueWidth,
      height: Math.max(lineHeight, inputValueHeight),
      // input растягивается на всю ширину чтобы placeholder не обрезался
      flex: selectedItems && selectedItems.length === 0 ? 1 : undefined,
      // в ie не работает, но альтернативный способ --- дать tabindex для label --- предположительно ещё сложнее
      caretColor: this.isCursorVisible ? undefined : 'transparent',
    };

    const labelClassName = cn(jsStyles.label(theme), {
      [jsStyles.labelFocused(theme)]: !!inFocus,
      [jsStyles.error(theme)]: !!error,
      [jsStyles.warning(theme)]: !!warning,
      [jsStyles.labelDisabled(theme)]: !!disabled,
    });
    const inputClassName = cn(jsStyles.input(theme), {
      [jsStyles.inputDisabled(theme)]: !!disabled,
      [jsStyles.inputEditing(theme)]: this.isEditingMode,
    });

    return (
      <CommonWrapper {...this.props}>
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <label
            ref={this.wrapperRef}
            style={{ width }}
            className={labelClassName}
            onMouseDown={this.handleWrapperMouseDown}
            onMouseUp={this.handleWrapperMouseUp}
          >
            <TextWidthHelper
              ref={this.textHelperRef}
              classHelp={cn(jsStyles.helperText(theme), {
                [jsStyles.helperTextEditing(theme)]: this.isEditingMode,
              })}
              text={inputValue}
              theme={this.theme}
            />
            {this.renderTokensStart()}
            <textarea
              ref={this.inputRef}
              value={inputValue}
              style={inputInlineStyles}
              autoComplete="off"
              spellCheck={false}
              disabled={disabled}
              className={inputClassName}
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
                maxMenuHeight={maxMenuHeight}
                anchorElement={this.input!}
                renderNotFound={renderNotFound}
                renderItem={renderItem}
                onValueChange={this.selectItem}
                renderAddButton={this.renderAddButton}
              />
            )}
            {this.renderTokensEnd()}
            {this.isEditingMode ? <span className={jsStyles.reservedInput(theme)}>{reservedInputValue}</span> : null}
          </label>
        </div>
      </CommonWrapper>
    );
  }

  /**
   * Сбрасывает введенное пользователем значение
   * @public
   */
  public reset() {
    this.dispatch({ type: 'RESET' });
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
    const value = this.props.valueToItem(this.state.inputValue);

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

  private get menuRef(): Menu | null {
    return this.tokensInputMenu && this.tokensInputMenu.getMenuRef();
  }

  private get isCursorVisible() {
    return this.isCursorVisibleForState(this.state);
  }

  private get isEditingMode() {
    return this.state.editingTokenIndex > -1;
  }

  private isCursorVisibleForState(state: TokenInputState<T>) {
    return state.inFocus && (state.inputValue !== '' || state.activeTokens.length === 0);
  }

  private inputRef = (node: HTMLTextAreaElement) => (this.input = node);
  private tokensInputMenuRef = (node: TokenInputMenu<T>) => (this.tokensInputMenu = node);
  private textHelperRef = (node: TextWidthHelper) => (this.textHelper = node);
  private wrapperRef = (node: HTMLLabelElement) => (this.wrapper = node);

  private dispatch = (action: TokenInputAction, cb?: () => void) => {
    this.setState(prevState => tokenInputReducer(prevState, action), cb);
  };

  private updateInputTextWidth() {
    if (this.textHelper) {
      // в IE текст иногда не помещается в input
      // из-за округления, поэтому округляем явно
      const inputValueWidth = parseFloat(this.textHelper.getTextWidth().toFixed(2));
      const inputValueHeight = parseFloat(this.textHelper.getTextHeight().toFixed(2));

      this.dispatch({ type: 'SET_INPUT_VALUE_WIDTH', payload: inputValueWidth }, LayoutEvents.emit);
      this.dispatch({ type: 'SET_INPUT_VALUE_HEIGHT', payload: inputValueHeight }, LayoutEvents.emit);
    }
  }

  private handleInputFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    this.dispatch({ type: 'SET_FOCUS_IN' });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleInputBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    const isBlurToMenu = this.isBlurToMenu(event);

    if (!isBlurToMenu) {
      this.handleOutsideBlur();
    }

    if (isBlurToMenu || this.state.preventBlur) {
      event.preventDefault();
      // первый focus нужен для предотвращения/уменьшения моргания в других браузерах
      this.input!.focus();
      // в firefox не работает без второго focus
      process.nextTick(() => this.input!.focus());
      this.dispatch({ type: 'SET_PREVENT_BLUR', payload: false });
    } else {
      this.dispatch({ type: 'BLUR' });
      this.props.onBlur?.(event);
    }
  };

  private handleOutsideBlur = () => {
    const { inputValue, autocompleteItems } = this.state;
    const { valueToString } = this.props;

    if (inputValue === '') {
      // если стерли содержимое токена в режиме редактирования, то удаляем токен
      if (this.isEditingMode) {
        this.finishTokenEdit();
      }
      return;
    }

    // если не изменилось значение токена при редактировании
    if (this.isEditingMode && !this.isTokenValueChanged) {
      this.finishTokenEdit();
      return;
    }

    // чекаем автокомплит на совпадение с введеным значением в инпут
    if (autocompleteItems && autocompleteItems.length === 1) {
      const item = autocompleteItems[0];

      if (valueToString(item) === inputValue) {
        this.isEditingMode ? this.finishTokenEdit() : this.selectItem(item);

        return;
      }
    }

    if (this.isInputChanged) this.checkForUnexpectedInput();
  };

  private get isInputChanged() {
    if (this.isEditingMode) {
      return this.isTokenValueChanged;
    }

    return this.isInputValueChanged;
  }

  private get isInputValueChanged() {
    const { inputValue } = this.state;

    return inputValue !== '';
  }

  private get isTokenValueChanged() {
    const { inputValue, editingTokenIndex } = this.state;
    const { selectedItems, valueToString } = this.props;

    if (this.isEditingMode) {
      return valueToString(selectedItems[editingTokenIndex]) !== inputValue;
    }

    return false;
  }

  private isBlurToMenu = (event: FocusEvent<HTMLElement>) => {
    if (this.menuRef) {
      const menu = findDOMNode(this.menuRef) as HTMLElement | null;
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
    event.clipboardData.setData('text/plain', tokens.join(this.props.delimiters[0]));
  };

  private handleInputPaste = (event: React.ClipboardEvent<HTMLElement>) => {
    if (this.type === TokenInputType.WithReference || !event.clipboardData) {
      return;
    }
    let paste = event.clipboardData.getData('text');
    const { delimiters } = this.props;
    if (delimiters.some(delimiter => paste.includes(delimiter))) {
      event.preventDefault();
      event.stopPropagation();
      for (const delimiter of delimiters) {
        paste = paste.split(delimiter).join(delimiters[0]);
      }
      const tokens = paste.split(delimiters[0]);
      const items = tokens
        .map(token => this.props.valueToItem(token))
        .filter(item => !this.hasValueInItems(this.props.selectedItems, item));
      const newItems = this.props.selectedItems.concat(items);
      this.props.onValueChange(newItems);

      this.dispatch({ type: 'SET_AUTOCOMPLETE_ITEMS', payload: undefined });
      this.tryGetItems();
    }
  };

  private tryGetItems = async (query = '') => {
    if (this.props.getItems && (this.state.inputValue !== '' || !this.props.hideMenuIfEmptyInputValue)) {
      this.dispatch({ type: 'SET_LOADING', payload: true });
      const autocompleteItems = await this.props.getItems(query);
      this.dispatch({ type: 'SET_LOADING', payload: false });

      const isSelectedItem = (item: T) => this.hasValueInItems(this.props.selectedItems, item);
      const isEditingItem = (item: T) => {
        const editingItem = this.props.selectedItems[this.state.editingTokenIndex];
        return !!editingItem && isEqual(item, editingItem);
      };

      const autocompleteItemsUnique = autocompleteItems.filter(item => !isSelectedItem(item) || isEditingItem(item));

      if (this.isEditingMode) {
        const editingItem = this.props.selectedItems[this.state.editingTokenIndex];
        if (
          isEqual(editingItem, this.props.valueToItem(this.state.inputValue)) &&
          !this.hasValueInItems(autocompleteItemsUnique, editingItem)
        ) {
          autocompleteItemsUnique.unshift(editingItem);
        }
      }

      if (query === '' || this.state.inputValue !== '') {
        this.dispatch({ type: 'SET_AUTOCOMPLETE_ITEMS', payload: autocompleteItemsUnique }, () => {
          LayoutEvents.emit();
          this.highlightMenuItem();
        });
      }
      const selectItemIndex = autocompleteItemsUnique.findIndex(
        item => this.props.valueToString(item).toLowerCase() === this.state.inputValue.toLowerCase(),
      );
      if (this.menuRef) {
        this.menuRef.highlightItem(selectItemIndex < 0 ? 0 : selectItemIndex);
      }
    }
  };

  private handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (this.isCursorVisible) {
      this.handleInputKeyDown(event);
    } else {
      this.handleWrapperKeyDown(event);
    }
  };

  private handleInputKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();

    if (this.type !== TokenInputType.WithReference && this.props.delimiters.includes(e.key)) {
      e.preventDefault();
      const newValue = this.state.inputValue;
      if (newValue !== '') {
        if (this.isEditingMode) {
          this.finishTokenEdit();
        } else {
          this.handleAddItem();
        }
      }
    }

    switch (true) {
      case isKeyEnter(e):
        if (this.menuRef) {
          this.menuRef.enter(e);
        }
        // don't allow textarea
        // became multiline
        e.preventDefault();
        break;
      case isKeyArrowVertical(e):
        e.preventDefault();
        if (this.menuRef) {
          if (isKeyArrowUp(e)) {
            this.menuRef.up();
          } else {
            this.menuRef.down();
          }
        }
        break;
      case isKeyEscape(e):
        this.input!.blur();
        break;
      case isKeyBackspace(e):
        if (!this.isEditingMode) this.moveFocusToLastToken();
        break;
      case isKeyArrowLeft(e):
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

  private selectInputText = () => {
    if (this.input) {
      this.input.setSelectionRange(0, this.state.inputValue.length);
    }
  };

  private handleWrapperKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    switch (true) {
      case isKeyBackspace(e):
      case isKeyDelete(e): {
        if (!this.isEditingMode) {
          const itemsNew = this.props.selectedItems.filter(
            item => !this.hasValueInItems(this.state.activeTokens, item),
          );
          this.props.onValueChange(itemsNew);
          this.dispatch({ type: 'REMOVE_ALL_ACTIVE_TOKENS' }, () => {
            LayoutEvents.emit();
            this.input!.focus();
          });
        }
        break;
      }
      case isKeyArrowHorizontal(e):
        this.handleWrapperArrows(e);
        break;
      case isKeyEscape(e):
        this.wrapper!.blur();
        break;
      case isKeyEnter(e):
        e.preventDefault();
        if (this.state.activeTokens.length === 1) {
          this.handleTokenEdit(this.state.activeTokens[0]);
        }
        break;
      case isShortcutSelectAll(e):
        e.preventDefault();
        this.dispatch({
          type: 'SET_ACTIVE_TOKENS',
          payload: this.props.selectedItems,
        });
        break;
    }
  };

  private handleWrapperArrows = (e: KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
    const activeTokens = this.state.activeTokens;
    const activeItemIndex = this.props.selectedItems.indexOf(activeTokens[0]);
    const newItemIndex = activeItemIndex + (isKeyArrowLeft(e) ? -1 : +1);
    const isLeftEdge = activeItemIndex === 0 && isKeyArrowLeft(e);
    const isRightEdge = activeItemIndex === this.props.selectedItems.length - 1 && isKeyArrowRight(e);
    if (!e.shiftKey && activeTokens.length === 1) {
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

  private handleValueChange = (items: T[]) => {
    this.props.onValueChange(items);
  };

  private handleAddItem = () => {
    const item = this.props.valueToItem(this.state.inputValue);
    if (item) {
      this.selectItem(item);
    }
  };

  private selectItem = (item: T) => {
    const { selectedItems } = this.props;

    if (this.isEditingMode) {
      this.dispatch({ type: 'UPDATE_QUERY', payload: this.props.valueToString(item) }, this.finishTokenEdit);
    } else {
      if (!this.hasValueInItems(selectedItems, item)) {
        this.handleValueChange(selectedItems.concat([item]));
        this.dispatch({ type: 'CLEAR_INPUT' });
        this.tryGetItems();
      }
    }
  };

  private handleRemoveToken = (item: T) => {
    this.props.onValueChange(this.props.selectedItems.filter(_ => !isEqual(_, item)));
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

  private handleTokenEdit = (itemNew: T) => {
    const editingTokenIndex = this.props.selectedItems.findIndex(item => item === itemNew);
    this.dispatch({ type: 'SET_EDITING_TOKEN_INDEX', payload: editingTokenIndex });

    if (this.state.inputValue !== '') {
      if (this.state.reservedInputValue === undefined)
        this.dispatch({ type: 'SET_TEMPORARY_QUERY', payload: this.state.inputValue });
    }
    this.dispatch({ type: 'UPDATE_QUERY', payload: this.props.valueToString(itemNew) }, this.selectInputText);
    this.dispatch({ type: 'REMOVE_ALL_ACTIVE_TOKENS' });

    this.tryGetItems();
  };

  private finishTokenEdit = () => {
    const { editingTokenIndex, inputValue, reservedInputValue } = this.state;
    const { selectedItems, valueToItem } = this.props;
    const editedItem = valueToItem(inputValue);
    const newItems = selectedItems.concat([]);

    if (!this.hasValueInItems(selectedItems, editedItem)) {
      newItems.splice(editingTokenIndex, 1, ...(inputValue !== '' ? [editedItem] : []));
      this.handleValueChange(newItems);
    }

    this.dispatch({ type: 'REMOVE_EDITING_TOKEN_INDEX' });

    if (reservedInputValue) {
      this.dispatch({ type: 'UPDATE_QUERY', payload: reservedInputValue });
      this.dispatch({ type: 'REMOVE_TEMPORARY_QUERY' });
    } else {
      this.dispatch({ type: 'CLEAR_INPUT' });
    }

    if (newItems.length === selectedItems.length) {
      this.dispatch({ type: 'SET_ACTIVE_TOKENS', payload: [newItems[editingTokenIndex]] });
    }
  };

  private checkForUnexpectedInput = () => {
    const { inputValue } = this.state;
    const { onUnexpectedInput } = this.props;

    if (onUnexpectedInput) {
      // чекаем не возвращает ли что-нибудь обработчик
      const returnedValue = onUnexpectedInput(inputValue);

      if (returnedValue === undefined) {
        return;
      }

      if (returnedValue === null) {
        this.dispatch({ type: 'CLEAR_INPUT' }, () => {
          if (this.isEditingMode) {
            this.finishTokenEdit();
          }
        });

        return;
      }

      if (returnedValue) {
        this.selectItem(returnedValue);
      }
    }
  };

  private handleChangeInputValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.dispatch({ type: 'REMOVE_ALL_ACTIVE_TOKENS' });
    let query = event.target.value.trimLeft();

    if (query.endsWith(' ')) {
      query = query.trimRight() + ' ';
    }
    if (this.state.inputValue !== '' && query === '') {
      this.dispatch({ type: 'SET_AUTOCOMPLETE_ITEMS', payload: undefined });
    }
    this.dispatch({ type: 'UPDATE_QUERY', payload: query }, () => {
      this.tryGetItems(query);
    });
    if (this.props.onInputValueChange) {
      this.props.onInputValueChange(query);
    }
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

  private renderTokensStart = () => {
    const { editingTokenIndex } = this.state;
    const { selectedItems } = this.props;
    const delimiter = editingTokenIndex >= 0 ? editingTokenIndex : selectedItems.length;
    return selectedItems.slice(0, delimiter).map(this.renderToken);
  };

  private renderTokensEnd = () => {
    if (this.state.editingTokenIndex >= 0) {
      return this.props.selectedItems.slice(this.state.editingTokenIndex + 1).map(this.renderToken);
    }
  };

  private renderToken = (item: T) => {
    const { renderToken = defaultRenderToken, disabled } = this.props;

    const isActive = this.state.activeTokens.includes(item);

    // TODO useCallback
    const handleIconClick: React.MouseEventHandler<HTMLElement> = event => {
      event.stopPropagation();
      if (!this.isEditingMode) {
        this.handleRemoveToken(item);
      }
    };

    // TODO useCallback
    const handleTokenClick: React.MouseEventHandler<HTMLDivElement> = event => {
      event.stopPropagation();
      if (!this.isEditingMode) {
        this.handleTokenClick(event, item);
      }
    };

    const handleTokenDoubleClick: React.MouseEventHandler<HTMLDivElement> = event => {
      event.stopPropagation();
      if (!this.isEditingMode) {
        this.handleTokenEdit(item);
      }
    };

    return renderToken(item, {
      isActive,
      onClick: handleTokenClick,
      onDoubleClick: handleTokenDoubleClick,
      onRemove: handleIconClick,
      disabled,
    });
  };

  private renderAddButton = (value = this.state.inputValue): React.ReactNode | undefined => {
    if (!this.showAddItemHint) {
      return;
    }

    if (this.props.renderAddButton) {
      return this.props.renderAddButton(value, this.handleAddItem);
    }

    const { addButtonComment, addButtonTitle } = this.locale;

    return (
      <MenuItem onClick={this.handleAddItem} comment={addButtonComment} key="renderAddButton">
        {addButtonTitle} {value}
      </MenuItem>
    );
  };
}
