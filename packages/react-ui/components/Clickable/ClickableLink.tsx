import React from 'react';

import { ClickableProps } from './Clickable';
import { ClickableLinkChild, ClickableLinkChildProps } from './ClickableLinkChild';
import { ClickableLinkIcon } from './ClickableLinkIcon';

export interface ClickableLinkProps
  extends ClickableLinkChildProps,
    Pick<ClickableProps, 'leftIcon' | 'rightIcon' | 'isLoading'> {}

export const ClickableLink = ({ leftIcon, rightIcon, isLoading, isFocused, children }: ClickableLinkProps) => {
  return (
    <>
      {leftIcon && <ClickableLinkIcon icon={leftIcon} isLoading={isLoading} position="left" />}
      <ClickableLinkChild isFocused={isFocused}>{children}</ClickableLinkChild>
      {rightIcon && (
        <ClickableLinkIcon
          icon={rightIcon}
          isLoading={isLoading}
          position="right"
          hasBothIcons={!!leftIcon && !!rightIcon}
        />
      )}
    </>
  );
};
