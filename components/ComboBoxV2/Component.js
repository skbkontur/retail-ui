//@flow
/* global React$Element */
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import shallowEqual from 'fbjs/lib/shallowEqual';

import type Input from '../Input/Input';
import type Menu from '../Menu/Menu';
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
  };

  _handleInputChange = (_, textValue) => {
    this.setState({ textValue, inputChanged: true });
    this._debouncedHandleSearch(textValue);
  };

  _handleBlur = () => {
    this.setState({ opened: false });

    this._handleUnexpectedInput();

    if (this.props.onBlur) {
      this.props.onBlur();
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
      .catch(error => {
        this.setState({ requestError: error, loading: false });
      });
  };

  _handleSetItems(items?: *[]) {
    const { value } = this.props;
    this.setState({ items, loading: false }, () => {
      if (!this.menu) {
        return;
      }
      if (value && items && items.length) {
        let index = items.findIndex(x => shallowEqual(x, value));
        if (index < 0) {
          index = 0;
        }
        this.menu._highlightItem(index);
        // _highlightItem can be async
        process.nextTick(this.menu._scrollToSelected);
      } else {
        this.menu._highlightItem(0);
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
