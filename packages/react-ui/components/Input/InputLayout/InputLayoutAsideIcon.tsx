import React, { ReactElement, useContext } from 'react';
import { isElement } from 'react-is';

import { isKonturIcon } from '../../../lib/utils';
import { InputProps } from '../Input';
import { EmotionContext } from '../../../lib/theming/Emotion';
import { SizeProp } from '../../../lib/types/props';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { InputLayoutContext } from './InputLayoutContext';
import { getStylesLayout } from './InputLayout.styles';

export interface InputLayoutAsideIconProps {
  icon: InputProps['leftIcon'] | InputProps['rightIcon'];
  side: 'left' | 'right';
}

export const InputLayoutAsideIcon: React.FunctionComponent<InputLayoutAsideIconProps> = ({ icon = null, side }) => {
  const emotion = useContext(EmotionContext);
  const theme = useContext(ThemeContext);
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
  if (isElement(icon) && isKonturIcon(icon as ReactElement)) {
    _icon = React.cloneElement(icon as ReactElement, { size: icon.props.size ?? sizes[size] });
  }

  const style: React.CSSProperties = {};
  if (side) {
    if (side === 'right') {
      style.marginLeft = gaps[size];
    } else {
      style.marginRight = gaps[size];
    }
  }

  const stylesLayout = getStylesLayout(emotion);
  return _icon ? (
    <span
      style={style}
      className={emotion.cx(
        stylesLayout.aside(),
        stylesLayout.icon(theme),
        focused && stylesLayout.iconFocus(theme),
        disabled && stylesLayout.iconDisabled(theme),
      )}
    >
      {_icon}
    </span>
  ) : null;
};
