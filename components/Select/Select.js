import events from 'add-event-listener';
import classNames from 'classnames';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button';
import filterProps from '../filterProps';
import Input from '../Input';
import listenFocusOutside from '../../lib/listenFocusOutside';
import Upgrades from '../../lib/Upgrades';

import styles from './Select.less';

const STATIC_ITEM = Symbol('static_item');

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

    /**
     * DEPRECATED
     */
    isSelectable: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'ничего не выбрано',
    renderValue,
    renderItem,
    filterItem,
    isSelectable,
  };

  static static(item) {
    return {
      __type: STATIC_ITEM,
      item,
    };
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      opened: false,
      current: -1,
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
            <div className={styles.menu}>
              {search}
              {this.mapItems((iValue, item, i) => {
                const itemClassName = classNames({
                  [styles.menuItem]: true,
                  [styles.menuItemSelected]: iValue === value,
                  [styles.menuItemCurrent]: i === this.state.current,
                });
                let el = null;
                if (item && item.__type === STATIC_ITEM) {
                  el = React.cloneElement(
                    typeof item.item === 'function' ? item.item() : item.item,
                    {key: i},
                  );
                } else {
                  el = (
                    <div key={i} className={itemClassName}
                      onMouseDown={(e) => this._handleItemClick(e, iValue)}
                      onMouseEnter={(e) => this.setState({current: i})}
                      onMouseLeave={(e) => this.setState({current: -1})}
                    >
                      {this.props.renderItem(iValue, item)}
                    </div>
                  );
                }
                return el;
              })}
            </div>
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
      this.setState({
        opened: false,
        current: -1,
      });
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
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();

        const step = e.key === 'ArrowUp' ? -1 : 1;
        const current = this.nextSelectable_(step);
        this.setState({current});
      } else if (e.key === 'Enter') {
        const items = this.mapItems((value) => value);
        if (items[this.state.current]) {
          e.preventDefault(); // To prevent form submission.
          this.select_(items[this.state.current]);
        }
      }
    }
  };

  _handleItemClick(event, value) {
    if (event.button === 0) {
      this.select_(value);
    }
  }

  handleSearch = event => {
    this.setState({searchPattern: event.target.value});
  };

  select_(value) {
    this.setState({
      opened: false,
      current: -1,
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

  nextSelectable_(step) {
    const items = this.mapItems((value, item) => [value, item]);
    let current = this.state.current;
    do {
      current += step;
      if (current < 0) {
        current = items.length - 1;
      } else if (current >= items.length) {
        current = 0;
      }
      const [value, item] = items[current];
      if (item && item.__type !== STATIC_ITEM) {
        return current;
      }
    } while (this.state.current !== current);
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

Select.SEP = Select.static(
  () => <div className={styles.menuSep} />
);

Select.Item = class Item extends React.Component {
  render() {
    return <div className={styles.menuItem}>{this.props.children}</div>;
  }
};

function renderValue(value, item) {
  return item;
}

function renderItem(value, item) {
  return item;
}

function isSelectable(value, item) {
  return true;
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
