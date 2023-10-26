import React from 'react';
import { isElement } from 'react-is';

import { isKonturIcon } from '../../../lib/utils';
import { InputProps } from '../Input';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { SizeProp } from '../../../lib/types/props';

import { InputLayoutContext } from './InputLayoutContext';
import { stylesLayout } from './InputLayout.styles';
export interface InputLayoutAsideIconProps {
  icon: InputProps['leftIcon'] | InputProps['rightIcon'];
  side: 'left' | 'right';
}

export const InputLayoutAsideIcon: React.FunctionComponent<InputLayoutAsideIconProps> = ({ icon = null, side }) => {
  const theme = React.useContext(ThemeContext);
  const { focused, disabled, size } = React.useContext(InputLayoutContext);

  const sizes: Record<SizeProp, number> = {
    small: parseInt(theme.inputIconSizeSmall),
    medium: parseInt(theme.inputIconSizeMedium),
    large: parseInt(theme.inputIconSizeLarge),
  };
  const gaps: Record<SizeProp, number> = {
    small: parseInt(theme.inputIconGapSmall),
    medium: parseInt(theme.inputIconGapMedium),
    large: parseInt(theme.inputIconGapLarge),
  };

  let _icon = icon instanceof Function ? icon() : icon;
  if (isElement(icon) && isKonturIcon(icon)) {
    _icon = React.cloneElement(icon, { size: icon.props.size ?? sizes[size] });
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
