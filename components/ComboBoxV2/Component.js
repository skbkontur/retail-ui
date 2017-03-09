//@flow
/* global React$Element */
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import shallowEqual from 'fbjs/lib/shallowEqual';

import type Input from '../Input/Input';
import type Menu from '../Menu/Menu';
import MenuItem from '../MenuItem';
import View from './View';

type State<T> = {|
  editing: boolean,
  inputChanged: boolean,
  items: ?(T[]),
  loading: boolean,
  opened: boolean,
  textValue: string,
  requestError: ?any
|};

type Props<T> = {|
  debounceInterval: number,
  error?: boolean,
  onBlur?: () => void,
  onChange: (T) => void,
  onFocus?: () => void,
  onSearchRequest: (query: string) => Promise<T[]>,
  onUnexpectedInput?: (query: string) => void,
  placeholder?: string,
  renderItem: (item: T, index: number) => string | React$Element<any>,
  renderNotFound: () => string | React$Element<*>,
  renderValue: (T) => string | React$Element<*>,
  value?: T,
  valueToString: (T) => string,
  totalCount?: number,
  renderTotalCount?: (found: number, total: number) => string | React$Element<*>
|};

class ComboBoxComponent extends Component {
  static defaultProps = {
    debounceInterval: 150
  };

  props: Props<*>;

  state: State<*> = {
    editing: false,
    inputChanged: false,
    items: null,
    loading: false,
    opened: false,
    textValue: '',
    requestError: null
  };

  input: Input;
  menu: Menu;
  _requestId = 0;
  _debouncedHandleSearch: Function;
  _focused: boolean = false;

  constructor(props: Props<*>) {
    super(props);

    this._debouncedHandleSearch = debounce(
      this._handleSearch,
      this.props.debounceInterval
    );
  }

  focus = () => {
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
      editing: this.state.editing,
      error: this.props.error,
      items: this.state.items,
      loading: this.state.loading,
      opened: this.state.opened,
      placeholder: this.props.placeholder,
      textValue: this.state.textValue,
      totalCount: this.props.totalCount,
      value: this.props.value,

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

  _refInput = (input: Input) => {
    this.input = input;
  };

  _refMenu = (menu: Menu) => {
    this.menu = menu;
  };

  _handleActivate = () => {
    const { valueToString, value } = this.props;

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
    const { textValue, inputChanged } = this.state;
    if (!inputChanged) {
      this._close();
      return;
    }
    if (this.props.onUnexpectedInput) {
      this.props.onUnexpectedInput(textValue);
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
    const expectingId = ++this._requestId;

    this.setState({ loading: true, items: null, opened: true });

    onSearchRequest(query)
      .then(items => {
        if (this._requestId !== expectingId) {
          return;
        }
        this._handleSetItems(items);
      })
      .catch(this._handleRequestError);
  };

  _handleRequestError = () => {
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
  }

  _handleSetItems = (items?: *[]) => {
    const { value } = this.props;
    this.setState({ items, loading: false }, () => {
      if (!this.menu) {
        return;
      }

      let index = -1;
      if (value && items && items.length) {
        index = items.findIndex(x => shallowEqual(x, value));
      }

      if (index >= 0) {
        this.menu._highlightItem(index);
        process.nextTick(this.menu._scrollToSelected);
      } else {
        this.menu.down();
      }
    });
  }

  _handleSelect = (item: *) => {
    this.setState({ inputChanged: false, textValue: '' });
    if (this.props.onChange) {
      this.props.onChange(item);
    }
    this._close();
  };
}

export default ComboBoxComponent;
