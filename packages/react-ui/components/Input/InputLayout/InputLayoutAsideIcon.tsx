import React from 'react';

import { InputProps, InputSize } from '../Input';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { InputLayoutContext } from './InputLayoutContext';
import { stylesLayout } from './InputLayout.styles';

export interface InputLayoutAsideIconProps {
  icon: InputProps['leftIcon'] | InputProps['rightIcon'];
  side: 'left' | 'right';
}

export const InputLayoutAsideIcon: React.FunctionComponent<InputLayoutAsideIconProps> = ({ icon = null, side }) => {
  const theme = React.useContext(ThemeContext);
  const { focused, disabled, size } = React.useContext(InputLayoutContext);

  const gaps: Record<InputSize, number> = {
    small: parseInt(theme.inputIconGapSmall),
    medium: parseInt(theme.inputIconGapMedium),
    large: parseInt(theme.inputIconGapLarge),
  };

  const style: React.CSSProperties = {};
  if (side) {
    if (side === 'right') {
      style.marginLeft = gaps[size];
    } else {
      style.marginRight = gaps[size];
    }
  }

  return (
    icon && (
      <span
        style={style}
        className={cx(
          stylesLayout.aside(),
          stylesLayout.icon(theme),
          focused && stylesLayout.iconFocus(theme),
          disabled && stylesLayout.iconDisabled(),
        )}
      >
        {icon}
      </span>
    )
  );
};
