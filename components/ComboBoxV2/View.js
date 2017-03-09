// @flow
/* global React$Element */

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import DropdownContainer from '../DropdownContainer/DropdownContainer';
import Input from '../Input';
import InputLikeText from '../internal/InputLikeText';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem';
import RenderLayer from '../RenderLayer';
import Spinner from '../Spinner';

type Props<T> = {|
  editing?: boolean,
  error?: boolean,
  items?: ?T[],
  loading?: boolean,
  opened?: boolean,
  placeholder?: string,
  textValue?: string,
  totalCount?: number,
  value?: ?T,

  onChange: Function,
  onClickOutside: () => void,
  onFocus?: () => void,
  onFocusOutside: () => void,
  onInputChange?: Function,
  onInputFocus?: () => void,
  onInputKeyDown?: (e: SyntheticKeyboardEvent) => void,
  renderItem: (item: T) => string | React$Element<*>,
  renderNotFound?: () => string | React$Element<*>,
  renderTotalCount?: (found: number, total: number) =>
    | string
    | React$Element<*>,
  renderValue: (item: T) => string | React$Element<*>,
  refInput?: (input: Input) => void,
  refMenu?: (menu: Menu) => void,
|};

class ComboBoxView extends Component {
  static defaultProps = {
    renderItem: (x, i) => x,
    renderValue: x => x,
    onClickOutside: () => {},
    onFocusOutside: () => {},
    onChange: () => {}
  };

  props: Props<*>;

  render() {
    const { onClickOutside, onFocusOutside } = this.props;
    const input = this.renderInput();
    const menu = this.renderMenu();

    return (
      <RenderLayer
        onClickOutside={onClickOutside}
        onFocusOutside={onFocusOutside}
      >
        <label style={{ width: 200, display: 'inline-block' }}>
          {input}
          <DropdownContainer getParent={() => findDOMNode(this)} offsetY={1}>
            {menu}
          </DropdownContainer>
        </label>
      </RenderLayer>
    );
  }

  renderMenu() {
    const {
      opened,
      items,
      totalCount,
      loading,
      refMenu,
      renderNotFound,
      renderTotalCount
    } = this.props;

    if (!opened) {
      return null;
    }

    if (loading) {
      return (
        <Menu ref={refMenu}>
          <MenuItem disabled>
            <div style={{ margin: '-2px 0 -1px' }}>
              <Spinner type="mini" />
            </div>
          </MenuItem>
        </Menu>
      );
    }

    if ((items == null || items.length === 0) && renderNotFound) {
      return (
        <Menu ref={refMenu}>
          <MenuItem disabled>
            {renderNotFound()}
          </MenuItem>
        </Menu>
      );
    }

    let total = null;
    if (items && renderTotalCount && totalCount && items.length < totalCount) {
      total = (
        <MenuItem disabled>
          {renderTotalCount(items.length, totalCount)}
        </MenuItem>
      );
    }

    return (
      <Menu ref={refMenu}>
        {items && items.map(this.renderItem)}
        {total}
      </Menu>
    );
  }

  renderItem = (item: *, index: number) => {
    return (
      <MenuItem onClick={() => this.props.onChange(item)} key={index}>
        {this.props.renderItem(item)}
      </MenuItem>
    );
  };

  renderInput() {
    const {
      editing,
      error,
      onFocus,
      onInputChange,
      onInputFocus,
      onInputKeyDown,
      placeholder,
      renderValue,
      refInput,
      textValue,
      value
    } = this.props;

    if (editing) {
      return (
        <Input
          error={error}
          onChange={onInputChange}
          onFocus={onInputFocus}
          value={textValue}
          onKeyDown={onInputKeyDown}
          placeholder={placeholder}
          width="100%"
          ref={refInput}
        />
      );
    }

    return (
      <InputLikeText error={error} onFocus={onFocus}>
        {value
          ? renderValue(value)
          : <span style={{ color: 'gray' }}>{placeholder}</span>}
      </InputLikeText>
    );
  }
}

export default ComboBoxView;
