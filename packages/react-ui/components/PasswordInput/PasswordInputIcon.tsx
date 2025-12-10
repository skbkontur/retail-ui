import React from 'react';

import type { PasswordInputProps, PasswordInputState } from './PasswordInput.js';
import { ClosedIcon } from './ClosedIcon.js';
import { OpenedIcon } from './OpenedIcon.js';

export type PasswordInputIconProps = Pick<PasswordInputState, 'visible'> & Pick<PasswordInputProps, 'size'>;

export const PasswordInputIcon = ({ visible, size }: PasswordInputIconProps) => {
  if (visible) {
    return <ClosedIcon size={size} />;
  }

  return <OpenedIcon size={size} />;
};
