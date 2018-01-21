import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import uuidv1 from 'uuid/v1';
import Prevent from './Prevent';

import Radio from '../Radio';

import styles from './RadioGroup.less';

class RadioGroup extends React.Component {
  static childContextTypes = {
    error: PropTypes.bool,
    name: PropTypes.string,
    warning: PropTypes.bool,
    disabled: PropTypes.bool,
    activeItem: PropTypes.any,
    onSelect: PropTypes.func
  };

  static propTypes = {
    /**
     * Может быть использовано, если не передан параметр `items`
     *
     * `children` может содержать любую разметку с компонентами Radio.
     * Каждому компоненту Radio нужно указать параметр `value`, такого же типа
     * как и параметр `value` самой радиогруппы.
     *
     * Значения активного элемента сравниваются по строгому равенству `===`
     */
    children: PropTypes.node,

    /**
     * Значение по умолчанию. Должно быть одним из значений дочерних радиокнопок
     * или значей из параметра `items`
     */
    defaultValue: PropTypes.any,

    /**
     * Дизейблит все радиокнопки
     */
    disabled: PropTypes.bool,

    /**
     * Переводит все радиокнопки в состоянии ошибки
     */
    error: PropTypes.bool,

    /**
     * Выравнивает элементы в строку. Не работает с `children`
     */
    inline: PropTypes.bool,

    /**
     * Может быть использовано, если не передан параметр `children`
     *
     * Массив параметров радиокнопок. Может быть типа `Array<Value>` или
     * `Array<[Value, Data]>`, где тип `Value` — значение радиокнопки, а `Data`
     * — значение которое будет использовано вторым параметром в `renderItem`.
     * Если тип `items: Array<Value>`, то он будет приведен к типу
     * `Array<[Value, Value]>`
     */
    items: PropTypes.any,

    /**
     * Аттрибут name для вложенных радиокнопок. Если не указан, то сгенерируется
     * случайное имя по алгоритму
     * [uuid v1](https://github.com/kelektiv/node-uuid#version-1)
     */
    name: PropTypes.string,

    /**
     * Метод отрисовки контента радиокнопки. Не работает с `children`.
     *
     * Принимает два аргумента: `(value: Value, data: Data) => React.Node`
     */
    renderItem: PropTypes.func,

    /**
     * Значение радиогруппы. Должно быть одним из значений радиокнопок.
     * Если не указано, то компонент будет работать, как неконтроллируемый
     */
    value: PropTypes.any,

    /**
     * Переводит все радиокнопки в состоянии предупреждения
     */
    warning: PropTypes.bool,

    /**
     * Ширина радиогруппы. Не работает с `children`
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Обработчик события при переключении радиокнопок.
     * Имеет тип
     * `(event: SyntheticInputEvent<HTMLInputElement>, value: Value) => any`
     */
    onChange: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func
  };

  static defaultProps = {
    renderItem
  };

  static Prevent = Prevent;

  _name = uuidv1();
  _node = null;

  state = {
    activeItem: this.props.defaultValue
  };

  getChildContext() {
    return {
      activeItem: this._getValue(),
      onSelect: this._handleSelect,
      name: this._getName(),
      disabled: this.props.disabled,
      error: this.props.error,
      warning: this.props.warning
    };
  }

  /**
   * @public
   **/
  focus() {
    const node = this._node;
    if (!node) {
      return;
    }

    let radio = node.querySelector('input[type="radio"]:checked');

    // If no checked radios, try get first radio
    if (!radio || radio.disabled) {
      radio = node.querySelector('input[type="radio"]:not([disabled])');
    }
    radio && radio.focus();
  }

  _getValue = () =>
    this._isControlled() ? this.props.value : this.state.activeItem;

  _getName = () => this.props.name || this._name;

  _isControlled = () => this.props.value != null;

  _handleSelect = (event, value) => {
    if (!this._isControlled()) {
      this.setState({ activeItem: value });
    }
    if (this.props.onChange) {
      this.props.onChange(event, value);
    }
  };

  render() {
    const { width, onMouseLeave, onMouseOver, onMouseEnter } = this.props;
    const style = {
      width: width != null ? width : 'auto'
    };
    const handlers = {
      onMouseOver,
      onMouseEnter,
      onMouseLeave
    };
    return (
      <span ref={this._ref} style={style} className={styles.root} {...handlers}>
        {this._renderChildren()}
      </span>
    );
  }

  _renderChildren() {
    const { items, children } = this.props;
    invariant(
      (!items && children) || (items && !children),
      'Either items or children must be passed, not both'
    );
    return items ? mapItems(this._renderRadio, items) : children;
  }

  _renderRadio = (itemValue, data, i) => {
    const itemProps = {
      key: itemValue,
      className: classNames({
        [styles.item]: true,
        [styles.itemFirst]: i === 0,
        [styles.itemInline]: this.props.inline
      })
    };

    return (
      <span {...itemProps}>
        <Radio value={itemValue}>
          {this.props.renderItem(itemValue, data)}
        </Radio>
      </span>
    );
  };

  _ref = el => {
    this._node = el;
  };
}

export default RadioGroup;

function renderItem(value, data) {
  return data;
}

function mapItems(fn, items) {
  const result = [];
  let index = 0;
  for (const entry of items) {
    const [value, data] = normalizeEntry(entry);
    result.push(fn(value, data, index));
    ++index;
  }
  return result;
}

function normalizeEntry(entry) {
  if (!Array.isArray(entry)) {
    return [entry, entry];
  }
  return entry;
}
