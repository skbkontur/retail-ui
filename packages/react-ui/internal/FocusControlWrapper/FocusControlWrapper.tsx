import { PropsWithChildren, isValidElement, cloneElement, CSSProperties } from 'react';

import { cx } from '../../lib/theming/Emotion';

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

  className?: string;
  style?: CSSProperties;
}

export function FocusControlWrapper({
  disabled,
  children,
  onBlurWhenDisabled,
  style,
  className,
  ...rest
}: PropsWithChildren<Props>) {
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

  return cloneElement(children, {
    ...rest,
    className: cx(children.props.className, className),
    style: { ...children.props.style, ...style },
    onFocus: handleFocus,
    onBlur: handleBlur,
  });
}

FocusControlWrapper.__KONTUR_REACT_UI__ = 'FocusControlWrapper';
FocusControlWrapper.displayName = 'FocusControlWrapper';
