import type React from 'react';
import { useEffect, useState } from 'react';

interface Props {
  disabled?: boolean;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onBlurWhenDisabled?(): void;
}

export function useFocusControl({ disabled, onFocus, onBlur, onBlurWhenDisabled }: Props) {
  const [isFocused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    if (disabled && isFocused && onBlurWhenDisabled) {
      // force calling custom blur event, try "fix" bug in react https://github.com/facebook/react/issues/9142
      onBlurWhenDisabled();
    }
  }, [disabled, isFocused]);

  const handleFocus = (e: React.FocusEvent) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent) => {
    setFocused(false);
    onBlur?.(e);
  };

  return {
    handleFocus,
    handleBlur,
  };
}
