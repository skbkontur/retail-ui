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
  items: ?(T[]),
  loading: boolean,
  opened: boolean,
  textValue: string,
  totalCount: ?number
|};

type Props<T> = {|
  debounceInterval: number,
  onChange: (T) => void,
  onSearchRequest: (query: string) => Promise<T[]>,
  placeholder?: string,
  renderItem: (T) => string | React$Element<*>,
  renderNotFound: () => string | React$Element<*>,
  renderValue: (T) => string | React$Element<*>,
  value?: T,
  valueToString?: (T) => string
|};

class ComboBoxComponent extends Component {
  static defaultProps = {
    debounceInterval: 300
  };

  props: Props<*>;

  state: State<*> = {
    editing: false,
    opened: false,
    loading: false,
    textValue: '',
    items: null,
    totalCount: null
  };

  input: Input;
  menu: Menu;
  _requestId = 0;
  _debouncedHandleSearch: Function;

  constructor(props: Props<*>) {
    super(props);

    this._debouncedHandleSearch = debounce(
      this._handleSearch,
      this.props.debounceInterval
    );
  }

  focus() {
    if (this.input) {
      this.input.focus();
      this.input.setSelectionRange(0, this.state.textValue.length);
    }
  }

  render() {
    const viewProps = {
      editing: this.state.editing,
      items: this.state.items,
      loading: this.state.loading,
      opened: this.state.opened,
      placeholder: this.props.placeholder,
      textValue: this.state.textValue,
      value: this.props.value,

      onChange: this._handleSelect,
      onClickOutside: this._close,
      onFocus: this._handleActivate,
      onFocusOutside: this._close,
      onInputChange: this._handleInputChange,
      renderItem: this.props.renderItem,
      renderNotFound: this.props.renderNotFound,
      renderValue: this.props.renderValue,

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

    this.setState({ opened: true, editing: true, textValue }, this.focus);
    this._handleSearch('');
  };

  _handleInputChange = (_, textValue) => {
    this.setState({ textValue });
    this._debouncedHandleSearch(textValue);
  };

  _close = () => {
    this.setState({ opened: false, editing: false, items: null });
  };

  _handleSearch = (query: string) => {
    const { onSearchRequest } = this.props;
    const expectingId = ++this._requestId;

    this.setState({ loading: true, items: null });

    onSearchRequest(query).then(items => {
      if (this._requestId !== expectingId) {
        return;
      }
      this._handleSetItems(items);
    });
  };

  _handleSetItems(items?: *[]) {
    const { value } = this.props;
    this.setState({ items, loading: false }, () => {
      if (value && items && items.length && this.menu) {
        const index = items.findIndex(x => shallowEqual(x, value));
        this.menu._highlightItem(index);
        process.nextTick(this.menu._scrollToSelected);
      }
    });
  }

  _handleSelect = (item: *) => {
    if (this.props.onChange) {
      this.props.onChange(item);
    }
    this._close();
  };
}

export default ComboBoxComponent;
