import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import { extractDataProps } from '../../lib/utils';
import { keyListener } from '../../lib/events/keyListener';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { withClassWrapper } from '../../lib/withClassWrapper';
import { Override } from '../../typings/utility-types';
import { CommonProps } from '../../internal/CommonWrapper';

import { InputBox } from './InputBox';
import { CheckboxCaption } from './CheckboxCaption';
import { CheckboxLabel } from './CheckboxLabel';
import { CheckboxInput } from './CheckboxInput';
import { useIndeterminate } from './useIndeterminate';
import { useSkipFirstRender } from './useSkipFirstRender';

type CheckboxInterface = {
  /**
   * Контент `label`
   */
  children?: React.ReactNode;
  /**
   * Cостояние валидации при ошибке.
   */
  error?: boolean;
  /**
   * Cостояние валидации при предупреждении.
   */
  warning?: boolean;
  /**
   * Функция, вызываемая при изменении `value`.
   */
  onValueChange?: (value: boolean) => void;
  /**
   * [Неопределённое состояние](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate) чекбокса из HTML.
   */
  initialIndeterminate?: boolean;
};

type LabelProps = Pick<React.LabelHTMLAttributes<HTMLLabelElement>, 'onMouseEnter' | 'onMouseLeave' | 'onMouseOver'>;
type InputAndLabelProps = Override<React.InputHTMLAttributes<HTMLInputElement>, LabelProps>;

export type CheckboxProps = Override<InputAndLabelProps, CheckboxInterface> & CommonProps;

export type CheckboxState = {
  isFocusedByTab: boolean;
  setIsFocusedByTab: React.Dispatch<React.SetStateAction<boolean>>;
  isIndeterminate: boolean;
  setIsIndeterminate: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CheckboxInstanceFields = {
  focus: () => void;
  blur: () => void;
  setIndeterminate: () => void;
  resetIndeterminate: () => void;
};

export type CheckboxRef = {
  element: HTMLInputElement;
  inputRef: React.RefObject<HTMLInputElement>;
};

const CheckboxFC = forwardRefAndName<
  CheckboxRef['element'],
  CheckboxProps & { instanceRef?: React.MutableRefObject<CheckboxInstanceFields | null> }
>(
  'CheckboxFC',
  (
    {
      onClick,
      initialIndeterminate,
      checked,
      disabled,
      error,
      warning,
      onValueChange,
      children,
      onChange,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      instanceRef,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const { dataProps, restWithoutDataProps } = extractDataProps(rest);

    const [isFocusedByTab, setIsFocusedByTab] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(initialIndeterminate || false);

    const inputRef = useRef<CheckboxRef['element']>(null);
    ref = inputRef;

    const { resetIndeterminate, setIndeterminate } = useIndeterminate(inputRef, setIsIndeterminate);

    useEffect(() => {
      if (isIndeterminate && inputRef.current) {
        inputRef.current.indeterminate = true;
      }
    }, []);

    useSkipFirstRender(() => {
      resetIndeterminate();
    }, [checked]);

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
      resetIndeterminate: resetIndeterminate,
      setIndeterminate: setIndeterminate,
    }));

    return (
      <CheckboxLabel
        inputRef={inputRef}
        disabled={disabled}
        checked={checked}
        isIndeterminate={isIndeterminate}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        className={className}
        style={style}
        {...dataProps}
      >
        <CheckboxInput
          {...restWithoutDataProps}
          ref={inputRef}
          disabled={disabled}
          isIndeterminate={isIndeterminate}
          onValueChange={onValueChange}
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          resetIndeterminate={resetIndeterminate}
          setIndeterminate={setIndeterminate}
          setIsFocusedByTab={setIsFocusedByTab}
        />
        <InputBox
          isFocusedByTab={isFocusedByTab}
          isIndeterminate={isIndeterminate}
          checked={checked}
          disabled={disabled}
          error={error}
          warning={warning}
        />
        {children && <CheckboxCaption disabled={disabled}>{children}</CheckboxCaption>}
      </CheckboxLabel>
    );
  },
);

CheckboxFC.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  onValueChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export const Checkbox = withClassWrapper(CheckboxFC);
export type Checkbox = InstanceType<typeof Checkbox> & CheckboxInstanceFields;
