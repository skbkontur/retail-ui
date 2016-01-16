import classNames from 'classnames';
import React, {PropTypes} from 'react';

import Input from '../Input';

import styles from './Autocomplete.less';

/**
 * Стандартный инпут с подсказками.
 *
 * Все свойства передаются во внутренний *Input*.
 */
class Autocomplete extends React.Component {
  static propTypes = {
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
  };

  static defaultProps = {
    renderItem,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: -1,
      value: props.value !== undefined ? props.value
          : props.defaultValue,
    };
    this.opened_ = false;
  }

  render() {
    var inputProps = {
      value: this.state.value,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKey,
    };
    return (
      <span className={styles.root}>
        <Input {...this.props} {...inputProps} />
        {this.renderMenu()}
      </span>
    );
  }

  renderMenu() {
    var items = this.state.items;
    if (!items || items.length === 0) {
      return null;
    }

    return (
      <div className={styles.menuHolder}>
        <div className={styles.menu}>
          {items.map((item, i) => {
            const rootClass = classNames({
              [styles.item]: true,
              [styles.itemHover]: this.state.selected === i,
              [styles.itemPadLeft]: this.props.leftIcon,
            });
            return (
              <div key={i} className={rootClass}
                onMouseDown={(e) => this.handleItemClick(e, i)}
                onMouseEnter={(e) => this.setState({selected: i})}
                onMouseLeave={(e) => this.setState({selected: -1})}
              >
                {this.props.renderItem(item)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    if (props.value !== undefined) {
      this.setState({value: props.value});
      this.updateItems(props.value);
    }
  }

  handleChange = event => {
    this.opened_ = true;

    const value = event.target.value;

    if (this.props.value === undefined) {
      this.setState({value});
    }
    this.updateItems(value);

    this.fireChange_(value);
  };

  handleBlur = event => {
    this.opened_ = false;
    this.setState({items: null});

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleKey = event => {
    var items = this.state.items;
    var stop = false;
    if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && items) {
      event.preventDefault();
      stop = true;

      const step = event.key === 'ArrowUp' ? -1 : 1;
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
  };

  handleItemClick(event, index) {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    this.choose_(index);
  }

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
  }

  updateItems(value) {
    if (!this.opened_) {
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
    promise.then((items) => {
      if (this.state.value === value && this.opened_) {
        this.setState({
          items,
          selected: -1,
        });
      }
    });
  }

  fireChange_(value) {
    if (this.props.onChange) {
      this.props.onChange({target: {value}}, value);
    }
  }
}

function match(pattern, items) {
  if (!pattern || !items) {
    return Promise.resolve(null);
  }

  pattern = pattern.toLowerCase();
  let filteredItems = items.filter((item) => item.toLowerCase().indexOf(pattern) !== -1);
  return Promise.resolve(filteredItems);
}

function renderItem(item) {
  return item;
}

module.exports = Autocomplete;
