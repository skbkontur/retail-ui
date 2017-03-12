//@flow
/* global React$Element */
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import shallowEqual from 'fbjs/lib/shallowEqual';

import type Input from '../Input/Input';
import type Menu from '../Menu/Menu';
import MenuItem from '../MenuItem';
import View from './ComboBoxView';

type Props<T> = {|
  debounceInterval: number,

  disabled?: boolean,

  error?: boolean,

  onBlur?: () => void,

  onChange?: (T) => void,

  onFocus?: () => void,

  /**
   * Функция должна возвращать Promise с массивом элементов.
   * Элементы могут быть любого типа.
   */
  onSearchRequest?: (query: string) => Promise<T[]>,

  /**
   * Функция для обработки ситуации, когда было введена
   * строка в инпут и был потерян фокус с элемента
   */
  onUnexpectedInput?: (query: string) => ?boolean,

  placeholder?: string,

  /**
   * Функция отрисовки элементов результата поиска.
   * Не применяется если элемент является функцией или React-элементом.
   * По умолчанию `x => x`
   */
  renderItem?: (item: T, index: number) => string | React$Element<any>,

  /**
   * Функция для отрисовки сообщения о пустом результате поиска
   */
  renderNotFound?: () => string | React$Element<*>,

  /**
   * Функция отрисовки выбранного значения
   */
  renderValue?: (T) => string | React$Element<*>,

  /**
   * Выбранное значение
   */
  value?: T,

  /**
   * Необходим, в случае если `onSearchRequest` возвращает элементы,
   * у которых тип отличается от `value`, для сравнения полученных
   * результатов с `value`
   */
  valueToItem?: (T) => any,

  /**
   * Необходим для преобразования `value` в строку при фокусировке
   */
  valueToString: (T) => string,

  /**
   * Необходим для работы `renderTotalCount`
   */
  totalCount?: number,

  /**
   * Функция отображающаяя сообщение об общем количестве элементе
   */
  renderTotalCount?:
    (found: number, total: number) => string | React$Element<*>,

  warning?: boolean,

  width?: string | number
|};

class ComboBoxV2 extends Component {
  static defaultProps = {
    debounceInterval: 300,
    valueToString: ((x => x): (item: *) => string)
  };

  props: Props<*>;

  state: {|
    editing: boolean,
    inputChanged: boolean,
    items: ?Array<any>,
    loading: boolean,
    opened: boolean,
    textValue: string
  |} = {
    editing: false,
    inputChanged: false,
    items: null,
    loading: false,
    opened: false,
    textValue: ''
  };

  input: Input;
  menu: Menu;
  _requestId = 0;
  _debouncedHandleSearch: Function;
  _focused: boolean = false;
  _mounted: boolean;

  constructor(props: Props<*>) {
    super(props);

    this._debouncedHandleSearch = debounce(x => {
      if (!this._focused) {
        return;
      }
      this._handleSearch(x);
    }, this.props.debounceInterval);
  }

