import React from 'react';

import { EyeClosedIcon, EyeOpenedIcon } from '../../internal/icons/16px';
import { cx } from '../../lib/theming/Emotion';

import { PasswordInputState } from './PasswordInput';
import { styles } from './PasswordInput.styles';

export type PasswordInputIconProps = Pick<PasswordInputState, 'visible'>;

export const PasswordInputIcon = ({ visible }: PasswordInputIconProps) => {
  return visible ? (
    <EyeClosedIcon className={cx(styles.repeatIconClickFix())} size={14} />
  ) : (
    <EyeOpenedIcon className={cx(styles.repeatIconClickFix())} size={14} />
  );
};
