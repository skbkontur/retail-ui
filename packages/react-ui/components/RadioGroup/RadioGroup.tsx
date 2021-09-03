import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';

import { getRandomID } from '../../lib/utils';
import { Radio } from '../Radio';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import { FocusTrap } from '../../internal/FocusTrap';
import { theme } from '../../lib/theming/decorators';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './RadioGroup.styles';
import { Prevent } from './Prevent';

export interface RadioGroupProps<T = string | number> extends CommonProps {
  defaultValue?: T;
  value?: T;
  items?: T[] | [T, React.ReactNode][];
  name?: string;
  disabled?: boolean;
  warning?: boolean;
  error?: boolean;
  inline?: boolean;
  width?: React.CSSProperties['width'];
  renderItem?: (itemValue: T, data: React.ReactNode) => React.ReactNode;
  /** Вызывается при изменении `value` */
  onValueChange?: (value: T) => void;
  onBlur?: (event: FocusEvent) => void;
  onMouseLeave?: () => any;
  onMouseOver?: () => any;
  onMouseEnter?: () => any;
}

export interface RadioGroupState<T> {
  activeItem?: T;
}

@theme
export class RadioGroup<T> extends React.Component<RadioGroupProps<T>, RadioGroupState<T>> {
  public static __KONTUR_REACT_UI__ = 'RadioGroup';

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
     * `(value: Value) => any`
     */
    onValueChange: PropTypes.func,

    onBlur: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func,
  };

  public static defaultProps = {
    renderItem,
  };

  public static Prevent = Prevent;

  private readonly theme!: Theme;

  private node: Nullable<HTMLSpanElement>;
  private name = getRandomID();
  private getProps = createPropsGetter(RadioGroup.defaultProps);

  constructor(props: RadioGroupProps<T>) {
    super(props);

    this.state = {
      activeItem: this.props.defaultValue,
    };
  }

  public getChildContext() {
    return {
      activeItem: this.getValue(),
      onSelect: this.handleSelect,
      name: this.getName(),
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
      <CommonWrapper {...this.props}>
        <FocusTrap onBlur={onBlur}>
          <span ref={this.ref} style={style} className={styles.root()} {...handlers}>
            {this.renderChildren()}
          </span>
        </FocusTrap>
      </CommonWrapper>
    );
  }

  /**
   * @public
   */
  public focus() {
    const node = this.node;
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

  private getValue = () => (this.isControlled() ? this.props.value : this.state.activeItem);

  private getName = () => this.props.name || this.name;

  private isControlled = () => this.props.value != null;

  private handleSelect = (value: T) => {
    if (!this.isControlled()) {
      this.setState({ activeItem: value });
    }
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  private renderChildren() {
    const { items, children } = this.props;
    invariant((!items && children) || (items && !children), 'Either items or children must be passed, not both');
    return items ? mapItems<T>(this.renderRadio, items) : children;
  }

  private renderRadio = (itemValue: T, data: React.ReactNode, index: number): JSX.Element => {
    const itemProps = {
      key: typeof itemValue === 'string' || typeof itemValue === 'number' ? itemValue : index,
      className: cx({
        [styles.item(this.theme)]: true,
        [styles.itemFirst()]: index === 0,
        [styles.itemInline()]: !!this.props.inline,
      }),
    };

    return (
      <span {...itemProps}>
        <Radio value={itemValue}>{this.getProps().renderItem<T>(itemValue, data)}</Radio>
      </span>
    );
  };

  private ref = (element: HTMLSpanElement) => {
    this.node = element;
  };
}

function renderItem<T>(_value: T, data: React.ReactNode) {
  return data;
}

function mapItems<T>(
  fn: (value: T, data: React.ReactNode, index: number) => React.ReactNode,
  items: T[] | [T, React.ReactNode][],
) {
  const result: React.ReactNode[] = [];
  let index = 0;
  for (const entry of items) {
    const [value, data] = normalizeEntry<T>(entry);
    result.push(fn(value, data, index));
    ++index;
  }
  return result;
}

function normalizeEntry<T>(entry: T | [T, React.ReactNode]): [T, React.ReactNode] {
  if (!Array.isArray(entry)) {
    return [entry, entry];
  }
  return entry;
}
