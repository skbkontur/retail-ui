var React = require('react');
var PropTypes = React.PropTypes;

var Input = require('../Input');

require('./Autocomplete.less');
var cx = require('../cx')('RTAutocomplete');

/**
 * Стандартный инпут с подсказками.
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

    onChange: PropTypes.func,
  },

  getInitialState() {
    return {
      selected: -1,
      value: '',
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
        <Input {...inputProps} ref="input" />
        {this.renderMenu()}
      </span>
    );
  },

  renderMenu() {
    var items = this.state.items;
    if (!items || items.length === 0) {
      return null;
    }

    var onItemAction = e => this.handleItemSelect(e);
    var onItemHighlight = e => this.handleItemHighlight(e);

    return (
      <div className={cx('menuHolder')}>
        <div className={cx('menu')}>
          {items.map((item, i) => {
            var hover = this.state.selected === i;
            return <Item key={item} index={i} value={item} hover={hover}
                onAction={onItemAction} onHighlight={onItemHighlight} />;
          })}
        </div>
      </div>
    );
  },

  handleChange(event) {
    var pattern = event.target.value;

    if (!pattern.trim()) {
      this.setState({
        value: pattern,
        items: null,
      });
    } else {
      this.setState({
        value: pattern,
      });

      var source = this.props.source;
      var promise;
      if (typeof source === 'function') {
        promise = source(pattern);
      } else {
        promise = match(pattern, source);
      }
      promise.then(items => {
        if (this.state.value === pattern) {
          this.setState({
            items,
            selected: -1,
          });
        }
      });
    }

    this.fireChange_(event.target.value);
  },

  handleBlur() {
    this.setState({items: null});
  },

  handleKey(event) {
    var items = this.state.items;
    if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && items) {
      event.preventDefault();

      let step = event.key === 'ArrowUp' ? -1 : 1;
      let selected = this.state.selected + step;
      if (selected >= items.length) {
        selected = 0;
      } else if (selected < 0) {
        selected = items.length - 1;
      }
      this.setState({selected});
    } else if (event.key === 'Enter' && items && items[this.state.selected]) {
      event.preventDefault();
      this.choose_(this.state.selected);
    }
  },

  handleItemSelect(event) {
    this.choose_(event.index);
  },

  handleItemHighlight(event) {
    this.setState({
      selected: event.index,
    });
  },

  choose_(index) {
    var value = this.state.items[index];

    this.setState({
      selected: -1,
      value,
      items: null,
    });

    this.fireChange_(value);
  },

  fireChange_(value) {
    if (this.props.onChange) {
      this.props.onChange({target: {value}});
    }
  },
});

var Item = React.createClass({
  render() {
    var rootClass = cx({
      'Item': true,
      'Item-hover': this.props.hover,
    });
    return (
      <div className={rootClass} onMouseDown={e => this.handleMouseDown(e)}
          onMouseEnter={e => this.handleMouseEnter(e)}>
        {this.props.value}
      </div>
    );
  },

  handleMouseDown(event) {
    event.preventDefault();
    this.props.onAction({index: this.props.index});
  },

  handleMouseEnter(event) {
    this.props.onHighlight({index: this.props.index});
  },
});

function match(pattern, items) {
  if (!items) {
    return Promise.resolve(null);
  }

  var pattern = pattern.toLowerCase();
  return new Promise((resolve, reject) => {
    resolve(items.filter(item => item.toLowerCase().indexOf(pattern) !== -1));
  });
}

module.exports = Autocomplete;
