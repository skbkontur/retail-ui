import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { isKeyArrowDown, isKeyArrowUp, isKeyEnter, isKeyEscape } from '../../lib/events/keyboard/identifiers';

import Input, { InputProps } from '../Input';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem';
import RenderLayer from '../RenderLayer';
import { createPropsGetter } from '../internal/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { fixClickFocusIE } from '../../lib/events/fixClickFocusIE';

export interface AutocompleteProps extends InputProps {
  /** Функция отрисовки элемента меню */
  renderItem: (item: string) => React.ReactNode;
  /** Промис, резолвящий элементы меню */
  source?: string[] | ((patter: string) => Promise<string[]>);
  /** Отключает использование портала */
  disablePortal: boolean;
  /** Отрисовка тени у выпадающего меню */
  hasShadow: boolean;
  /** Выравнивание выпадающего меню */
  menuAlign: 'left' | 'right';
  /** Максимальная высота меню */
  menuMaxHeight: number | string;
  /** Ширина меню */
  menuWidth?: number | string;
  /** Отключить скролл окна, когда меню открыто */
  preventWindowScroll: boolean;
  /** onChange */
  onChange: (event: { target: { value: string } }, value: string) => void;
  /** onBlur */
  onBlur?: () => void;
  /** Размер инпута */
  size: InputProps['size'];
  /** value */
  value: string;
}

export interface AutocomplpeteState {
  items: Nullable<string[]>;
  selected: number;
  focused: boolean;
}

/**
 * Стандартный инпут с подсказками.
 *
 * Все свойства передаются во внутренний *Input*.
 */
class Autocomplete extends React.Component<AutocompleteProps, AutocomplpeteState> {
  public static __KONTUR_REACT_UI__ = 'Autocomplete';

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
    source: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  };

  public static defaultProps = {
    renderItem,
    size: 'small',
    disablePortal: false,
    hasShadow: true,
    menuMaxHeight: 300,
    menuAlign: 'left',
    preventWindowScroll: true,
  };

  public state: AutocomplpeteState = {
    items: null,
    selected: -1,
    focused: false,
  };

  private opened: boolean = false;
  private input: Nullable<Input> = null;
  private menu: Nullable<Menu>;

  private requestId: number = 0;

  private getProps = createPropsGetter(Autocomplete.defaultProps);

  /**
   * @public
   */
  public focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  /**
   * @public
   */
  public blur() {
    this.handleBlur();
  }

  public componentDidUpdate(prevProps: AutocompleteProps) {
    if (prevProps.value !== this.props.value) {
      this.updateItems(this.props.value || '');
    }
  }

  public render() {
    const { focused } = this.state;

    const {
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
      renderItem: _renderItem,
      disablePortal,
      hasShadow,
      menuAlign,
      menuMaxHeight,
      preventWindowScroll,
      source,
      ...rest
    } = this.props;

    const inputProps = {
      ...rest,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      onFocus: this.handleFocus,
      ref: this.refInput,
    };

    return (
      <RenderLayer onFocusOutside={this.handleBlur} onClickOutside={this.handleClickOutside} active={focused}>
        <span style={{ display: 'inline-block' }}>
          <Input {...inputProps} />
          {this.renderMenu()}
        </span>
      </RenderLayer>
    );
  }

  private renderMenu(): React.ReactNode {
    const items = this.state.items;
    const menuProps = {
      ref: this.refMenu,
      maxHeight: this.props.menuMaxHeight,
      hasShadow: this.props.hasShadow,
      width: this.props.menuWidth || this.props.width,
      preventWindowScroll: this.props.preventWindowScroll,
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

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.opened = true;

    // https://github.com/airbnb/enzyme/issues/218
    // TODO: replace with currentTarget when fixed
    const value = event.target.value;

    this.fireChange(value);
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.state.focused) {
      return;
    }

    this.setState({ focused: true });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleBlur = () => {
    if (!this.state.focused) {
      return;
    }

    this.opened = false;
    this.setState({ items: null, focused: false });

    if (this.input) {
      this.input.blur();
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  private handleClickOutside = (e: Event) => {
    fixClickFocusIE(e);
    this.handleBlur();
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
    switch (true) {
      case isKeyEscape(e):
        e.preventDefault();
        this.setState({ items: null });
        return;
      case isKeyArrowUp(e):
        e.preventDefault();
        if (this.menu) {
          this.menu.up();
        }
        return;
      case isKeyArrowDown(e):
        e.preventDefault();
        if (this.menu) {
          this.menu.down();
        }
        return;
      case isKeyEnter(e):
        e.preventDefault(); // To prevent form submission.
        if (this.menu) {
          this.menu.enter(e);
        }
        return;
    }
  };

  private handleMenuItemClick(i: number) {
    return (event: React.SyntheticEvent<HTMLElement>) => this.handleItemClick(event, i);
  }

  private getAnchor = () => {
    return findDOMNode(this);
  };

  private handleItemClick(event: React.SyntheticEvent<HTMLElement> | React.MouseEvent<HTMLElement>, index: number) {
    if ((event as React.MouseEvent<HTMLElement>).button) {
      return;
    }

    event.preventDefault();
    this.choose(index);
  }

  private choose(index: number) {
    if (!this.state.items) {
      return;
    }

    const value = this.state.items[index];
    this.opened = false;
    this.setState({
      selected: -1,
      items: null,
    });

    this.fireChange(value);
    this.blur();
  }

  private updateItems(value: string) {
    if (!this.opened) {
      return;
    }
    const pattern = value.trim();
    const source = this.props.source;

    if (!source) {
      return;
    }

    let promise;
    const expectingId = (this.requestId += 1);
    if (typeof source === 'function') {
      promise = source(pattern);
    } else {
      promise = match(pattern, source);
    }
    promise.then(items => {
      if (this.opened && expectingId === this.requestId) {
        this.setState({
          items,
          selected: -1,
        });
      }
    });
  }

  private fireChange(value: string) {
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  }

  private refInput = (el: Input | null) => {
    this.input = el;
  };

  private refMenu = (menu: Menu | null) => {
    this.menu = menu;
  };
}

function match(pattern: string, items: string[]) {
  if (!pattern || !items) {
    return Promise.resolve([]);
  }

  pattern = pattern.toLowerCase();
  const filteredItems = items.filter(item => item.toLowerCase().includes(pattern));
  return Promise.resolve(filteredItems);
}

function renderItem(item: any) {
  return item;
}

export default Autocomplete;
