import React from 'react';

import { ClickableProps } from './Clickable';
import { ClickableButtonArrow } from './ClickableButtonArrow';
import { ClickableButtonCaption } from './ClickableButtonCaption';
import { ClickableButtonOutline } from './ClickableButtonOutline';

export interface ClickableButtonProps
  extends Pick<
    ClickableProps,
    'leftIcon' | 'rightIcon' | 'isDisabled' | 'isLoading' | 'size' | 'arrow' | 'children' | 'isWarning' | 'isError'
  > {
  isFocused?: boolean;
}

export const ClickableButton = ({
  leftIcon,
  rightIcon,
  isDisabled,
  isLoading,
  isFocused,
  size,
  isWarning,
  isError,
  arrow,
  children,
}: ClickableButtonProps) => {
  return (
    <>
      <ClickableButtonOutline isFocused={isFocused} isDisabled={isDisabled} isWarning={isWarning} isError={isError} />
      {arrow && <ClickableButtonArrow arrow={arrow} size={size} />}
      <ClickableButtonCaption
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        isDisabled={isDisabled}
        isLoading={isLoading}
        size={size}
      >
        {children}
      </ClickableButtonCaption>
    </>
  );
};
