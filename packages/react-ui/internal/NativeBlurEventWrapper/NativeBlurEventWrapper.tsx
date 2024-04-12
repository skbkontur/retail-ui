import React, { PropsWithChildren } from 'react';

import { useFocusCotrol } from './useFocusCotrol';

interface Props {
  disabled: boolean | undefined;
  onBlurWhenDisabled(): void | undefined;
}

export const FocusControlWrapper = ({ children, disabled, onBlurWhenDisabled }: PropsWithChildren<Props>) => {
  const isChildrenValid = children && React.isValidElement(children);

  const { handleFocus, handleBlur } = useFocusCotrol({
    disabled,
    onFocus: isChildrenValid ? children.props.onFocus : undefined,
    onBlur: isChildrenValid ? children.props.onBlur : undefined,
    onBlurWhenDisabled,
  });

  if (!isChildrenValid) {
    return null;
  }

  return React.cloneElement(children, {
    ...children.props,
    onFocus: handleFocus,
    onBlur: handleBlur,
  });
};
