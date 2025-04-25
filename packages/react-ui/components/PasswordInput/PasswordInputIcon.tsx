import React from 'react';

import type { PasswordInputProps, PasswordInputState } from './PasswordInput';
import { ClosedIcon } from './ClosedIcon';
import { OpenedIcon } from './OpenedIcon';

export type PasswordInputIconProps = Pick<PasswordInputState, 'visible'> & Pick<PasswordInputProps, 'size'>;

export const PasswordInputIcon = ({ visible, size }: PasswordInputIconProps) => {
  if (visible) {
    return <ClosedIcon size={size} />;
  }

  return <OpenedIcon size={size} />;
};
