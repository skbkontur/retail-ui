import React, { useEffect } from 'react';

interface Props {
  disabled?: boolean;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
  onBlurWhenDisabled?(): void;
}

// "fix" bug in react https://github.com/facebook/react/issues/9142
export function useFocusCotrol({ disabled, onBlur, onFocus, onBlurWhenDisabled }: Props) {
  const [isFocused, setFocused] = React.useState<boolean>(false);

  useEffect(() => {
    if (disabled && isFocused && onBlurWhenDisabled) {
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
