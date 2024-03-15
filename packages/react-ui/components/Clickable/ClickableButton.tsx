import React from 'react';

import { ClickableProps } from './Clickable';
import { ClickableButtonArrow } from './ClickableButtonArrow';
import { ClickableButtonCaption } from './ClickableButtonCaption';
import { ClickableButtonOutline } from './ClickableButtonOutline';

export interface ClickableButtonProps
  extends Pick<
    ClickableProps,
    'leftIcon' | 'rightIcon' | 'disabled' | 'loading' | 'size' | 'arrow' | 'children' | 'warning' | 'error'
  > {
  focused?: boolean;
}

export const ClickableButton = ({
  leftIcon,
  rightIcon,
  disabled,
  loading,
  focused,
  size,
  warning,
  error,
  arrow,
  children,
}: ClickableButtonProps) => {
  return (
    <>
      <ClickableButtonOutline focused={focused} disabled={disabled} warning={warning} error={error} />
      {arrow && <ClickableButtonArrow arrow={arrow} size={size} />}
      <ClickableButtonCaption
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        disabled={disabled}
        loading={loading}
        size={size}
      >
        {children}
      </ClickableButtonCaption>
    </>
  );
};
