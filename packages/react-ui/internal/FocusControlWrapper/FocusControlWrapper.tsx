import React, { PropsWithChildren, isValidElement, cloneElement } from 'react';

import { CommonWrapper } from '../CommonWrapper';

import { useFocusControl } from './useFocusControl';

interface Props {
  /**
   * Использовать только когда на children нет пропса disabled
   */
  disabled?: boolean;

  /**
   * Событие вызывается когда элемент потеряет фокус, и при этом он задисэйблен
   */
  onBlurWhenDisabled(): void | undefined;
}

export function FocusControlWrapper({ disabled, children, onBlurWhenDisabled, ...rest }: PropsWithChildren<Props>) {
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

  return (
    <CommonWrapper {...rest}>
      {React.Children.only(
        cloneElement(children, {
          onFocus: handleFocus,
          onBlur: handleBlur,
        }),
      )}
    </CommonWrapper>
  );
}

FocusControlWrapper.__KONTUR_REACT_UI__ = 'FocusControlWrapper';
FocusControlWrapper.displayName = 'FocusControlWrapper';
