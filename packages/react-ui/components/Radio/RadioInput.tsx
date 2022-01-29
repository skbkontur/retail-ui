import React, { forwardRef } from 'react';
import { RadioState } from 'react-ui';

import { keyListener } from '../../lib/events/keyListener';
import { useRadioGroup } from '../RadioGroup/useRadioGroup';

import { RadioProps } from './Radio';
import { styles } from './Radio.styles';

export type RadioInputProps = Pick<RadioState, 'setIsFocusedByKeyboard'> &
  Omit<RadioProps, 'onMouseEnter' | 'onMouseLeave' | 'onMouseOver'>;

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  (
    {
      disabled,
      tabIndex,
      value,
      onValueChange,
      onFocus,
      onBlur,
      onChange,
      name,
      suppressHydrationWarning,
      setIsFocusedByKeyboard,
      checked,
      ...rest
    },
    ref,
  ) => {
    const { radioGroupContext, getIfInRadioGroup, isInRadioGroup, isRadioGroupChecked } = useRadioGroup(value);

    const inRadioGroupProps = getIfInRadioGroup({
      checked: isRadioGroupChecked,
      name: radioGroupContext.name,
      suppressHydrationWarning: true,
    });

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
        checked={checked}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...inRadioGroupProps}
      />
    );
  },
);
