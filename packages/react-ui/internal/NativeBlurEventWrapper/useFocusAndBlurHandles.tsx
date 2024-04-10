import React from 'react';

import { Nullable } from '../../typings/utility-types';

import { useFocusAndBlurHandle } from './useFocusAndBlurHandle';

interface Props {
  element?: Nullable<HTMLElement>;
  disabled?: boolean;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
}

export function useFocusAndBlurHandles({ element, disabled, onBlur, onFocus }: Props) {
  const [isFocused, setFocused] = React.useState<boolean>(false);

  const handleFocus = (e: React.FocusEvent) => {
    onFocus?.(e);
    setFocused(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    onBlur?.(e);
    setFocused(false);
  };

  useFocusAndBlurHandle(disabled, element, isFocused, handleBlur);

  return {
    handleFocus,
  };
}
