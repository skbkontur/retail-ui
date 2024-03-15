import React from 'react';

import { ClickableProps } from './Clickable';
import { ClickableLinkChild, ClickableLinkChildProps } from './ClickableLinkChild';
import { ClickableLinkIcon } from './ClickableLinkIcon';

export interface ClickableLinkProps
  extends ClickableLinkChildProps,
    Pick<ClickableProps, 'leftIcon' | 'rightIcon' | 'loading'> {}

export const ClickableLink = ({ leftIcon, rightIcon, loading, focused, error, children }: ClickableLinkProps) => {
  return (
    <>
      {leftIcon && <ClickableLinkIcon icon={leftIcon} loading={loading} position="left" />}
      <ClickableLinkChild focused={focused} error={error}>
        {children}
      </ClickableLinkChild>
      {rightIcon && (
        <ClickableLinkIcon
          icon={rightIcon}
          loading={loading}
          position="right"
          hasBothIcons={!!leftIcon && !!rightIcon}
        />
      )}
    </>
  );
};
