import React from 'react';
import { isElement } from 'react-is';

import { InputProps, InputSize } from '../Input';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { InputLayoutContext } from './InputLayoutContext';
import { stylesLayout } from './InputLayout.styles';

export interface InputLayoutAsideIconProps {
  icon: InputProps['leftIcon'] | InputProps['rightIcon'];
}

export const InputLayoutAsideIcon: React.FunctionComponent<InputLayoutAsideIconProps> = ({ icon = null }) => {
  const theme = React.useContext(ThemeContext);
  const { focused, disabled, size } = React.useContext(InputLayoutContext);

  const sizes: Record<InputSize, number> = {
    small: parseInt(theme.inputIconSizeSmall),
    medium: parseInt(theme.inputIconSizeMedium),
    large: parseInt(theme.inputIconSizeLarge),
  };
  const asideClassName = stylesLayout.aside();

  let _icon = null;
  if (size && icon && isElement(icon)) {
    // We expect icon to have a `size` prop
    _icon = React.cloneElement(icon, { size: sizes[size] });
  }

  return (
    _icon && (
      <span
        key="icon"
        className={cx(
          asideClassName,
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
