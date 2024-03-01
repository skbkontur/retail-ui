import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { buttonStyles } from './ClickableButton.styles';
import { ClickableButtonProps } from './ClickableButton';

export const ClickableButtonOutline = ({ warning, error, isDisabled, isLoading, isFocused }: ClickableButtonProps) => {
  const theme = useContext(ThemeContext);

  if (!isFocused && (isDisabled || isLoading)) {
    return null;
  }

  return (
    <div
      className={cx({
        [buttonStyles.buttonOutline()]: true,
        [buttonStyles.buttonOutlineWarning(theme)]: warning,
        [buttonStyles.buttonOutlineError(theme)]: error,
      })}
    />
  );
};
