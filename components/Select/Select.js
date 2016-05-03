import events from 'add-event-listener';
import classNames from 'classnames';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button';
import filterProps from '../filterProps';
import Input from '../Input';
import listenFocusOutside from '../../lib/listenFocusOutside';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem/MenuItem';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import Upgrades from '../../lib/Upgrades';

import styles from './Select.less';

const PASS_BUTTON_PROPS = {
  disabled: true,
  error: true,
  use: true,
  size: true,
  warning: true,
};

class Select extends React.Component {
  static propTypes = {
    /**
     * Набор значений. Поддерживаются любые перечисляемые типы, в том числе
     * `Array`, `Map`, `Immutable.Map`.
     *
     * Элементы воспринимаются следующим образом: если элемент — это массив, то
     * первый элемент является значением , а второй — отображается в списке;
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

    value: PropTypes.any,

    defaultValue: PropTypes.any,

    disabled: PropTypes.bool,

    /**
     * Показывать строку поиска в списке.
     */
    search: PropTypes.bool,

    placeholder: PropTypes.node,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    /**
     * Функция для отрисовки выбранного элемента. Аргументы — *value*, *item*.
     */
    renderValue: PropTypes.func,

    /**
     * Функция для отрисовки элемента в выпадающем списке. Аргументы — *value*,
     * *item*.
     */
    renderItem: PropTypes.func,

    filterItem: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'ничего не выбрано',
    renderValue,
    renderItem,
    filterItem,
  };

  static static(element) {
    invariant(React.isValidElement(element));

    return element;
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      opened: false,
      value: props.defaultValue,
    };

    this._menuContainer = null;
    this._focusSubscribtion = null;
  }

  render() {
    var value = this.getValue_();

    var label;
    if (value != null) {
      label = this.props.renderValue(
        value,
        getItemByValue(this.props.items, value)
      );
    } else {
      label = (
        <span className={styles.placeholder}>{this.props.placeholder}</span>
      );
    }

    const focusable = !(this.state.opened && this.props.search) &&
      !this.props.disabled;

    var buttonProps = {
      ...filterProps(this.props, PASS_BUTTON_PROPS),

      align: 'left',
      disabled: this.props.disabled,
      _noPadding: true,
      width: '100%',
      onClick: this.open_,
      onKeyDown: this.handleKey,
    };
    if (this.state.opened) {
      buttonProps.active = true;
      buttonProps.corners = Button.BOTTOM_LEFT | Button.BOTTOM_RIGHT;
    }

    var labelProps = {
      className: classNames({
        [styles.label]: true,
        [styles.labelIsOpened]: this.state.opened,
      }),
      onClick: this.open_,
    };

    return (
      <span className={styles.root} style={{width: this.props.width}}>
        <Button {...buttonProps}>
          <span {...labelProps}>
            <span className={styles.labelText}>{label}</span>
            <div className={styles.arrowWrap}>
              <div className={styles.arrow} />
            </div>
          </span>
        </Button>
        {!this.props.disabled && this.state.opened && this.renderMenu()}
      </span>
    );
  }

  renderMenu() {
    var search = null;
    if (this.props.search) {
      search = (
        <div className={styles.search}>
          <Input ref={(c) => c && ReactDOM.findDOMNode(c).focus()}
            onChange={this.handleSearch}
          />
        </div>
      );
    }

    var value = this.getValue_();

    return (
      <div ref={this._refMenuContainer} className={styles.container}>
        <div className={styles.drop}>
          <div style={{position: 'relative'}}>
            <Menu ref={this._refMenu}>
              {search}
              {this.mapItems((iValue, item, i) => {
                if (typeof item === 'function' || React.isValidElement(item)) {
                  return React.cloneElement(
                    typeof item === 'function' ? item() : item,
                    {key: i},
                  );
                }

                return (
                  <MenuItem key={i}
                    state={iValue === value ? 'selected' : null}
                    onClick={this.select_.bind(this, iValue)}
                  >
                    {this.props.renderItem(iValue, item)}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
        </div>
        <div className={styles.botBorder} />
      </div>
    );
  }

  _refMenuContainer = (el) => {
    this._menuContainer = el;

    if (this._focusSubscribtion) {
      this._focusSubscribtion.remove();
      this._focusSubscribtion = null;

      events.removeEventListener(
        document, 'mousedown', this._handleNativeDocClick
      );
    }

    if (el) {
      this._focusSubscribtion = listenFocusOutside(
        [ReactDOM.findDOMNode(this)], this.close_
      );

      events.addEventListener(
        document, 'mousedown', this._handleNativeDocClick
      );
    }
  };

  _refMenu = (menu) => {
    this._menu = menu;
  };

  _handleNativeDocClick = (event) => {
    const target = event.target || event.srcElement;
    if (this._menuContainer && !this._menuContainer.contains(target)) {
      this.close_();
    }
  };

  open_ = () => {
    if (!this.state.opened) {
      this.setState({opened: true});
    }
  };

  close_ = () => {
    if (this.state.opened) {
      this.setState({opened: false});
    }
  };

  handleKey = (e) => {
    var key = e.key;
    if (!this.state.opened) {
      if (key === ' ' || key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();

        this.setState({opened: true});
      }
    } else {
      if (key === 'Escape') {
        this.setState({opened: false}, () => {
          ReactDOM.findDOMNode(this).focus();
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this._menu && this._menu.up();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this._menu && this._menu.down();
      } else if (e.key === 'Enter') {
        e.preventDefault(); // To prevent form submission.
        this._menu && this._menu.enter();
      }
    }
  };

  handleSearch = event => {
    this.setState({searchPattern: event.target.value});
  };

  select_(value) {
    this.setState({
      opened: false,
      value,
    }, () => {
      setTimeout(() => {
        ReactDOM.findDOMNode(this).focus();
      }, 0);
    });
    if (this.props.onChange) {
      this.props.onChange({target: {value}}, value);
    }
  }

  getValue_() {
    if (this.props.value !== undefined) {
      return this.props.value;
    }
    return this.state.value;
  }

  mapItems(fn) {
    const pattern = this.state.searchPattern &&
      this.state.searchPattern.toLowerCase();

    const ret = [];
    let index = 0;
    for (const entry of this.props.items) {
      const [value, item] = normalizeEntry(entry);
      if (!pattern || this.props.filterItem(value, item, pattern)) {
        ret.push(fn(value, item, index));
        ++index;
      }
    }

    return ret;
  }
}

Select.SEP = () => <MenuSeparator />;

Select.Item = class Item extends React.Component {
  render() {
    return <MenuItem>{this.props.children}</MenuItem>;
  }
};

function renderValue(value, item) {
  return item;
}

function renderItem(value, item) {
  return item;
}

function getItemByValue(items, value) {
  for (let entry of items) {
    entry = normalizeEntry(entry);
    if (entry[0] === value) {
      return entry[1];
    }
  }
  return null;
}

function normalizeEntry(entry) {
  if (Array.isArray(entry)) {
    return entry;
  } else {
    return [entry, entry];
  }
}

function filterItem(value, item, pattern) {
  return item.toLowerCase().indexOf(pattern) !== -1;
}

export default Select;
