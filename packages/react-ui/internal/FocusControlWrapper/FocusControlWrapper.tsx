import React, { PropsWithChildren, isValidElement } from 'react';

import { useFocusControl } from './useFocusControl';

interface Props {
  disabled: boolean | undefined;
  onBlurWhenDisabled(): void | undefined;
}

export function FocusControlWrapper({ children, disabled, onBlurWhenDisabled }: PropsWithChildren<Props>) {
  const isValidChildren = children && isValidElement(children);

  const { handleFocus, handleBlur } = useFocusControl({
    disabled,
    onFocus: isValidChildren ? children.props.onFocus : undefined,
    onBlur: isValidChildren ? children.props.onBlur : undefined,
    onBlurWhenDisabled,
  });

  if (!isValidChildren) {
    return null;
  }

  return React.cloneElement(children, {
    ...children.props,
    onFocus: handleFocus,
    onBlur: handleBlur,
  });
}

FocusControlWrapper.__KONTUR_REACT_UI__ = 'FocusControlWrapper';
FocusControlWrapper.displayName = 'FocusControlWrapper';
