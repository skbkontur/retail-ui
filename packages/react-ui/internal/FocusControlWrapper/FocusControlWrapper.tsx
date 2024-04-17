import React, { PropsWithChildren, isValidElement, HTMLAttributes } from 'react';

import { cx } from '../../lib/theming/Emotion';

import { useFocusControl } from './useFocusControl';

interface Props extends HTMLAttributes<unknown> {
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

  return React.cloneElement(children, {
    ...rest,
    className: /* todo: fix CommonWrapper перетирает className передавая пустую строку ""*/ cx(
      children.props.className,
      rest.className,
    ),
    style: /* todo: fix CommonWrapper перетирает style передавая пустой объект {} */ {
      ...children.props.style,
      ...rest.style,
    },
    onFocus: handleFocus,
    onBlur: handleBlur,
  });
}

FocusControlWrapper.__KONTUR_REACT_UI__ = 'FocusControlWrapper';
FocusControlWrapper.displayName = 'FocusControlWrapper';
