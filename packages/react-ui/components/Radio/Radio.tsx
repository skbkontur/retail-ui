import React, { useRef, useState, useImperativeHandle } from 'react';
import propTypes from 'prop-types';

import { extractDataProps } from '../../lib/utils';
import { withClassWrapper } from '../../lib/withClassWrapper';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { Override } from '../../typings/utility-types';
import { CommonProps } from '../../internal/CommonWrapper';
import { keyListener } from '../../lib/events/keyListener';

import { RadioLabel } from './RadioLabel';
import { RadioInput } from './RadioInput';
import { RadioButton } from './RadioButton';
import { RadioText } from './RadioText';

type RadioInterface = {
  /**
   *  Cостояние валидации при ошибке.
   */
  error?: boolean;
  /**
   * Cостояние валидации при предупреждении.
   */
  warning?: boolean;
  /**
   * Состояние фокуса.
   */
  focused?: boolean;
  /**
   * Функция, вызываемая при изменении `value`.
   */
  onValueChange?: (value: any) => void;
  /**
   * HTML-атрибут `value`.
   */
  value: any;
};

type LabelProps = Pick<React.LabelHTMLAttributes<HTMLLabelElement>, 'onMouseEnter' | 'onMouseLeave' | 'onMouseOver'>;
type InputAndLabelProps = Override<React.InputHTMLAttributes<HTMLInputElement>, LabelProps>;

export type RadioProps = Override<InputAndLabelProps, RadioInterface> & CommonProps;

export type RadioInstanceFields = {
  focus: () => void;
  blur: () => void;
};

export type RadioState = {
  isFocusedByKeyboard: boolean;
  setIsFocusedByKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RadioRef = {
  element: HTMLInputElement;
  inputRef: React.RefObject<HTMLInputElement>;
};

const RadioFC = forwardRefAndName<
  RadioRef['element'],
  RadioProps & { instanceRef?: React.MutableRefObject<RadioInstanceFields | null> }
>(
  'RadioFC',
  (
    {
      disabled,
      warning,
      error,
      checked,
      tabIndex,
      name,
      value,
      style,
      focused = false,
      children,
      suppressHydrationWarning,
      onValueChange,
      onChange,
      onFocus,
      onBlur,
      onMouseOver,
      onMouseEnter,
      onMouseLeave,
      instanceRef,
      className,
      ...rest
    },
    ref,
  ) => {
    const { dataProps, restWithoutDataProps } = extractDataProps(rest);

    const [isFocusedByKeyboard, setIsFocusedByKeyboard] = useState(false);

    const inputRef = useRef<RadioRef['element']>(null);
    ref = inputRef;

    useImperativeHandle(instanceRef, () => ({
      focus: () => {
        keyListener.isTabPressed = true;
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      blur: () => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      },
    }));

    return (
      <RadioLabel
        checked={checked}
        onMouseOver={onMouseOver}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        inputRef={inputRef}
        style={style}
        className={className}
        {...dataProps}
      >
        <RadioInput
          {...restWithoutDataProps}
          ref={ref}
          checked={checked}
          disabled={disabled}
          tabIndex={tabIndex}
          value={value}
          onValueChange={onValueChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          name={name}
          suppressHydrationWarning={suppressHydrationWarning}
          setIsFocusedByKeyboard={setIsFocusedByKeyboard}
        />

        <RadioButton
          checked={checked}
          focused={focused}
          warning={warning}
          disabled={disabled}
          error={error}
          isFocusedByKeyboard={isFocusedByKeyboard}
          value={value}
        />

        {children && <RadioText disabled={disabled}>{children}</RadioText>}
      </RadioLabel>
    );
  },
);

RadioFC.propTypes = {
  error: propTypes.bool,
  warning: propTypes.bool,
  focused: propTypes.bool,
  onValueChange: propTypes.func,
  value: propTypes.node,
};

/**
 * Радио-кнопки используются, когда может быть выбран только один вариант из нескольких.
 */
export const Radio = withClassWrapper(RadioFC);
export type Radio = InstanceType<typeof Radio> & RadioInstanceFields;
