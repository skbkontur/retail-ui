import React from 'react';

import { ClickableLinkChild, ClickableLinkChildProps } from './ClickableLinkChild';
import { ClickableLinkIcon, ClickableLinkIconProps } from './ClickableLinkIcon';

export interface ClickableLinkProps extends ClickableLinkChildProps, ClickableLinkIconProps {}

export const ClickableLink = ({ leftIcon, isLoading, isFocused, children }: ClickableLinkProps) => {
  return (
    <>
      <ClickableLinkIcon leftIcon={leftIcon} isLoading={isLoading} />
      <ClickableLinkChild isFocused={isFocused}>{children}</ClickableLinkChild>
    </>
  );
};