  focus = () => {
    if (this.props.disabled) {
      return;
    }

    if (this.input) {
      this.input.focus();
      this.input.setSelectionRange(0, this.state.textValue.length);
    }

    if (this._focused) {
      return;
    }
    this._focused = true;

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  render() {
    const viewProps = {
      disabled: this.props.disabled,
      editing: this.state.editing,
      error: this.props.error,
      items: this.state.items,
      loading: this.state.loading,
      opened: this.state.opened,
      placeholder: this.props.placeholder,
      textValue: this.state.textValue,
      totalCount: this.props.totalCount,
      value: this.props.value,
      warning: this.props.warning,
      width: this.props.width,

      onChange: this._handleSelect,
      onClickOutside: this._handleBlur,
      onFocus: this._handleActivate,
      onFocusOutside: this._handleBlur,
      onInputChange: this._handleInputChange,
      onInputFocus: this._handleInputFocus,
      onInputKeyDown: this._handleInputKeyDown,
      renderItem: this.props.renderItem,
      renderNotFound: this.props.renderNotFound,
      renderValue: this.props.renderValue,
      renderTotalCount: this.props.renderTotalCount,

      refInput: this._refInput,
      refMenu: this._refMenu
    };

    return <View {...viewProps} />;
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _refInput = (input: Input) => {
    this.input = input;
  };

  _refMenu = (menu: Menu) => {
    this.menu = menu;
  };

  _handleSelect = (item: *) => {
    this.setState({ inputChanged: false, textValue: '' });
    if (this.props.onChange) {
      this.props.onChange(item);
    }
    this._close();
  };

  _handleActivate = () => {
    const { valueToString, value, disabled } = this.props;

    if (disabled) {
      return;
    }

    let textValue = '';
    if (valueToString && value) {
      textValue = valueToString(value);
    }

    this.setState({ editing: true, textValue }, this.focus);
    this._handleSearch('');
  };

  _handleInputFocus = () => {
    if (this.state.inputChanged) {
      this._handleSearch(this.state.textValue);
    }
    this.focus();
  };

  _handleInputChange = (_, textValue) => {
    this.setState({ textValue, inputChanged: true });
    this._debouncedHandleSearch(textValue);
  };

  _handleInputKeyDown = (event: SyntheticKeyboardEvent) => {
    const menu = this.menu;

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (menu && menu._highlighted != null) {
          menu.enter();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._open();
        menu && menu.up();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this._open();
        menu && menu.down();
        break;
      case 'Escape':
        event.preventDefault();
        this.setState({ opened: false });
        break;
    }
  };

  _handleBlur = () => {
    if (!this._focused) {
      return;
    }
    this._focused = false;

    this.setState({ opened: false });

    this._handleUnexpectedInput();

    if (this.props.onBlur) {
      this.props.onBlur();
    }
    if (this.input) {
      this.input.blur();
    }
  };

  _handleUnexpectedInput() {
    const { textValue, inputChanged, items } = this.state;
    if (items && items.length === 1) {
      this._handleSelect(items[0]);
      return;
    }

    if (!inputChanged) {
      this._close();
      return;
    }

    if (this.props.onUnexpectedInput) {
      if (this.props.onUnexpectedInput(textValue)) {
        this.setState({ editing: false });
      }
    }
  }

  _close = () => {
    this.setState({ opened: false, editing: false });
  };

  _open = () => {
    this.setState({ opened: true });
  };

  _handleSearch = (query: string) => {
    const { onSearchRequest } = this.props;
    if (!onSearchRequest) {
      return;
    }
    const expectingId = ++this._requestId;

    this._handleStartLoading();

    onSearchRequest(query)
      .then(
        items => {
          if (this._requestId !== expectingId) {
            return;
          }
          this._handleSetItems(items);
        },
        this._handleRequestError
      )
      .then(() => this._handleEndLoading(expectingId));
  };

  _handleStartLoading = () => {
    this.setState({ loading: true, opened: true, items: null });
  };

  _handleEndLoading = (expectingId) => {
    if (!this._mounted) {
      return;
    }

    if (this._requestId !== expectingId) {
      return;
    }

    this.setState({ loading: false }, this._highlightItem);
  };

  _handleRequestError = () => {
    if (!this._mounted) {
      return;
    }

    const items = [
      <MenuItem disabled>
        <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>
          Что-то пошло не так. Проверьте соединение{' '}
          с интернетом и попробуйте еще раз
        </div>
      </MenuItem>,
      <MenuItem
        alkoLink
        onClick={() => this._handleSearch(this.state.textValue)}
      >
        Обновить
      </MenuItem>
    ];
    this._handleSetItems(items);
  };

  _handleSetItems = (items?: any[]) => {
    if (!this._mounted) {
      return;
    }

    this.setState({ items });
  };

  _highlightItem = () => {
    if (!this._mounted) {
      return;
    }

    const { value } = this.props;
    const { items } = this.state;
    if (!this.menu) {
      return;
    }

    let index = -1;
    if (value && items && items.length) {
      index = items.findIndex(x => is(x, value, this.props.valueToItem));
    }

    this.menu._highlightItem(index);
    if (index >= 0) {
      process.nextTick(() => this.menu && this.menu._scrollToSelected());
    } else {
      /* highlight first available element */
      process.nextTick(() => this.menu && this.menu.down());
    }
  }
}

function is(value, item, valueToItem = x => x) {
  if (typeof item === 'function' || React.isValidElement(item)) {
    const element = typeof item === 'function' ? item() : item;
    return shallowEqual(valueToItem(value), element.props);
  }
  return shallowEqual(valueToItem(value), item);
}

export default ComboBoxV2;
