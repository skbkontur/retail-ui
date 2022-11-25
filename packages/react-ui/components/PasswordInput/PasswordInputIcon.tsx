import React from 'react';

import { EyeClosedIcon, EyeOpenedIcon } from '../../internal/icons/16px';
import { EyeOpenIcon16Regular } from '../../internal/icons2022/EyeOpenIcon16Regular';
import { EyeClosedIcon16Regular as EyeClosedIcon2022 } from '../../internal/icons2022/EyeClosedIcon16Regular';

import { PasswordInputState } from './PasswordInput';

export type PasswordInputIconProps = Pick<PasswordInputState, 'visible'> & {
  isTheme2022: boolean;
};

export const PasswordInputIcon = ({ visible, isTheme2022 = false }: PasswordInputIconProps) => {
  if (visible) {
    return isTheme2022 ? <EyeClosedIcon2022 disableCompensation={false} /> : <EyeClosedIcon size={14} />;
  }

  return isTheme2022 ? <EyeOpenIcon16Regular disableCompensation={false} /> : <EyeOpenedIcon size={14} />;
};
