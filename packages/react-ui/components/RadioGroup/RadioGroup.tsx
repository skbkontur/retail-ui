import type { AriaAttributes } from 'react';
import React from 'react';
import invariant from 'invariant';

import { getRandomID, isNonNullable } from '../../lib/utils';
import { Radio } from '../Radio';
import { createPropsGetter } from '../../lib/createPropsGetter';
import type { Nullable } from '../../typings/utility-types';
import { FocusTrap } from '../../internal/FocusTrap';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import type { TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { getVisualStateDataAttributes } from '../../internal/CommonWrapper/utils/getVisualStateDataAttributes';
import type { ReactUIFeatureFlags } from '../../lib/featureFlagsContext';
import { getFullReactUIFlagsContext, ReactUIFeatureFlagsContext } from '../../lib/featureFlagsContext';

import { styles } from './RadioGroup.styles';
import { Prevent } from './Prevent';
import type { RadioGroupContextType } from './RadioGroupContext';
import { RadioGroupContext } from './RadioGroupContext';

export interface RadioGroupProps<T = string | number> extends CommonProps {
  /** Задает значение по умолчанию. Должно быть одним из значений дочерних радиокнопок или значений из параметра `items`. */
  defaultValue?: T;

  /** Задает значение радиогруппы. Должно быть одним из значений радиокнопок.
   * Если не указано, то компонент будет работать, как неконтролируемый. */
  value?: T;

  /** Задает массив параметров радиокнопок. Может быть типа `Array<Value>` или `Array<[Value, Data]>`,
   * где тип `Value` — значение радиокнопки, а `Data` — значение которое будет использовано вторым параметром в `renderItem`.
   * Тип `Array<Value>` будет приведен к типу `Array<[Value, Value]>`.
   * Может быть использовано, если не передан параметр `children`. */
  items?: T[] | Array<[T, React.ReactNode]>;

  /** Устанавливает аттрибут name для вложенных радиокнопок. Если не указан, то сгенерируется случайное имя. */
  name?: string;

  /** Получает уникальный ключ по элементу
   * @param item - элемент, по которуму нужно получить ключ. */
  toKey?: (item: T) => string | number;

  /** Делает все радиокнопки недоступными. */
  disabled?: boolean;

  /** Переводит все радиокнопки в состояние валидации "предупреждение". */
  warning?: boolean;

  /** Переводит все радиокнопки в состояние валидации "ошибка". */
  error?: boolean;

  /** Выравнивает элементы items в строку. Не работает с children. */
  inline?: boolean;

  /** Задает ширину радиогруппы. Не работает с `children`. */
  width?: React.CSSProperties['width'];

  /** Задает функцию, которая отображает контент радиокнопки. Не работает с `children`.
   * @param {Value} itemValue - значение радиокнопки.
   * @param {Data} data - значение для отрисовки радиокнопки. */
  renderItem?: (itemValue: T, data: React.ReactNode) => React.ReactNode;

  /** @ignore */
  'aria-describedby'?: AriaAttributes['aria-describedby'];

  /** Задает функцию, которая вызывается при изменении значения радиогруппы (value). */
  onValueChange?: (value: T) => void;

  /** Задает функцию, которая вызывается при потере радиогруппой фокуса. */
  onBlur?: (event: FocusEvent) => void;

  /** Задает функцию, которая вызывается при уходе мышки с объекта (событие `onmouseleave`). */
  onMouseLeave?: () => any;

  /** Задает функцию, которая вызывается при наведении мышкой (событие `onmouseover`). */
  onMouseOver?: () => any;

  /** Задает функцию, которая вызывается при наведении мышкой (событие `onmouseenter`). См разницу с onMouseOver в [документации](https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave)  */
  onMouseEnter?: () => any;
}

export interface RadioGroupState<T> {
  activeItem?: T;
}

export const RadioGroupDataTids = {
  root: 'RadioGroup__root',
} as const;

type DefaultProps = Required<Pick<RadioGroupProps<unknown>, 'renderItem'>>;

/**
 * Группа радиокнопок `RadioGroup` используется для выбора одного значения из нескольких, когда вариантов выбора немного — 2–5.
 *
 * `children` может содержать любую разметку с компонентами Radio, если не передан параметр `items`.
 * Каждому компоненту Radio нужно указать параметр `value`, такого же типа, как и параметр `value` самой радиогруппы.
 *
 * Значения активного элемента сравниваются по строгому равенству `===`.
 */
@rootNode
export class RadioGroup<T> extends React.Component<RadioGroupProps<T>, RadioGroupState<T>> {
  public static __KONTUR_REACT_UI__ = 'RadioGroup';
  public static displayName = 'RadioGroup';

  public static defaultProps: DefaultProps = {
    renderItem,
  };

  public static Prevent = Prevent;

  private node: Nullable<HTMLSpanElement>;
  private name = getRandomID();
  private getProps = createPropsGetter(RadioGroup.defaultProps);
  private setRootNode!: TSetRootNode;
  private featureFlags!: ReactUIFeatureFlags;

  constructor(props: RadioGroupProps<T>) {
    super(props);

    this.state = {
      activeItem: this.props.defaultValue,
    };
  }

  private getRadioGroupContextValue = (): RadioGroupContextType<T> => {
    return {
      activeItem: this.getValue(),
      onSelect: this.handleSelect,
      name: this.getName(),
      disabled: this.props.disabled,
      error: this.props.error,
      warning: this.props.warning,
    };
  };

  public render() {
    const {
      width,
      onMouseLeave,
      onMouseOver,
      onMouseEnter,
      onBlur,
      'aria-describedby': ariaDescribedby,
      disabled,
    } = this.props;
    const style = {
      width: width ?? 'auto',
    };
    const handlers = {
      onMouseOver,
      onMouseEnter,
      onMouseLeave,
    };

    return (
      <ReactUIFeatureFlagsContext.Consumer>
        {(flags) => {
          this.featureFlags = getFullReactUIFlagsContext(flags);
          return (
            <CommonWrapper
              rootNodeRef={this.setRootNode}
              {...this.props}
              {...getVisualStateDataAttributes({ disabled })}
            >
              <FocusTrap onBlur={onBlur}>
                <span
                  data-tid={RadioGroupDataTids.root}
                  ref={this.ref}
                  style={style}
                  className={cx({
                    [styles.root()]: true,
                    [styles.removeBaselineSpacer()]: this.featureFlags.radioGroupRemoveBaselineSpacer,
                  })}
                  role="radiogroup"
                  {...handlers}
                  aria-describedby={ariaDescribedby}
                >
                  <RadioGroupContext.Provider value={this.getRadioGroupContextValue()}>
                    {this.renderChildren()}
                  </RadioGroupContext.Provider>
                </span>
              </FocusTrap>
            </CommonWrapper>
          );
        }}
      </ReactUIFeatureFlagsContext.Consumer>
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

  private isControlled = () => isNonNullable(this.props.value);

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
      key: this.getKeyByItem(itemValue),
      className: cx({
        [styles.item()]: true,
        [styles.itemFirst()]: index === 0,
        [styles.itemInline()]: !!this.props.inline,
      }),
    };

    return (
      <span {...itemProps} role="presentation">
        <Radio value={itemValue}>{this.getProps().renderItem(itemValue, data)}</Radio>
      </span>
    );
  };

  private getKeyByItem = (itemValue: T) => {
    if (this.props.toKey) {
      return this.props.toKey(itemValue);
    }
    return typeof itemValue === 'string' || typeof itemValue === 'number' ? itemValue : undefined;
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
  items: T[] | Array<[T, React.ReactNode]>,
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
    return [entry, entry as unknown as React.ReactNode];
  }
  return entry;
}
