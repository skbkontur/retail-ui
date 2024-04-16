import React, { PropsWithChildren, isValidElement } from 'react';

import { useFocusControl } from './useFocusControl';

interface Props {
  /**
   * Использовать только когда на children нет пропса disabled
   */
  disabled?: boolean | undefined;

  /**
   * Событие вызывается когда элемент потеряет фокус, и при этом он задисэйблен
   */
  onBlurWhenDisabled(): void | undefined;
}

export function FocusControlWrapper({ children, disabled, onBlurWhenDisabled }: PropsWithChildren<Props>) {
  const isValidChildren = children && isValidElement(children);

  const { handleFocus, handleBlur } = useFocusControl({
    disabled: disabled ?? (isValidChildren ? children.props.disabled : undefined),
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
