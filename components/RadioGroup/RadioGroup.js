// @flow

import classNames from 'classnames';
import React, { PropTypes } from 'react';
import events from 'add-event-listener';

import Radio from '../Radio';

import styles from './RadioGroup.less';

type Props = {
  disabled?: bool,
  error?: bool,
  inline?: bool,
  items: Iterable<any>,
  renderItem: (value: any, data: any) => React.Element<any>,
  value: any,
  warning?: bool,
  width?: number | string,
  onChange?: (event: any, value: any) => void,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  onMouseOver?: Function,
};

type State = {
  focusedIndex: ?number,
};

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

class RadioGroup extends React.Component {
  static Prevent = Prevent;

  static propTypes = {
    disabled: PropTypes.bool,

    error: PropTypes.bool,

    inline: PropTypes.bool,

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

    onChange: PropTypes.func
  };

  static defaultProps = {
    renderItem
  };

  props: Props;
  state: State;

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = { focusedIndex: null };
  }

  componentDidMount() {
    events.addEventListener(window, 'keyup', this.focusHandler);
  }

  componentWillUnmount() {
    events.removeEventListener(window, 'keyup', this.focusHandler);
  }

  render() {
    const inputProps = {
      type: 'checkbox',
      className: styles.input,
      disabled: this.props.disabled,
      onKeyDown: this.handleKey,
      onFocus: this.focusHandler,
      onBlur: this.handleBlur
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
    const items = this._mapItems((itemValue: any, data: any, i: number) => {
      const itemProps = {
        key: i,
        onClick: () => this._select(itemValue),
        onMouseEnter: this.props.onMouseEnter,
        onMouseLeave: this.props.onMouseLeave,
        onMouseOver: this.props.onMouseOver,
        className: classNames({
          [styles.item]: true,
          [styles.itemFirst]: i === 0,
          [styles.itemInline]: this.props.inline
        })
      };

      const radioProps = {
        disabled: this.props.disabled,
        error: this.props.error,
        warning: this.props.warning,
        checked: this.props.value === itemValue,
        focused: this.state.focusedIndex === i
      };

      return (
        <span {...itemProps}>
          <Radio {...radioProps} >
              {this.props.renderItem(itemValue, data)}
          </Radio>
        </span>
      );
    });

    return items;
  }

  handleKey = (event: SyntheticKeyboardEvent) => {
    const focusedIndex = this.state.focusedIndex;
    if (typeof focusedIndex !== 'number') {
      return;
    }

    if (event.key === 'Enter') {
      if (!this.props.onChange) {
        return;
      }
      const value = [...this.props.items][focusedIndex];
      this._select(value);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.move_(-1);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.move_(1);
    }
  };

  focusHandler = (event: KeyboardEvent) => {
    if (event.keyCode === 9) {
      const { value, items } = this.props;
      const currentIndex = [...items].indexOf(value);
      const index = currentIndex > -1 ? currentIndex : 0;

      this.setState({ focusedIndex: index });
    }
  }

  handleBlur = () => {
    this.setState({ focusedIndex: null });
  };

  move_(step: number) {
    let selectedIndex = this.state.focusedIndex;
    const items = this._mapItems((value: any, data: any, i: number) => {
      return value;
    });

    selectedIndex += step;

    if (selectedIndex < 0) {
      selectedIndex = items.length - 1;
    } else if (selectedIndex >= items.length) {
      selectedIndex = 0;
    }

    this._focus(selectedIndex);
  }

  _select(value) {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  }

  _focus(index) {
    this.setState({ focusedIndex: index });
  }

  _mapItems<T>(fn: (v: any, d: any, i: number) => T): Array<T> {
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
