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
  disabled?: boolean,
  editing?: boolean,
  error?: boolean,
  items?: ?(T[]),
  loading?: boolean,
  opened?: boolean,
  openButton?: boolean,
  placeholder?: string,
  textValue?: string,
  totalCount?: number,
  value?: ?T,
  warning?: boolean,
  width: string | number,

  onChange: Function,
  onClickOutside: () => void,
  onFocus?: () => void,
  onFocusOutside: () => void,
  onInputBlur?: () => void,
  onInputChange?: Function,
  onInputFocus?: () => void,
  onInputKeyDown?: (e: SyntheticKeyboardEvent) => void,
  onMouseEnter?: (e: SyntheticMouseEvent) => void,
  onMouseOver?: (e: SyntheticMouseEvent) => void,
  onMouseLeave?: (e: SyntheticMouseEvent) => void,
  renderItem: (item: T) => string | React$Element<*>,
  renderNotFound: () => string | React$Element<*>,
  renderTotalCount?: (found: number, total: number) =>
    string
    | React$Element<*>,
  renderValue: (item: T) => string | React$Element<*>,
  refInput?: (input: Input) => any,
  refMenu?: (menu: Menu) => any
|};

class ComboBoxView extends Component {
  static defaultProps = {
    renderItem: (x, i) => x,
    renderNotFound: (() => 'Не найдено': () => string | React$Element<any>),
    renderValue: x => x,
    onClickOutside: () => {},
    onFocusOutside: () => {},
    onChange: () => {},
    width: (250: string | number)
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.props.onFocus && this.props.onFocus();
    }
  }

  componentDidUpdate(prevProps: Props<any>) {
    if (this.props.editing && !prevProps.editing && this.input) {
      this.input.focus();
      this.input.setSelectionRange(0, (this.props.textValue || '').length);
    }
  }

  props: Props<*>;
  input: Input;

  render() {
    const {
      items,
      loading,
      onClickOutside,
      onFocusOutside,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      openButton,
      width
    } = this.props;

    const input = this.renderInput();
    const menu = this.renderMenu();

    const spinner = (
      <span
        style={{ position: 'absolute', top: 6, right: 5, zIndex: 10 }}
      >
        <Spinner type="mini" caption="" dimmed />
      </span>
    );

    const arrow = (
      <span
        style={{
          border: '4px solid transparent',
          borderBottomWidth: 0,
          borderTopColor: '#a6a6a6',
          position: 'absolute',
          right: 8,
          top: 15,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
    );

    const spinnerIsShown = loading && items && !!items.length;
    const arrowIsShown = !spinnerIsShown && openButton;

    return (
      <RenderLayer
        onClickOutside={onClickOutside}
        onFocusOutside={onFocusOutside}
      >
        <label
          style={{ width, display: 'inline-block', position: 'relative' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseOver={onMouseOver}
        >
          {input}
          {spinnerIsShown && spinner}
          {arrowIsShown && arrow}
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

    if (loading && (!items || !items.length)) {
      return (
        <Menu ref={refMenu}>
          <MenuItem disabled>
            <div style={{ margin: '-2px 0 -1px' }}>
              <Spinner type="mini" dimmed />
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
          <div style={{ fontSize: 12 }}>
            {renderTotalCount(items.length, totalCount)}
          </div>
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
    if (typeof item === 'function' || React.isValidElement(item)) {
      const element = typeof item === 'function' ? item() : item;
      const props = Object.assign(
        {
          key: index,
          onClick: () => this.props.onChange(element.props)
        },
        element.props
      );
      return React.cloneElement(element, props);
    }
    return (
      <MenuItem onClick={() => this.props.onChange(item)} key={index}>
        {this.props.renderItem(item)}
      </MenuItem>
    );
  };

  renderInput() {
    const {
      disabled,
      editing,
      error,
      onFocus,
      onInputBlur,
      onInputChange,
      onInputFocus,
      onInputKeyDown,
      openButton,
      placeholder,
      renderValue,
      textValue,
      value,
      warning
    } = this.props;

    if (editing) {
      return (
        <Input
          disabled={disabled}
          error={error}
          onBlur={onInputBlur}
          onChange={onInputChange}
          onFocus={onInputFocus}
          rightIcon={openButton ? <span /> : null}
          value={textValue}
          onKeyDown={onInputKeyDown}
          placeholder={placeholder}
          width="100%"
          ref={this.refInput}
          warning={warning}
        />
      );
    }

    return (
      <InputLikeText
        error={error}
        onFocus={onFocus}
        padRight={openButton}
        disabled={disabled}
        warning={warning}
      >
        {value
          ? renderValue(value)
          : <span style={{ color: 'gray' }}>{placeholder}</span>}
      </InputLikeText>
    );
  }

  refInput = (input: Input) => {
    if (this.props.refInput) {
      this.props.refInput(input);
    }
    this.input = input;
  };
}

export default ComboBoxView;
