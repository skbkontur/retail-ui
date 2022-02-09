import * as React from 'react';
import * as PropTypes from 'prop-types';
import invariant from 'invariant';
import uuidv1 from 'uuid/v1';
import Prevent from './Prevent';
import Radio, { SyntheticRadioEvent } from '../Radio';
import styles from './RadioGroup.module.less';
import { createPropsGetter } from '../internal/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';
import FocusTrap from '../internal/FocusTrap/FocusTrap';

export type ItemType<T> = T | [T, React.ReactNode];

export interface RadioGroupProps<T> {
  defaultValue?: T;
  value?: T;
  items?: Array<ItemType<T>>;
  name?: string;
  disabled?: boolean;
  warning?: boolean;
  error?: boolean;
  inline?: boolean;
  width?: React.CSSProperties['width'];
  renderItem?: (itemValue: T, data: React.ReactNode) => React.ReactNode;
  onChange?: (event: SyntheticRadioEvent<T>, value: T) => any;
  onBlur?: (event: FocusEvent) => void;
  onMouseLeave?: () => any;
  onMouseOver?: () => any;
  onMouseEnter?: () => any;
}

export interface RadioGroupState<T> {
  activeItem?: T;
}

class RadioGroup<T> extends React.Component<RadioGroupProps<T>, RadioGroupState<T>> {
  public static childContextTypes = {
    error: PropTypes.bool,
    name: PropTypes.string,
    warning: PropTypes.bool,
    disabled: PropTypes.bool,
    activeItem: PropTypes.any,
    onSelect: PropTypes.func,
  };

  public static propTypes = {
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

    onBlur: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func,
  };

  public static defaultProps = {
    renderItem,
  };

  public static Prevent = Prevent;

  private _node: Nullable<HTMLSpanElement>;
  private _name = uuidv1();
  private getProps = createPropsGetter(RadioGroup.defaultProps);

  constructor(props: RadioGroupProps<T>) {
    super(props);

    this.state = {
      activeItem: this.props.defaultValue,
    };
  }

  public getChildContext() {
    return {
      activeItem: this._getValue(),
      onSelect: this._handleSelect,
      name: this._getName(),
      disabled: this.props.disabled,
      error: this.props.error,
      warning: this.props.warning,
    };
  }

  public render() {
    const { width, onMouseLeave, onMouseOver, onMouseEnter, onBlur } = this.props;
    const style = {
      width: width != null ? width : 'auto',
    };
    const handlers = {
      onMouseOver,
      onMouseEnter,
      onMouseLeave,
    };

    return (
      <FocusTrap onBlur={onBlur}>
        <span ref={this._ref} style={style} className={styles.root} {...handlers}>
          {this._renderChildren()}
        </span>
      </FocusTrap>
    );
  }

  /**
   * @public
   */
  public focus() {
    const node = this._node;
    if (!node) {
      return;
    }

    let radio = node.querySelector('input[type="radio"]:checked') as Nullable<HTMLInputElement>;

    // If no checked radios, try get first radio
    if (!radio || radio.disabled) {
      radio = node.querySelector('input[type="radio"]:not([disabled])') as Nullable<HTMLInputElement>;
    }

    if (radio) {
      radio.focus();
    }
  }

  private _getValue = () => (this._isControlled() ? this.props.value : this.state.activeItem);

  private _getName = () => this.props.name || this._name;

  private _isControlled = () => this.props.value !== undefined;

  private _handleSelect = (event: SyntheticRadioEvent<T>, value: T) => {
    if (!this._isControlled()) {
      this.setState({ activeItem: value });
    }
    if (this.props.onChange) {
      this.props.onChange(event, value);
    }
  };

  private _renderChildren() {
    const { items, children } = this.props;
    invariant((!items && children) || (items && !children), 'Either items or children must be passed, not both');
    return items ? mapItems(this._renderRadio, items) : children;
  }

  private _renderRadio = (itemValue: T, data: React.ReactNode, index: number): JSX.Element => {
    const itemProps = {
      key: typeof itemValue === 'string' || typeof itemValue === 'number' ? itemValue : index,
      className: cx({
        [styles.item]: true,
        [styles.itemFirst]: index === 0,
        [styles.itemInline]: !!this.props.inline,
      }),
    };

    return (
      <span {...itemProps}>
        <Radio value={itemValue}>{this.getProps().renderItem(itemValue, data)}</Radio>
      </span>
    );
  };

  private _ref = (element: HTMLSpanElement) => {
    this._node = element;
  };
}

export default RadioGroup;

function renderItem(_value: any, data: React.ReactNode) {
  return data;
}

function mapItems(fn: (value: any, data: any, index: number) => React.ReactNode, items: any[]) {
  const result = [];
  let index = 0;
  for (const entry of items) {
    const [value, data] = normalizeEntry(entry);
    result.push(fn(value, data, index));
    ++index;
  }
  return result;
}

function normalizeEntry(entry: any[]) {
  if (!Array.isArray(entry)) {
    return [entry, entry];
  }
  return entry;
}
