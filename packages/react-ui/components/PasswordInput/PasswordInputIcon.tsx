import React from 'react';

import { ClosedIcon } from './ClosedIcon.js';
import { OpenedIcon } from './OpenedIcon.js';
import type { PasswordInputProps, PasswordInputState } from './PasswordInput.js';

export type PasswordInputIconProps = Pick<PasswordInputState, 'visible'> & Pick<PasswordInputProps, 'size'>;

export const PasswordInputIcon = ({ visible, size }: PasswordInputIconProps): React.JSX.Element => {
  if (visible) {
    return <ClosedIcon size={size} />;
  }

  return <OpenedIcon size={size} />;
};
