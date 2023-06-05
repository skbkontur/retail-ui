import React from 'react';

import { EyeClosedIcon, EyeOpenedIcon } from '../../internal/icons/16px';

import { PasswordInputProps, PasswordInputState } from './PasswordInput';
import { ClosedIcon } from './ClosedIcon';
import { OpenedIcon } from './OpenedIcon';

export type PasswordInputIconProps = Pick<PasswordInputState, 'visible'> &
  Pick<PasswordInputProps, 'size'> & {
    isTheme2022: boolean;
  };

export const PasswordInputIcon = ({ visible, size, isTheme2022 = false }: PasswordInputIconProps) => {
  if (visible) {
    return isTheme2022 ? <ClosedIcon size={size} /> : <EyeClosedIcon size={14} />;
  }

  return isTheme2022 ? <OpenedIcon size={size} /> : <EyeOpenedIcon size={14} />;
};
