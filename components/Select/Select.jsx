var React = require('react');

var PropTypes = React.PropTypes;

var Input = require('../Input');

require('./Select.less');
require('./Select.css');
var cx = require('../cx')('RTSelect');

var Select = React.createClass({
  propTypes: {
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
     */
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

    value: PropTypes.any,

    defaultValue: PropTypes.any,

    /**
     * Показывать строку поиска в списке.
     */
    search: PropTypes.bool,

    placeholder: PropTypes.node,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Функция для отрисовки выбранного элемента. Единственный аргумент —
     * *item*.
     */
    renderValue: PropTypes.func,

    /**
     * Функция для отрисовки элемента в выпадающем списке. Единственный
     * аргумент — *item*.
     */
    renderItem: PropTypes.func,

    filterItem: PropTypes.func,

    /**
     * Функция, которая возвращает `true` для элемента, если этот элемент может
     * быть выделен с клавиатуры. Аргумент: *item*.
     */
    isSelectable: PropTypes.func,
  },

  getDefaultProps() {
    return {
      placeholder: 'ничего не выбрано',
      renderValue,
      renderItem,
      filterItem,
      isSelectable,
    };
  },

  getInitialState() {
    return {
      opened: false,
      current: -1,
      value: this.props.defaultValue,
    };
  },

  render() {
    var value = this.getValue_();

    var label;
    if (value) {
      label = this.props.renderValue(getItemByValue(this.props.items, value));
    } else {
      label = (
        <span className={cx('placeholder')}>{this.props.placeholder}</span>
      );
    }

    var rootProps = {
      className: cx({
        '': true,
        'isOpened': this.state.opened,
      }),
      tabIndex: (this.state.opened && this.props.search) ? "-1" : "0",
      onKeyDown: this.handleKey,
      onBlur: this.handleBlur,
    };

    var labelProps = {
      className: cx({
        'label': true,
        'label-isOpened': this.state.opened,
      }),
      onClick: this.open_,
    };
    if (this.props.width) {
      labelProps.style = {
        width: this.props.width,
      };
    }

    return (
      <span {...rootProps}>
        <span {...labelProps}>
          <span className={cx('labelText')}>{label}</span>
          <div className={cx('arrow')} />
        </span>
        {this.state.opened && this.renderMenu()}
      </span>
    );
  },

  renderMenu() {
    var search = null;
    if (this.props.search) {
      search = (
        <div className={cx('search')}>
          <Input ref={c => c && React.findDOMNode(c).focus()}
              onChange={this.handleSearch} onBlur={this.close_} />
        </div>
      );
    }

    var value = this.getValue_();

    return (
      <div className={cx('container')}>
        <div className={cx('drop')}>
          <div className={cx('overlay')} onMouseDown={this.close_} />
          <div style={{position: 'relative'}}>
            <div className={cx('menu')}>
              {search}
              {this.mapItems((iValue, item, i) => {
                let props = {
                  className: cx({
                    'menu-item': true,
                    'menu-item-selected': iValue === value,
                    'menu-item-current': i === this.state.current,
                  }),
                  onMouseDown: e => this.select_(iValue),
                  onMouseEnter: e => this.setState({current: i}),
                  onMouseLeave: e => this.setState({current: -1}),
                };
                let el = null;
                if (item === Select.SEP) {
                  el = <div key={`hr:${i}`} className={cx('menu-sep')} />;
                } else {
                  el = this.props.renderItem(item, i, props);
                }
                return el;
              })}
            </div>
          </div>
        </div>
        <div className={cx('botBorder')} />
      </div>
    );
  },

  open_() {
    if (!this.state.opened) {
      this.setState({opened: true});
    }
  },

  close_(e) {
    if (this.state.opened) {
      this.setState({
        opened: false,
        current: -1,
      });
    }
  },

  handleBlur(event) {
    if (!this.props.search) {
      this.close_();
    }
  },

  handleKey(e) {
    var key = e.key;
    if (!this.state.opened) {
      if (key === ' ' || key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();

        this.setState({opened: true});
      }
    } else {
      if (key === 'Escape') {
        this.setState({opened: false}, () => {
          React.findDOMNode(this).focus();
        });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();

        let step = e.key === 'ArrowUp' ? -1 : 1;
        let current = this.nextSelectable_(step);
        this.setState({current});
      } else if (e.key === 'Enter') {
        const items = this.mapItems(value => value);
        if (items[this.state.current]) {
          e.preventDefault(); // To prevent form submission.
          this.select_(items[this.state.current]);
        }
      }
    }
  },

  handleSearch(event) {
    this.setState({searchPattern: event.target.value});
  },

  select_(value) {
    this.setState({
      opened: false,
      current: -1,
      value,
    }, () => {
      setTimeout(() => {
        React.findDOMNode(this).focus();
      }, 0);
    });
    if (this.props.onChange) {
      this.props.onChange({target: {value}});
    }
  },

  getValue_() {
    if (this.props.value !== undefined) {
      return this.props.value;
    }
    return this.state.value;
  },

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
      const [ value, item ] = items[current];
      if (item !== Select.SEP && this.props.isSelectable(value, item)) {
        return current;
      }
    } while (this.state.current !== current);
  },

  mapItems(fn) {
    const pattern = this.state.searchPattern &&
      this.state.searchPattern.toLowerCase();

    const ret = [];
    let index = 0;
    for (let entry of this.props.items) {
      const [ value, item ] = normalizeEntry(entry);
      if (!pattern || this.props.filterItem(value, item, pattern)) {
        ret.push(fn(value, item, index));
        ++index;
      }
    }

    return ret;
  },
});

Select.SEP = {};

function renderValue(item) {
  if (typeof item === 'string') {
    return item;
  } else {
    return item.name;
  }
}

function renderItem(item, i, props) {
  if (typeof item === 'string') {
    return <div key={`it:${i}`} {...props}>{item}</div>;
  } else {
    return <div key={`it:${item.id}`} {...props}>{item.name}</div>;
  }
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

module.exports = Select;
