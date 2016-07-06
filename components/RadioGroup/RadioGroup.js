import React, {PropTypes} from 'react';

import Radio from '../Radio';

import styles from './RadioGroup.less';

class RadioGroup extends React.Component {
  static propTypes = {
    error: PropTypes.bool,

    /**
     * Набор значений. Поддерживаются любые перечисляемые типы, в том числе
     * `Array`, `Map`, `Immutable.Map`.
     *
     * Элементы воспринимаются следующим образом: если элемент — это массив, то
     * первый элемент является значением, а второй — отображается в списке;
     * если элемент не является массивом, то он используется и для отображения,
     * и для значения.
     */
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,

    /**
     * Функция для отрисовки элемента (той части, которая находится справа от
     * круглишка).
     *
     * Если внутри элемента используются ссылки, или другие активные элементы,
     * по клику на которые элемент списка выбираться не должен, то нужно
     * использовать компонент `RadioGroup.Prevent`:
     *
     * ```
     * function renderItem(value, data) {
     *   return (
     *     <div>
     *       {data}
     *       <RadioGroup.Prevent><Link>...</Link></RadioGroup.Prevent>
     *     </div>
     *   );
     * }
     * ```
     */
    renderItem: PropTypes.func,

    value: PropTypes.any,

    warning: PropTypes.bool,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onChange: PropTypes.func,
  };

  static defaultProps = {
    renderItem,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.value !== undefined ? props.value : null,
    };
  }

  render() {
    const inputProps = {
      type: 'checkbox',
      className: styles.input,
      onKeyDown: this.handleKey,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };

    const style = {};
    if (this.props.width) {
      style.width = this.props.width;
    }

    return (
      <label className={styles.root} style={style}>
        <input {...inputProps} />
        {this.renderItems()}
      </label>
    );
  }

  renderItems() {
    const items = this.mapItems((value, data, i) => {
      const checked = this.state.value === value;
      const focused = this.state.focused &&
          (checked || this.state.value == null && i === 0);
      return (
        <span key={i} className={styles.item}
          onClick={(e) => this.select_(value)}
        >
          <div className={styles.radio}>
            <Radio
              checked={checked}
              focused={focused}
              error={this.props.error}
              warning={this.props.warning}
            />
          </div>
          <div className={styles.label}>
            {this.props.renderItem(value, data)}
          </div>
        </span>
      );
    });

    return items;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== undefined) {
      this.setState({value: newProps.value});
    }
  }

  handleKey = event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.move_(-1);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.move_(1);
    }
  };

  handleFocus = event => {
    this.setState({focused: true});
  };

  handleBlur = event => {
    this.setState({focused: false});
  };

  move_(step) {
    let selectedIndex = -1;
    const items = this.mapItems((value, data, i) => {
      if (selectedIndex === -1 && value === this.state.value) {
        selectedIndex = i;
      }
      return value;
    });

    selectedIndex += step;
    if (selectedIndex < 0) {
      selectedIndex = items.length - 1;
    } else if (selectedIndex >= items.length) {
      selectedIndex = 0;
    }
    this.select_(items[selectedIndex]);
  }

  select_(value) {
    if (this.props.value === undefined) {
      this.setState({value});
    }
    if (this.props.onChange) {
      this.props.onChange({target: {value}}, value);
    }
  }

  mapItems(fn) {
    const items = [];
    let index = 0;
    for (const entry of this.props.items) {
      const [value, data] = normalizeEntry(entry);
      items.push(fn(value, data, index));
      ++index;
    }

    return items;
  }
}

class Prevent extends React.Component {
  render() {
    return (
      <span onClick={this._prevent}>{this.props.children}</span>
    );
  }

  _prevent = (event) => {
    event.stopPropagation();
  };
}

RadioGroup.Prevent = Prevent;

function renderItem(value, data) {
  return data;
}

function normalizeEntry(entry) {
  if (!Array.isArray(entry)) {
    return [entry, entry];
  }
  return entry;
}

export default RadioGroup;
