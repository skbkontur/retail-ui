var React = require('react');
var PropTypes = React.PropTypes;

var Input = require('../Input');

require('./Autocomplete.less');
var cx = require('../cx')('RTAutocomplete');

/**
 * Стандартный инпут с подсказками.
 *
 * Все свойства передаются во внутренний *Input*.
 */
var Autocomplete = React.createClass({
  propTypes: {
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
    source: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
    ]),

    /**
     * Функция для отрисовки элемента в выпадающем списке. Единственный аргумент
     * — *item*.
     */
    renderItem: PropTypes.func,
  },

  opened_: false,

  getDefaultProps() {
    return {
      renderItem,
    };
  },

  getInitialState() {
    return {
      selected: -1,
      value: this.props.value !== undefined ? this.props.value
          : this.props.defaultValue,
    };
  },

  render() {
    var inputProps = {
      value: this.state.value,
      onChange: e => this.handleChange(e),
      onBlur: e => this.handleBlur(e),
      onKeyDown: e => this.handleKey(e),
    };
    return (
      <span className={cx('')}>
        <Input {...this.props} {...inputProps} />
        {this.renderMenu()}
      </span>
    );
  },

  renderMenu() {
    var items = this.state.items;
    if (!items || items.length === 0) {
      return null;
    }

    return (
      <div className={cx('menuHolder')}>
        <div className={cx('menu')}>
          {items.map((item, i) => {
            let rootClass = cx({
              'item': true,
              'item-hover': this.state.selected === i,
              'item-padLeft': this.props.leftIcon,
            });
            return (
              <div key={i} className={rootClass}
                  onMouseDown={e => this.handleItemClick(e, i)}
                  onMouseEnter={e => this.setState({selected: i})}
                  onMouseLeave={e => this.setState({selected: -1})}>
                {this.props.renderItem(item)}
              </div>
            );
          })}
        </div>
      </div>
    );
  },

  componentWillReceiveProps(props) {
    if (props.value !== undefined) {
      this.setState({value: props.value});
      this.updateItems(props.value);
    }
  },

  handleChange(event) {
    this.opened_ = true;

    let value = event.target.value;

    if (this.props.value === undefined) {
      this.setState({value});
    }
    this.updateItems(value);

    this.fireChange_(value);
  },

  handleBlur(event) {
    this.opened_ = false;
    this.setState({items: null});

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  },

  handleKey(event) {
    var items = this.state.items;
    var stop = false;
    if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && items) {
      event.preventDefault();
      stop = true;

      let step = event.key === 'ArrowUp' ? -1 : 1;
      let selected = this.state.selected + step;
      if (selected >= items.length) {
        selected = -1;
      } else if (selected < -1) {
        selected = items.length - 1;
      }
      this.setState({selected});
    } else if (event.key === 'Enter') {
      if (items && items[this.state.selected]) {
        event.preventDefault();
        stop = true;

        this.choose_(this.state.selected);
      } else {
        this.opened_ = false;
        this.setState({items: null});
      }
    } else if (event.key === 'Escape' && items && items.length) {
      event.preventDefault(); // Escape clears the input on IE.
      stop = true;

      this.opened_ = false;
      this.setState({items: null});
    }

    if (!stop && this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  },

  handleItemClick(event, index) {
    event.preventDefault();
    this.choose_(index);
  },

  choose_(index) {
    var value = this.state.items[index];

    this.opened_ = false;
    this.setState({
      selected: -1,
      items: null,
    });
    if (this.props.value === undefined) {
      this.setState({value});
    }

    this.fireChange_(value);
  },

  updateItems(value) {
    if (!this.opened_) return;

    let pattern = value.trim();
    let source = this.props.source;
    let promise;
    if (typeof source === 'function') {
      promise = source(pattern);
    } else {
      promise = match(pattern, source);
    }
    promise.then(items => {
      if (this.state.value === value && this.opened_) {
        this.setState({
          items,
          selected: -1,
        });
      }
    });
  },

  fireChange_(value) {
    if (this.props.onChange) {
      this.props.onChange({target: {value}});
    }
  },
});

function match(pattern, items) {
  if (!pattern || !items) {
    return Promise.resolve(null);
  }

  pattern = pattern.toLowerCase();
  return new Promise((resolve, reject) => {
    resolve(items.filter(item => item.toLowerCase().indexOf(pattern) !== -1));
  });
}

function renderItem(item) {
  return item;
}

module.exports = Autocomplete;
