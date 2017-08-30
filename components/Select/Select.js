// @flow
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

type Props<V, I> = {
  _icon?: string,
  _renderButton?: (params: ButtonParams) => React.Node,
  defaultValue?: V,
  diadocLinkIcon?: string,
  disablePortal?: boolean,
  disabled?: boolean,
  error?: boolean,
  filterItem: (value: V, item: I, pattern: string) => boolean,
  items?: I[],
  maxMenuHeight?: number,
  maxWidth?: number | string,
  menuAlign?: 'left' | 'right',
  menuWidth?: number | string,
  onChange?: (e: { target: { value: V } }, value: V) => void,
  onClose?: () => void,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void,
  onOpen?: () => void,
  placeholder?: React.Node,
  renderItem: (value: V, item: I) => React.Node,
  renderValue: (value: V, item: I) => React.Node,
  areValuesEqual: (value1: V, value2: V) => boolean,
  search?: boolean,
  value?: ?V,
  width?: number | string
};

type State = {
  opened: boolean,
  searchPattern?: string,
  value: mixed
};

class Select<V, I> extends React.Component<Props<V, I>, State> {
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
    filterItem
  };

  static SEP = () => <MenuSeparator />;

  static Item = Item;

  _menu: ?Menu;

  constructor(props: Props<V, I>, context: mixed) {
    super(props, (context: mixed));

    this.state = {
      opened: false,
      value: props.defaultValue
    };
  }

  render() {
    var value = this._getValue();

    var label;
    if (value != null) {
      label = this.props.renderValue(
        // $FlowIssue
        value,
        // $FlowIssue
        this._getItemByValue(this.props.items, value)
      );
    } else {
      label = (
        <span className={styles.placeholder}>
          {this.props.placeholder}
        </span>
      );
    }

    const buttonParams: ButtonParams = {
      opened: this.state.opened,
      label,
      onClick: this._toggle,
      onKeyDown: this.handleKey
    };

    const style = {
      width: this.props.width,
      maxWidth: undefined
    };
    if (this.props.maxWidth) {
      style.maxWidth = this.props.maxWidth;
    }

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
      onKeyDown: params.onKeyDown
    };
    if (params.opened) {
      buttonProps.active = true;
    }

    if (this.props._icon) {
      Object.assign(buttonProps, {
        _noPadding: false,
        _noRightPadding: true,
        icon: this.props._icon
      });
    }

    var labelProps = {
      className: classNames({
        [styles.label]: true,
        [styles.labelWithLeftIcon]: !!this.props._icon,
        [styles.labelIsOpened]: params.opened
      }),
      style: {
        paddingRight: buttonProps.size === 'large' ? '41px' : '38px'
      }
    };

    return (
      <Button {...buttonProps}>
        <span {...labelProps}>
          <span className={styles.labelText}>
            {params.label}
          </span>
          <div className={styles.arrowWrap}>
            <div className={styles.arrow} />
          </div>
        </span>
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

    return (
      <Link {...linkProps}>
        {params.label}
      </Link>
    );
  }

  renderMenu() {
    var search = null;
    if (this.props.search) {
      search = (
        <div className={styles.search}>
          <Input ref={this._focusInput} onChange={this.handleSearch} />
        </div>
      );
    }

    var value = this._getValue();

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
              iValue: V,
              item: I | (() => React.Node),
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

  static static = element => {
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
   * @api
   */
  open() {
    this._open();
  }

  /**
   * @api
   */
  close() {
    this._close();
  }

  _handleNativeDocClick = event => {
    const target = event.target || event.srcElement;
    const nodes = this._getDomNodes();
    if (nodes.some(node => node && node.contains(target))) {
      return;
    }
    this._close();
  };

  _getDomNodes() {
    const result = [];
    result.push(ReactDOM.findDOMNode(this));
    if (this._menu) {
      result.push(ReactDOM.findDOMNode(this._menu));
    }
    return result;
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
    }

    events.removeEventListener(window, 'popstate', this._close);
  };

  handleKey = (e: SyntheticKeyboardEvent<>) => {
    var key = e.key;
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

  _select(value: V) {
    this.setState(
      {
        opened: false,
        value
      },
      () => {
        setTimeout(this._focus, 0);
      }
    );
    if (this.props.onChange) {
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

    const ret = [];
    let index = 0;
    for (const entry of items) {
      const [value, item, comment] = normalizeEntry(entry);
      // $FlowIssue
      if (!pattern || this.props.filterItem(value, item, pattern)) {
        // $FlowIssue
        ret.push(fn(value, item, index, comment));
        ++index;
      }
    }

    return ret;
  }

  _getItemByValue(items: ?(I[]), value: V) {
    if (!items) {
      return null;
    }
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

function renderValue(value, item) {
  return item;
}

function renderItem(value, item) {
  return item;
}

function areValuesEqual(value1, value2) {
  return value1 === value2;
}

function normalizeEntry(entry) {
  if (Array.isArray(entry)) {
    return entry;
  } else {
    return [entry, entry, undefined];
  }
}

function filterItem(value, item, pattern) {
  return item.toLowerCase().indexOf(pattern) !== -1;
}

export default Select;
