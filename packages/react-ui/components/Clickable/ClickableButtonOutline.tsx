import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { ClickableButtonProps } from './ClickableButton';
import { buttonOutlineStyles } from './ClickableButtonOutline.styles';

type ClickableButtonOutlineProps = Pick<ClickableButtonProps, 'warning' | 'error' | 'disabled' | 'loading' | 'focused'>;

export const ClickableButtonOutline = ({ warning, error, disabled, loading, focused }: ClickableButtonOutlineProps) => {
  const theme = useContext(ThemeContext);

  if (focused || disabled || loading) {
    return null;
  }

  return (
    <div
      className={cx({
        [buttonOutlineStyles.buttonOutline()]: true,
        [buttonOutlineStyles.buttonOutlineWarning(theme)]: warning,
        [buttonOutlineStyles.buttonOutlineError(theme)]: error,
      })}
    />
  );
};
