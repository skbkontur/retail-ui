import React, { useState, useImperativeHandle } from 'react';
import propTypes from 'prop-types';

import { ReactUIComponentWithRef } from '../../lib/forwardRefAndName';
import { withClassWrapper } from '../../lib/withClassWrapper';
import { getRandomID } from '../../lib/utils';
import { FocusTrap } from '../../internal/FocusTrap';
import { CommonProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './RadioGroup.styles';
import { RadioGroupContext } from './RadioGroupContext';
import { RadioGroupChildren } from './RadioGroupChildren';
import { getRadioButton } from './utils';

type RadioGroupInterface<T = string | number> = {
  /**
   * Значение по умолчанию. Должно быть одним из значений дочерних радиокнопок
   * или значений из параметра `items`
   */
  defaultValue?: T;
  /**
   * Значение радиогруппы. Должно быть одним из значений радиокнопок.
   * Если не указано, то компонент будет работать, как неконтроллируемый
   */
  value?: T;
  /**
   * Может быть использовано, если не передан параметр `children`
   *
   * Массив параметров радиокнопок. Может быть типа `Array<Value>` или
   * `Array<[Value, Data]>`, где тип `Value` — значение радиокнопки, а `Data`
   * — значение которое будет использовано вторым параметром в `renderItem`.
   * Если тип `items: Array<Value>`, то он будет приведен к типу
   * `Array<[Value, Value]>`
   */
  items?: T[] | [T, React.ReactNode][];
  /**
   * Аттрибут name для вложенных радиокнопок. Если не указан, то сгенерируется
   * случайное имя
   */
  name?: string;
  /**
   * Дизейблит все радиокнопки
   */
  disabled?: boolean;
  /**
   * Переводит все радиокнопки в состояние валидации: предупреждение.
   */
  warning?: boolean;
  /**
   * Переводит все радиокнопки в состояние валидации: ошибка.
   */
  error?: boolean;
  /**
   * Выравнивает элементы в строку. Не работает с `children`
   */
  inline?: boolean;
  /**
   * Ширина радиогруппы. Не работает с `children`
   */
  width?: React.CSSProperties['width'];
  /**
   * Метод отрисовки контента радиокнопки. Не работает с `children`.
   *
   * Принимает два аргумента: `(value: Value, data: Data) => React.Node`
   */
  renderItem?: (itemValue: T, data: React.ReactNode) => React.ReactNode;
  /** Вызывается при изменении `value` */
  onValueChange?: (value: T) => void;
  onBlur?: (event: FocusEvent) => void;
  children?: React.ReactNode;
};

export type RadioGroupInstanceFields = {
  focus: () => void;
};

export type RadioGroupProps<T> = RadioGroupInterface<T> &
  Pick<React.HTMLAttributes<HTMLSpanElement>, 'onMouseLeave' | 'onMouseOver' | 'onMouseEnter'> &
  CommonProps & {
    ref: RadioGroupRef['publicRef'];
    instanceRef?: React.MutableRefObject<RadioGroupInstanceFields | null>;
  };

export interface RadioGroupState<T> {
  activeItem?: T;
}

export type RadioGroupRef = {
  element: HTMLSpanElement;
  publicRef: React.RefObject<RadioGroupRef['element']>;
};

const generatedName = getRandomID();

function RadioGroupFC<T>({
  onBlur,
  style,
  ref,
  children,
  inline,
  items,
  disabled,
  warning,
  error,
  name,
  value,
  width,
  className,
  instanceRef,
  defaultValue,
  onValueChange,
  onMouseEnter,
  onMouseLeave,
  onMouseOver,
  ...rest
}: RadioGroupProps<T>) {
  const [activeItem, setActiveItem] = useState(defaultValue);

  const isControlled = value != null;
  const currentValue = isControlled ? value : activeItem;

  const handleSelect = (value: T) => {
    if (!isControlled) {
      setActiveItem(value);
    }

    if (onValueChange) {
      onValueChange(value);
    }
  };

  const publicRef = React.useRef<RadioGroupRef['element']>(null);
  ref = publicRef;

  useImperativeHandle(instanceRef, () => ({
    focus: () => {
      if (!publicRef.current) {
        return;
      }

      const radio = getRadioButton(publicRef.current);

      if (radio) {
        radio.focus();
      }
    },
  }));

  return (
    <FocusTrap onBlur={onBlur}>
      <span
        ref={publicRef}
        style={{ width: width ?? 'auto', ...style }}
        className={cx(styles.root(), className)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        {...rest}
      >
        <RadioGroupContext.Provider
          value={{
            activeItem: currentValue,
            onSelect: handleSelect,
            name: name || generatedName,
            disabled: disabled,
            error: error,
            warning: warning,
          }}
        >
          <RadioGroupChildren items={items} inline={inline}>
            {children}
          </RadioGroupChildren>
        </RadioGroupContext.Provider>
      </span>
    </FocusTrap>
  );
}

RadioGroupFC.propTypes = {
  children: propTypes.node,
  disabled: propTypes.bool,
  error: propTypes.bool,
  inline: propTypes.bool,
  name: propTypes.string,
  warning: propTypes.bool,
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),
  onBlur: propTypes.func,
};

Object.assign(RadioGroupFC, { __KONTUR_REACT_UI__: 'RadioGroupFC' });

/**
 *
 * `children` может содержать любую разметку с компонентами Radio,
 * если не передан параметр `items`.
 * Каждому компоненту Radio нужно указать параметр `value`, такого же типа
 * как и параметр `value` самой радиогруппы.
 *
 * Значения активного элемента сравниваются по строгому равенству `===`
 */
export const RadioGroup = withClassWrapper(
  RadioGroupFC as unknown as ReactUIComponentWithRef<RadioGroupRef['element'], RadioGroupProps<any>>,
);
export type RadioGroup = InstanceType<typeof RadioGroup> & RadioGroupInstanceFields;
