import React from 'react';

import { EyeClosedIcon, EyeOpenedIcon } from '../../internal/icons/16px';

import { PasswordInputState } from './PasswordInput';

export type PasswordInputIconProps = Pick<PasswordInputState, 'visible'>;

export const PasswordInputIcon = ({ visible }: PasswordInputIconProps) => {
  if (visible) {
    return <EyeClosedIcon size={14} />;
  }

  return <EyeOpenedIcon size={14} />;
};
