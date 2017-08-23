// @flow

import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

import Radio from '../Radio';
import Prevent from './Prevent';

import styles from './RadioGroup.less';

type Props = {
  disabled?: boolean,
  error?: boolean,
  inline?: boolean,
  items: Iterable<mixed>,
  onChange?: (event: { target: { value: mixed } }, value: mixed) => void,
  onMouseEnter?: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (e: SyntheticMouseEvent<>) => void,
  onMouseOver?: (e: SyntheticMouseEvent<>) => void,
  renderItem: (value: mixed, data: mixed) => React.Node,
  value: mixed,
  warning?: boolean,
  width?: number | string
};

type State = {
  focusedIndex: ?number
};

class RadioGroup extends React.Component<Props, State> {
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

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = { focusedIndex: null };
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
      <span className={styles.root} style={style}>
        <input {...inputProps} />
        {this.renderItems()}
      </span>
    );
  }

  renderItems() {
    const items = this._mapItems((itemValue: mixed, data: mixed, i: number) => {
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
          <Radio {...radioProps}>
            {this.props.renderItem(itemValue, data)}
          </Radio>
        </span>
      );
    });

    return items;
  }

  handleKey = (event: SyntheticKeyboardEvent<>) => {
    const focusedIndex = this.state.focusedIndex;
    if (typeof focusedIndex !== 'number') {
      return;
    }

    if (event.key === 'Enter') {
      if (!this.props.onChange) {
        return;
      }
      const [value] = normalizeEntry([...this.props.items][focusedIndex]);
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
    const { value } = this.props;
    const items = this._mapItems((value: mixed, data: mixed, i: number) => {
      return value;
    });
    const currentIndex = [...items].indexOf(value);
    const index = currentIndex > -1 ? currentIndex : 0;

    this.setState({ focusedIndex: index });
  };

  handleBlur = () => {
    this.setState({ focusedIndex: null });
  };

  move_(step: number) {
    let selectedIndex = this.state.focusedIndex;
    const items = this._mapItems((value: mixed, data: mixed, i: number) => {
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

  _mapItems<T>(fn: (v: mixed, d: mixed, i: number) => T): Array<T> {
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
