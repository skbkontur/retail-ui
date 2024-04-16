import React, { PropsWithChildren, isValidElement } from 'react';

import type { CommonProps } from '../CommonWrapper';
import { extractCommonProps } from '../CommonWrapper/extractCommonProps';
import { cx } from '../../lib/theming/Emotion';

import { useFocusControl } from './useFocusControl';

interface Props extends CommonProps {
  /**
   * Использовать только когда на children нет пропса disabled
   */
  disabled?: boolean | undefined;

  /**
   * Событие вызывается когда элемент потеряет фокус, и при этом он задисэйблен
   */
  onBlurWhenDisabled(): void | undefined;
}

export function FocusControlWrapper({ disabled, onBlurWhenDisabled, ...rest }: PropsWithChildren<Props>) {
  const [{ className, style, children, rootNodeRef, ...dataProps }] = extractCommonProps(rest);

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
    ...dataProps,
    className: cx(children.props.className, className),
    style: {
      ...children.props.style,
      ...style,
    },
    onFocus: handleFocus,
    onBlur: handleBlur,
  });
}

FocusControlWrapper.__KONTUR_REACT_UI__ = 'FocusControlWrapper';
FocusControlWrapper.displayName = 'FocusControlWrapper';
