import React from 'react';

import { EyeClosedIcon, EyeOpenedIcon } from '../../internal/icons/16px';
import { EyeClosedIcon as EyeClosedIcon2022, EyeOpenIcon } from '../../internal/icons/16px/Icons2022';

import { PasswordInputState } from './PasswordInput';

export type PasswordInputIconProps = Pick<PasswordInputState, 'visible'> & {
  isTheme2022: boolean;
};

export const PasswordInputIcon = ({ visible, isTheme2022 = false }: PasswordInputIconProps) => {
  if (visible) {
    return isTheme2022 ? <EyeClosedIcon2022 disableCompensation={false} /> : <EyeClosedIcon size={14} />;
  }

  return isTheme2022 ? <EyeOpenIcon disableCompensation={false} /> : <EyeOpenedIcon size={14} />;
};
