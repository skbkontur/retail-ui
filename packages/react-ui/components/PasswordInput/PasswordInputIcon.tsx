import React from 'react';

import { EyeClosedIcon, EyeOpenedIcon } from '../../internal/icons/16px';

import { PasswordInputState } from './PasswordInput';

export type PasswordInputIconProps = Pick<PasswordInputState, 'visible'>;

export const PasswordInputIcon = ({ visible }: PasswordInputIconProps) => {
  return visible ? <EyeClosedIcon size={14} /> : <EyeOpenedIcon size={14} />;
};
