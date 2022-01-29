import React, { forwardRef, useContext } from 'react';

import { keyListener } from '../../lib/events/keyListener';
import { RadioGroupContext } from '../RadioGroup/RadioGroupContext';

import { RadioProps } from './Radio';
import { styles } from './Radio.styles';

type RadioInputInterface = {
  isInRadioGroup: boolean;
  isRadioGroupChecked: boolean;
  setIsFocusedByKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RadioInputProps = RadioInputInterface & Omit<RadioProps, 'onMouseEnter' | 'onMouseLeave' | 'onMouseOver'>;

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  (
    {
      disabled,
      tabIndex,
      value,
      isInRadioGroup,
      onValueChange,
      onFocus,
      onBlur,
      onChange,
      name,
      suppressHydrationWarning,
      isRadioGroupChecked,
      setIsFocusedByKeyboard,
      checked,
      ...rest
    },
    ref,
  ) => {
    const radioGroupContext = useContext(RadioGroupContext);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      onValueChange?.(value);

      if (isInRadioGroup) {
        radioGroupContext.onSelect(value);
      }

      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<any>) => {
      if (!radioGroupContext.disabled) {
        // focus event fires before keyDown eventlistener
        // so we should check tabPressed in async way
        requestAnimationFrame(() => {
          if (keyListener.isArrowPressed || keyListener.isTabPressed) {
            setIsFocusedByKeyboard(true);
          }
        });

        if (onFocus) {
          onFocus(e);
        }
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      setIsFocusedByKeyboard(false);
    };

    return (
      <input
        {...rest}
        ref={ref}
        type="radio"
        className={styles.input()}
        disabled={disabled}
        tabIndex={tabIndex}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        checked={isInRadioGroup ? isRadioGroupChecked : checked}
        name={isInRadioGroup ? radioGroupContext.name : name}
        suppressHydrationWarning={isInRadioGroup ? true : suppressHydrationWarning}
      />
    );
  },
);
