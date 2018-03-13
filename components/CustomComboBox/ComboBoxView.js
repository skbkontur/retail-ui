// @flow

import * as React from 'react';
import { findDOMNode } from 'react-dom';

import DropdownContainer from '../DropdownContainer/DropdownContainer';
import Input from '../Input';
import InputLikeText from '../internal/InputLikeText';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem';
import RenderLayer from '../RenderLayer';
import Spinner from '../Spinner';

type Props<T> = {
  disablePortal?: boolean,
  disabled?: boolean,
  editing?: boolean,
  error?: boolean,
  items?: ?(T[]),
  loading?: boolean,
  menuAlign?: 'left' | 'right',
  opened?: boolean,
  openButton?: boolean,
  placeholder?: string,
  size: 'small' | 'medium' | 'large',
  textValue?: string,
  totalCount?: number,
  value?: ?T,
  warning?: boolean,
  width: string | number,
  maxMenuHeight?: number | string,

  onChange: T => mixed,
  onClickOutside: () => void,
  onFocus?: () => void,
  onFocusOutside: () => void,
  onInputBlur?: () => void,
  onInputChange?: (SyntheticEvent<HTMLInputElement>, string) => void,
  onInputFocus?: () => void,
  onInputKeyDown?: (e: SyntheticKeyboardEvent<>) => void,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  renderItem: (item: T) => React.Node,
  renderNotFound: () => React.Node,
  renderTotalCount?: (found: number, total: number) => React.Node,
  renderValue: (item: T) => React.Node,
  refInput?: (input: ?Input) => void,
  refMenu?: (menu: ?Menu) => void
};

class ComboBoxView<T> extends React.Component<Props<T>> {
  static defaultProps = {
    renderItem: (x: *, i: *) => x,
    renderNotFound: () => 'Не найдено',
    renderValue: (x: *) => x,
    onClickOutside: () => {},
    onFocusOutside: () => {},
    onChange: () => {},
    size: 'small',
    width: (250: string | number)
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.props.onFocus && this.props.onFocus();
    }
  }

  componentDidUpdate(prevProps: Props<T>) {
    const { input, props } = this;
    if (props.editing && !prevProps.editing && input) {
      input.focus();
      input.setSelectionRange(0, (props.textValue || '').length);
    }
  }

  input: ?Input;

  render() {
    const {
      items,
      loading,
      menuAlign,
      onClickOutside,
      onFocusOutside,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      openButton,
      opened,
      size,
      width
    } = this.props;

    const input = this.renderInput();
    const menu = this.renderMenu();

    const topOffsets = {
      spinner: 6,
      arrow: 15
    };
    if (size === 'medium') {
      topOffsets.spinner += 4;
      topOffsets.arrow += 4;
    }
    if (size === 'large') {
      topOffsets.spinner += 6;
      topOffsets.arrow += 6;
    }

    const spinner = (
      <span
        style={{
          position: 'absolute',
          top: topOffsets.spinner,
          right: 5,
          zIndex: 10
        }}
      >
        <Spinner type="mini" caption="" dimmed />
      </span>
    );

    const arrow = (
      <span
        style={{
          border: '4px solid transparent',
          borderBottomWidth: 0,
          borderTopColor: '#aaa',
          position: 'absolute',
          right: 10,
          top: topOffsets.arrow,
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
        active={opened}
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
          {opened && (
            <DropdownContainer
              align={menuAlign}
              getParent={() => findDOMNode(this)}
              offsetY={1}
              disablePortal={this.props.disablePortal}
            >
              {menu}
            </DropdownContainer>
          )}
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
      renderTotalCount,
      maxMenuHeight
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
          <MenuItem disabled>{renderNotFound()}</MenuItem>
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
      <Menu ref={refMenu} maxHeight={maxMenuHeight}>
        {items && items.map(this.renderItem)}
        {total}
      </Menu>
    );
  }

  // eslint-disable-next-line flowtype/no-weak-types
  renderItem = (item: any, index: number) => {
    // NOTE this is undesireable feature, better
    // to remove it from further versions
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
      size,
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
          value={textValue || ''}
          onKeyDown={onInputKeyDown}
          placeholder={placeholder}
          width="100%"
          size={size}
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
        placeholder={placeholder}
        size={size}
        width="100%"
      >
        {value ? renderValue(value) : null}
      </InputLikeText>
    );
  }

  refInput = (input: ?Input) => {
    if (this.props.refInput) {
      this.props.refInput(input);
    }
    this.input = input;
  };
}

export default ComboBoxView;
