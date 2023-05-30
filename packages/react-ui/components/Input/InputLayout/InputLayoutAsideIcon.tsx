import React from 'react';
import { isElement } from 'react-is';

import { InputProps, InputSize } from '../Input';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { InputLayoutContext } from './InputLayoutContext';
import { stylesLayout } from './InputLayout.styles';

export interface InputLayoutAsideIconProps {
  icon: InputProps['leftIcon'] | InputProps['rightIcon'];
  side: 'left' | 'right';
}

export const InputLayoutAsideIcon: React.FunctionComponent<InputLayoutAsideIconProps> = ({ icon, side }) => {
  const theme = React.useContext(ThemeContext);
  const { focused, disabled, size } = React.useContext(InputLayoutContext);

  const sizes: Record<InputSize, number> = {
    small: parseInt(theme.inputIconSizeSmall),
    medium: parseInt(theme.inputIconSizeMedium),
    large: parseInt(theme.inputIconSizeLarge),
  };
  const gaps: Record<InputSize, number> = {
    small: parseInt(theme.inputIconGapSmall),
    medium: parseInt(theme.inputIconGapMedium),
    large: parseInt(theme.inputIconGapLarge),
  };

  let _icon = null;
  if (icon && isElement(icon)) {
    // Expect icon to have a `size` and `disableCompensation` props
    _icon = React.cloneElement(icon, { size: sizes[size], disableCompensation: true });
  }

  const style: React.CSSProperties = {};
  if (side) {
    if (side === 'right') {
      style.marginLeft = gaps[size];
    } else {
      style.marginRight = gaps[size];
    }
  }

  return (
    _icon && (
      <span
        style={style}
        className={cx(
          stylesLayout.aside(),
          stylesLayout.icon(theme),
          focused && stylesLayout.iconFocus(theme),
          disabled && stylesLayout.iconDisabled(),
        )}
      >
        {_icon}
      </span>
    )
  );
};
