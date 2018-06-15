
import type { ButtonProps } from '../Button/Button';

import events from 'add-event-listener';
import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Button from '../Button';
import DropdownContainer from '../DropdownContainer/DropdownContainer';
import filterProps from '../filterProps';
import Input from '../Input';
import invariant from 'invariant';
import Link from '../Link';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem/MenuItem';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import RenderLayer from '../RenderLayer';
import Item from './Item';

import styles from './Select.less';

export type ButtonParams = {
  disabled?: boolean,
  label: React.Node,
  onClick: () => void,
  onKeyDown: (event: SyntheticKeyboardEvent<>) => void,
  opened: boolean
};

const PASS_BUTTON_PROPS = {
  disabled: true,
  error: true,
  use: true,
  size: true,
  warning: true,

  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true
};

type Props<TValue, TItem> = {
  /** @ignore */
  _icon?: string,
  /** @ignore */
  _renderButton?: (params: ButtonParams) => React.Node,
  defaultValue?: TValue,
  /** @ignore */
  diadocLinkIcon?: string,
  disablePortal?: boolean,
  disabled?: boolean,
  error?: boolean,
  filterItem: (value: TValue, item: TItem, pattern: string) => boolean,
  items?: TItem[],
  maxMenuHeight?: number,
  maxWidth?: number | string,
  menuAlign?: 'left' | 'right',
  menuWidth?: number | string,
  onChange?: (e: { target: { value: TValue } }, value: TValue) => void,
  onClose?: () => void,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void,
  onOpen?: () => void,
  onClose?: () => void,
  placeholder?: React.Node,
  renderItem: (value: TValue, item: TItem) => React.Node,
  renderValue: (value: TValue, item: TItem) => React.Node,
  areValuesEqual: (value1: TValue, value2: TValue) => boolean,
  search?: boolean,
  value?: ?TValue,
  width?: number | string,
  warning?: boolean,
  use?: $PropertyType<ButtonProps, 'use'>,
  size?: $PropertyType<ButtonProps, 'size'>
};

type State<TValue> = {
  opened: boolean,
  searchPattern?: string,
  value: ?TValue
};

class Select<TValue, TItem> extends React.Component<
  Props<TValue, TItem>,
  State<TValue>
