import React, { forwardRef } from 'react';

import { isEdge, isIE11 } from '../../lib/client';
import { keyListener } from '../../lib/events/keyListener';

import { CheckboxProps, CheckboxState } from './Checkbox';
import { styles } from './Checkbox.styles';

type CheckboxInputInterface = {
  resetIndeterminate: () => void;
  setIndeterminate: () => void;
  setIsFocusedByTab: React.Dispatch<React.SetStateAction<CheckboxState['isFocusedByTab']>>;
};

export type CheckboxInputProps = CheckboxInputInterface &
  Omit<CheckboxProps, 'onMouseEnter' | 'onMouseLeave' | 'onMouseOver'> &
  Pick<CheckboxState, 'isIndeterminate'>;

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  (
    {
      disabled,
      isIndeterminate,
      onValueChange,
      onClick,
      onChange,
      onBlur,
      onFocus,
      resetIndeterminate,
      setIndeterminate,
      setIsFocusedByTab,
      ...rest
    },
    ref,
  ) => {
    // TypeScript poorly infers type for ref.
    // Should be revisited after removing withClassWrapper.
    // @ts-expect-error
    const inputRef: React.RefObject<HTMLInputElement> | null = ref;

    const handleFocus = (e: React.FocusEvent<any>) => {
      if (!disabled) {
        // focus event fires before keyDown eventlistener
        // so we should check tabPressed in async way
        requestAnimationFrame(() => {
          if (keyListener.isTabPressed) {
            setIsFocusedByTab(true);
          }
        });

        if (onFocus) {
          onFocus(e);
        }
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(event.currentTarget.checked);

      resetIndeterminate();

      onChange?.(event);
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      onClick?.(e);
      // support IE11's and old Edge's special behavior
      // https://github.com/jquery/jquery/issues/1698
      if (isIndeterminate && (isIE11 || isEdge)) {
        resetIndeterminate();
        // simulate correct behavior only if onValueChange is used
        // because we cant simulate real native onChange event
        if (onValueChange && inputRef?.current) {
          const checked = !inputRef.current.checked;

          if (checked === undefined) {
            // in case of uncontrolled mode
            inputRef.current.checked = checked;
          }

          onValueChange(checked);
        }
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      setIsFocusedByTab(false);
    };

    return (
      <input
        {...rest}
        ref={inputRef}
        type="checkbox"
        disabled={disabled}
        className={styles.input()}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
      />
    );
  },
);

CheckboxInput.displayName = 'CheckboxInput';
