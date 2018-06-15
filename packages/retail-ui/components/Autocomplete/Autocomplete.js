// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import Input from '../Input';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem/MenuItem';
import RenderLayer from '../RenderLayer';

type InputProps = {
  align?: 'left' | 'center' | 'right',
  alwaysShowMask?: boolean,
  borderless?: boolean,
  disabled?: boolean,
  error?: boolean,
  id?: string,
  leftIcon?: React.Node,
  mask?: string,
  maskChar?: string,
  maxLength?: number | string,
  placeholder?: string,
  rightIcon?: React.Node,
  size?: 'small' | 'medium' | 'large',
  title?: string,
  type?: 'password' | 'text',
  value: string,
  warning?: boolean,
  width?: number | string,
  onCopy?: (e: SyntheticClipboardEvent<HTMLInputElement>) => void,
  onCut?: (e: SyntheticClipboardEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticFocusEvent<HTMLInputElement>) => void,
  onInput?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onKeyPress?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onPaste?: (e: SyntheticClipboardEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticMouseEvent<HTMLElement>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<HTMLElement>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<HTMLElement>) => void
};

type Props = InputProps & {
  renderItem: (item: string) => React.Node,
  source: Array<string> | ((patter: string) => Promise<string[]>),
  disablePortal?: boolean,
  hasShadow?: boolean,
  menuAlign?: 'left' | 'right',
  menuMaxHeight?: number | string,
  menuWidth?: number | string,
  preventWindowScroll?: boolean,
  onChange: (event: { target: { value: string } }, value: string) => void,
  onBlur?: () => void
};

type State = {
  items: ?Array<string>,
  selected: number
};

/**
 * Стандартный инпут с подсказками.
 *
 * Все свойства передаются во внутренний *Input*.
 */
export default class Autocomplete extends React.Component<Props, State> {
  static propTypes = {
    /**
     * Функция для отрисовки элемента в выпадающем списке. Единственный аргумент
     * — *item*.
     */
    renderItem: PropTypes.func,

    /**
     * Если передан массив, то совпадения ищутся по этому массиву.
     *
     * Если передается функция, то она должна возвращать thenable, который
     * резолвится уже отфильтрованным массивом. Возвращенный thenable может
     * иметь метод cancel, который будет вызван при отмене поиска (пользователь
     * изменил строку поиска, автокомплит потерял фокус).
     * ```
     * function(pattern) {
     *   return service.findAll(pattern);
     * }
     * ```
     */
    source: PropTypes.oneOfType([PropTypes.array, PropTypes.func])
  };

  static defaultProps = {
    renderItem,
    size: 'small',
    disablePortal: false,
    hasShadow: true,
    menuMaxHeight: 300,
    menuAlign: 'left',
    preventWindowScroll: true
  };

  state: State = {
    items: null,
    selected: -1
  };
  _opened: boolean = false;
  _input: ?Input = null;
  _menu: ?Menu;

  _focused: boolean = false;

  /**
   * @public
   */
  focus() {
    if (this._input) {
      this._input.focus();
    }
  }

  blur() {
    this._handleBlur();
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { onChange, onKeyDown, onFocus, onBlur, ...rest } = this.props;
    /* eslint-enable no-unused-vars */
    const inputProps = {
      onChange: this._handleChange,
      onKeyDown: this._handleKeyDown,
      onFocus: this._handleFocus,
      ref: this._refInput
    };
    return (
      <RenderLayer
        onFocusOutside={this._handleBlur}
        onClickOutside={this._handleBlur}
      >
        <span style={{ display: 'inline-block' }}>
          <Input {...rest} {...inputProps} />
          {this._renderMenu()}
        </span>
      </RenderLayer>
    );
  }

  _renderMenu() {
    const items = this.state.items;
    const menuProps = {
      ref: this._refMenu,
      maxHeight: this.props.menuMaxHeight,
      hasShadow: this.props.hasShadow,
      width: this.props.menuWidth || this.props.width,
      preventWindowScroll: this.props.preventWindowScroll
    };
    if (!items || items.length === 0) {
      return null;
    }

    return (
      <DropdownContainer
        offsetY={1}
        getParent={() => findDOMNode(this)}
        align={this.props.menuAlign}
        disablePortal={this.props.disablePortal}
      >
        <Menu {...menuProps}>
          {items.map((item, i) => {
            return (
              <MenuItem
                onClick={event => this._handleItemClick(event, i)}
                key={i}
              >
                {this.props.renderItem(item)}
              </MenuItem>
            );
          })}
        </Menu>
      </DropdownContainer>
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value && this.props.value !== nextProps.value) {
      this._updateItems(nextProps.value);
    }
  }

  _handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this._opened = true;

    // https://github.com/airbnb/enzyme/issues/218
    // TODO: replace with currentTarget when fixed
    const value = event.target.value;

    this._updateItems(value);

    this._fireChange(value);
  };

  _handleFocus = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if (this._focused) {
      return;
    }

    this._focused = true;
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  _handleBlur = () => {
    if (!this._focused) {
      return;
    }

    this._focused = false;
    this._opened = false;
    this.setState({ items: null });

    if (this._input) {
      this._input.blur();
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  _handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.setState({ items: null });
        return;
      case 'ArrowUp':
        event.preventDefault();
        this._menu && this._menu.up();
        return;
      case 'ArrowDown':
        event.preventDefault();
        this._menu && this._menu.down();
        return;
      case 'Enter':
        event.preventDefault(); // To prevent form submission.
        this._menu && this._menu.enter(event);
        return;
      default:
        return;
    }
  };

  _handleItemClick(event: SyntheticEvent<HTMLElement>, index: number) {
    if (event.button && event.button !== 0) {
      return;
    }

    event.preventDefault();
    this._choose(index);
  }

  _choose(index: number) {
    if (!this.state.items) {
      return;
    }

    const value = this.state.items[index];
    this._opened = false;
    this.setState({
      selected: -1,
      items: null
    });

    this._fireChange(value);
    this.blur();
  }

  _updateItems(value) {
    if (!this._opened) {
      return;
    }
    const pattern = value.trim();
    const source = this.props.source;
    let promise;
    if (typeof source === 'function') {
      promise = source(pattern);
    } else {
      promise = match(pattern, source);
    }
    promise.then(items => {
      if (this.props.value === value && this._opened) {
        this.setState({
          items,
          selected: -1
        });
      }
    });
  }

  _fireChange(value) {
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  }

  _refInput = el => {
    this._input = el;
  };

  _refMenu = menu => {
    this._menu = menu;
  };
}

function match(pattern, items) {
  if (!pattern || !items) {
    return Promise.resolve([]);
  }

  pattern = pattern.toLowerCase();
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(pattern)
  );
  return Promise.resolve(filteredItems);
}

function renderItem(item: *) {
  return item;
}