> {
  static propTypes = {
    /**
     * Функция для сравнения `value` с элементом из `items`
     */
    areValuesEqual: PropTypes.func,

    defaultValue: PropTypes.any,

    /**
     * Отключает использование портала
     */
    disablePortal: PropTypes.bool,

    disabled: PropTypes.bool,

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    filterItem: PropTypes.func,

    /**
     * Набор значений. Поддерживаются любые перечисляемые типы, в том числе
     * `Array`, `Map`, `Immutable.Map`.
     *
     * Элементы воспринимаются следующим образом: если элемент — это массив, то
     * первый элемент является значением , второй — отображается в списке,
     * а третий – комментарий;
     * если элемент не является массивом, то он используется и для отображения,
     * и для значения.
     *
     * Для вставки разделителя можно использовать `Select.SEP`.
     *
     * Вставить невыделяемый элемент со своей разметкой можно так:
     * ```
     * <Select ...
     *   items={[Select.static(() => <div>My Element</div>)]}
     * />
     * ```
     *
     * Чтобы добавить стандартный отступ для статического элемента:
     * ```
     * <Select.Item>My Element</Select.Item>
     * ```
     */
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

    maxMenuHeight: PropTypes.number,

    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    placeholder: PropTypes.node,

    /**
     * Функция для отрисовки элемента в выпадающем списке. Аргументы — *value*,
     * *item*.
     */
    renderItem: PropTypes.func,

    /**
     * Функция для отрисовки выбранного элемента. Аргументы — *value*, *item*.
     */
    renderValue: PropTypes.func,

    /**
     * Показывать строку поиска в списке.
     */
    search: PropTypes.bool,

    value: PropTypes.any,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func
  };

  static defaultProps = {
    placeholder: 'ничего не выбрано',
    renderValue,
    renderItem,
    areValuesEqual,
    filterItem,
    use: 'default'
  };

  static SEP = () => <MenuSeparator />;

  static Item = Item;

  _menu: ?Menu;

  constructor(props: Props<TValue, TItem>, context: mixed) {
    super(props, (context: mixed));

    this.state = {
      opened: false,
      value: props.defaultValue
    };
  }

  render() {
    const label = this.renderLabel();

    const buttonParams: ButtonParams = {
      opened: this.state.opened,
      label,
      onClick: this._toggle,
      onKeyDown: this.handleKey
    };

    const style = {
      width: this.props.width,
      maxWidth: this.props.maxWidth || undefined
    };

    return (
      <RenderLayer
        onClickOutside={this._close}
        onFocusOutside={this._close}
        active={this.state.opened}
      >
        <span className={styles.root} style={style}>
          {this.props._renderButton
            ? this.props._renderButton(buttonParams)
            : this.renderDefaultButton(buttonParams)}
          {!this.props.disabled && this.state.opened && this.renderMenu()}
        </span>
      </RenderLayer>
    );
  }

  renderLabel() {
    const value = this._getValue();
    // $FlowIssue
    const item = this._getItemByValue(value);

    if (item != null || value != null) {
      // $FlowIssue
      return this.props.renderValue(value, item);
    }

    const useIsCustom = this.props.use !== 'default';

    return (
      <span
        className={classNames(
          styles.placeholder,
          useIsCustom && styles.customUsePlaceholder
        )}
      >
        {this.props.placeholder}
      </span>
    );
  }

  renderDefaultButton(params: ButtonParams) {
    if (this.props.diadocLink) {
      return this.renderLinkButton(params);
    }

    const buttonProps = {
      ...filterProps(this.props, PASS_BUTTON_PROPS),

      align: 'left',
      disabled: this.props.disabled,
      _noPadding: true,
      width: '100%',
      onClick: params.onClick,
      onKeyDown: params.onKeyDown,
      active: params.opened
    };

    if (this.props._icon) {
      Object.assign(buttonProps, {
        _noPadding: false,
        _noRightPadding: true,
        icon: this.props._icon
      });
    }

    const labelProps = {
      className: classNames({
        [styles.label]: this.props.use !== 'link',
        [styles.labelWithLeftIcon]: !!this.props._icon
      }),
      style: {
        paddingRight: buttonProps.size === 'large' ? '41px' : '38px'
      }
    };

    const useIsCustom = this.props.use !== 'default';

    return (
      <Button {...buttonProps}>
        <span {...labelProps}>
          <span className={styles.labelText}>{params.label}</span>
        </span>
        <div className={styles.arrowWrap}>
          <div
            className={classNames(
              styles.arrow,
              useIsCustom && styles.customUseArrow
            )}
          />
        </div>
      </Button>
    );
  }

  renderLinkButton(params: ButtonParams) {
    const linkProps = {
      disabled: params.disabled,
      icon: this.props.diadocLinkIcon,
      _button: true,
      _buttonOpened: params.opened,

      onClick: params.onClick,
      onKeyDown: params.onKeyDown
    };

    return <Link {...linkProps}>{params.label}</Link>;
  }

  renderMenu() {
    const search = this.props.search ? (
      <div className={styles.search}>
        <Input ref={this._focusInput} onChange={this.handleSearch} />
      </div>
    ) : null;

    const value = this._getValue();

    return (
      <DropdownContainer
        getParent={() => ReactDOM.findDOMNode(this)}
        offsetY={-1}
        ref={this._refMenuContainer}
        align={this.props.menuAlign}
        disablePortal={this.props.disablePortal}
      >
        {/* $FlowIssue */}
        <Menu
          ref={this._refMenu}
          width={this.props.menuWidth}
          onItemClick={this._close}
          maxHeight={this.props.maxMenuHeight}
        >
          {search}
          {this._mapItems(
            (
              iValue: TValue,
              item: TItem | (() => React.Node),
              i: number,
              comment: ?React.Node
            ) => {
              if (typeof item === 'function' || React.isValidElement(item)) {
                return React.cloneElement(
                  // $FlowIssue React.isValidElement doesn't provide $checks
                  typeof item === 'function' ? item() : item,
                  { key: i }
                );
              }

              return (
                <MenuItem
                  key={i}
                  state={
                    /* $FlowIssue */
                    this.props.areValuesEqual(iValue, value) ? 'selected' : null
                  }
                  onClick={this._select.bind(this, iValue)}
                  comment={comment}
                >
                  {this.props.renderItem(iValue, item)}
                </MenuItem>
              );
            }
          )}
        </Menu>
      </DropdownContainer>
    );
  }

  static static = (element: mixed) => {
    invariant(
      React.isValidElement(element) || typeof element === 'function',
      'Select.static(element) expects element to be a valid react element.'
    );
    return element;
  };

  _focusInput = input => {
    if (input) {
      input.focus();
    }
  };

  _refMenuContainer = el => {
    events.removeEventListener(window, 'popstate', this._close);

    if (el) {
      events.addEventListener(window, 'popstate', this._close);
    }
  };

  _refMenu = menu => {
    this._menu = menu;
  };

  /**
   * @public
   */
  open() {
    this._open();
  }

  /**
   * @public
   */
  close() {
    this._close();
  }

  _toggle = () => {
    if (this.state.opened) {
      this._close();
    } else {
      this._open();
    }
  };

  _open = () => {
    if (!this.state.opened) {
      this.setState({ opened: true });

      const { onOpen } = this.props;
      onOpen && onOpen();
    }
  };

  _close = () => {
    if (this.state.opened) {
      this.setState({ opened: false });

      const { onClose } = this.props;
      onClose && onClose();
    }

    events.removeEventListener(window, 'popstate', this._close);
  };

  handleKey = (e: SyntheticKeyboardEvent<>) => {
    const key = e.key;
    if (!this.state.opened) {
      if (key === ' ' || key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();
        this._open();
      }
    } else {
      if (key === 'Escape') {
        this.setState({ opened: false }, this._focus);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this._menu && this._menu.up();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this._menu && this._menu.down();
      } else if (e.key === 'Enter') {
        e.preventDefault(); // To prevent form submission.
        this._menu && this._menu.enter(e);
      }
    }
  };

  handleSearch = (event: SyntheticInputEvent<>) => {
    this.setState({ searchPattern: event.target.value });
  };

  _focus = () => {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      // $FlowIssue
      node.focus();
    }
  };

  _select(value: TValue) {
    this.setState(
      {
        opened: false,
        value
      },
      () => {
        setTimeout(this._focus, 0);
      }
    );

    if (
      this.props.onChange &&
      // $FlowIgnore
      !this.props.areValuesEqual(this._getValue(), value)
    ) {
      this.props.onChange({ target: { value } }, value);
    }
  }

  _getValue() {
    if (this.props.value !== undefined) {
      return this.props.value;
    }
    return this.state.value;
  }

  _mapItems(fn) {
    const { items } = this.props;
    if (!items) {
      return [];
    }
    const pattern =
      this.state.searchPattern && this.state.searchPattern.toLowerCase();

    const result = [];
    let index = 0;
    for (const entry of items) {
      const [value, item, comment] = normalizeEntry(entry);
      // $FlowIssue
      if (!pattern || this.props.filterItem(value, item, pattern)) {
        // $FlowIssue
        result.push(fn(value, item, index, comment));
        ++index;
      }
    }

    return result;
  }

  _getItemByValue(value: TValue) {
    const items = this.props.items || [];

    for (let entry of items) {
      const [itemValue, item] = normalizeEntry(entry);
      // $FlowIssue
      if (this.props.areValuesEqual(itemValue, value)) {
        return item;
      }
    }
    return null;
  }
}

function renderValue(value: *, item: *) {
  return item;
}

function renderItem(value: *, item: *) {
  return item;
}

function areValuesEqual(value1: *, value2: *) {
  return value1 === value2;
}

function normalizeEntry(entry) {
  if (Array.isArray(entry)) {
    return entry;
  } else {
    return [entry, entry, undefined];
  }
}

function filterItem(value: *, item: *, pattern: string) {
  // $FlowIssue
  return item.toLowerCase().indexOf(pattern) !== -1;
}

export default Select;
