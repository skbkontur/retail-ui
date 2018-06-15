import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import Input, { InputProps } from '../Input';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem/MenuItem';
import RenderLayer from '../RenderLayer';
import { createPropsGetter } from '../internal/createPropsGetter';

export interface AutocompleteProps extends InputProps {
  renderItem?: (item: string) => React.ReactNode;
  source: string[] | ((patter: string) => Promise<string[]>);
  disablePortal?: boolean;
  hasShadow?: boolean;
  menuAlign?: 'left' | 'right';
  menuMaxHeight?: number | string;
  menuWidth?: number | string;
  preventWindowScroll?: boolean;
  onChange: (event: { target: { value: string } }, value: string) => void;
  onBlur?: () => void;
}

export interface AutocomplpeteState {
  items: Nullable<string[]>;
  selected: number;
}

/**
 * Стандартный инпут с подсказками.
 *
 * Все свойства передаются во внутренний *Input*.
 */
class Autocomplete extends React.Component<
  AutocompleteProps,
  AutocomplpeteState
> {
  public static propTypes = {
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

  public static defaultProps = {
    renderItem,
    size: 'small',
    disablePortal: false,
    hasShadow: true,
    menuMaxHeight: 300,
    menuAlign: 'left',
    preventWindowScroll: true
  };

  public state: AutocomplpeteState = {
    items: null,
    selected: -1
  };

  private _opened: boolean = false;
  private _input: Nullable<Input> = null;
  private _menu: Nullable<Menu>;

  private _focused: boolean = false;

  private getProps = createPropsGetter(Autocomplete.defaultProps);

  /**
   * @public
   */
  public focus() {
    if (this._input) {
      this._input.focus();
    }
  }

  public blur() {
    this._handleBlur();
  }

  public componentWillReceiveProps(nextProps: AutocompleteProps) {
    if (nextProps.value && this.props.value !== nextProps.value) {
      this._updateItems(nextProps.value);
    }
  }

  public render() {
    const { onChange, onKeyDown, onFocus, onBlur, ...rest } = this.props;
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

  private _renderMenu(): React.ReactNode {
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
        getParent={this.getAnchor}
        align={this.props.menuAlign}
        disablePortal={this.props.disablePortal}
      >
        <Menu {...menuProps}>
          {items.map((item, i) => {
            return (
              <MenuItem onClick={this.handleMenuItemClick(i)} key={i}>
                {this.getProps().renderItem(item)}
              </MenuItem>
            );
          })}
        </Menu>
      </DropdownContainer>
    );
  }

  private _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this._opened = true;

    // https://github.com/airbnb/enzyme/issues/218
    // TODO: replace with currentTarget when fixed
    const value = event.target.value;

    this._updateItems(value);

    this._fireChange(value);
  };

  private _handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this._focused) {
      return;
    }

    this._focused = true;
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private _handleBlur = () => {
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

  private _handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
        if (this._menu) {
          this._menu.up();
        }
        return;
      case 'ArrowDown':
        event.preventDefault();
        if (this._menu) {
          this._menu.down();
        }
        return;
      case 'Enter':
        event.preventDefault(); // To prevent form submission.
        if (this._menu) {
          this._menu.enter(event);
        }
        return;
      default:
        return;
    }
  };

  private handleMenuItemClick(i: number) {
    return (event: React.SyntheticEvent<HTMLElement>) =>
      this._handleItemClick(event, i);
  }

  private getAnchor() {
    return findDOMNode(this);
  }

  private _handleItemClick(
    event: React.SyntheticEvent<HTMLElement>,
    index: number
  ) {
    // FIXME: need better types for MenuItem onClick
    // @ts-ignore
    if (event.button) {
      return;
    }

    event.preventDefault();
    this._choose(index);
  }

  private _choose(index: number) {
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

  private _updateItems(value: string) {
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

  private _fireChange(value: string) {
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  }

  private _refInput = (el: Input | null) => {
    this._input = el;
  };

  private _refMenu = (menu: Menu | null) => {
    this._menu = menu;
  };
}

function match(pattern: string, items: string[]) {
  if (!pattern || !items) {
    return Promise.resolve([]);
  }

  pattern = pattern.toLowerCase();
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(pattern)
  );
  return Promise.resolve(filteredItems);
}

function renderItem(item: any) {
  return item;
}

export default Autocomplete;
