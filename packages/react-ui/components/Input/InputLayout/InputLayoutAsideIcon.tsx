import React from 'react';

import { isElement } from '../../../lib/react-is.js';
import { useEmotion, useStyles } from '../../../lib/renderEnvironment/index.js';
import { isKonturIcon } from '../../../lib/utils.js';
import type { InputProps } from '../Input.js';
import { ThemeContext } from '../../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../../lib/types/props.js';
import type { IconProps } from '../../../internal/icons2022/BaseIcon.js';

import { InputLayoutContext } from './InputLayoutContext.js';
import { getStylesLayout } from './InputLayout.styles.js';

export interface InputLayoutAsideIconProps {
  icon: InputProps['leftIcon'] | InputProps['rightIcon'];
  side: 'left' | 'right';
}

export const InputLayoutAsideIcon: React.FunctionComponent<InputLayoutAsideIconProps> = ({ icon = null, side }) => {
  const theme = React.useContext(ThemeContext);
  const { cx } = useEmotion();
  const stylesLayout = useStyles(getStylesLayout);
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
    const iconProps = icon.props as IconProps;
    _icon = React.cloneElement(icon, {
      size: iconProps.size ?? sizes[size],
    } as IconProps);
  }

  const style: React.CSSProperties = {};
  if (side) {
    if (side === 'right') {
      style.marginLeft = gaps[size];
    } else {
      style.marginRight = gaps[size];
    }
  }

  return _icon ? (
    <span
      style={style}
      className={cx(
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
