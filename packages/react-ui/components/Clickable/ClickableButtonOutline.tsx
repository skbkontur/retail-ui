import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { ClickableButtonProps } from './ClickableButton';
import { buttonOutlineStyles } from './ClickableButtonOutline.styles';

type ClickableButtonOutlineProps = Pick<
  ClickableButtonProps,
  'isWarning' | 'isError' | 'isDisabled' | 'isLoading' | 'isFocused'
>;

export const ClickableButtonOutline = ({
  isWarning,
  isError,
  isDisabled,
  isLoading,
  isFocused,
}: ClickableButtonOutlineProps) => {
  const theme = useContext(ThemeContext);

  if (isFocused || isDisabled || isLoading) {
    return null;
  }

  return (
    <div
      className={cx({
        [buttonOutlineStyles.buttonOutline()]: true,
        [buttonOutlineStyles.buttonOutlineWarning(theme)]: isWarning,
        [buttonOutlineStyles.buttonOutlineError(theme)]: isError,
      })}
    />
  );
};
