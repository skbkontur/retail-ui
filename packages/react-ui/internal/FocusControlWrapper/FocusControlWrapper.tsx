import type { PropsWithChildren, ReactElement, Ref } from 'react';
import React, { cloneElement, forwardRef, isValidElement } from 'react';

import { CommonWrapper } from '../CommonWrapper/index.js';
import { useFocusControl } from './useFocusControl.js';

interface Props {
  /**
   * Использовать только когда на children нет пропса disabled
   */
  disabled?: boolean;

  /**
   * Событие вызывается когда элемент потеряет фокус, и при этом он задисэйблен
   */
  onBlurWhenDisabled(): void | undefined;

  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
}

export const FocusControlWrapper = forwardRef(
  ({ disabled, children, onBlurWhenDisabled, ...rest }: PropsWithChildren<Props>, ref: Ref<any>) => {
    const isValidChildren = children && isValidElement(children);

    const { handleFocus, handleBlur } = useFocusControl({
      disabled: disabled ?? (isValidChildren ? (children as ReactElement<Props>).props.disabled : undefined),
      onFocus: isValidChildren ? (children as ReactElement<Props>).props.onFocus : undefined,
      onBlur: isValidChildren ? (children as ReactElement<Props>).props.onBlur : undefined,
      onBlurWhenDisabled,
    });

    if (!isValidChildren) {
      return null;
    }

    return (
      <CommonWrapper {...rest} ref={ref}>
        {React.Children.only(
          cloneElement(children as ReactElement<Props>, {
            onFocus: handleFocus,
            onBlur: handleBlur,
          }),
        )}
      </CommonWrapper>
    );
  },
);

FocusControlWrapper.__KONTUR_REACT_UI__ = 'FocusControlWrapper';
FocusControlWrapper.displayName = 'FocusControlWrapper';
