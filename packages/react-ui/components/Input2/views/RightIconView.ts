import React, { useContext } from 'react';

import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { InputViewType } from '../Input';
import { InputContext } from '../InputContext';
import { getIconClassnames, renderIcon } from '../utils';

export const RightIconView: InputViewType = () => {
  const theme = useContext(ThemeContext);
  const { size, disabled, rightIcon, focused } = useContext(InputContext);

  return React.createElement('span', {
    className: cx(getIconClassnames({ size, disabled, focused, theme, side: 'right' })),
    children: renderIcon(rightIcon),
  });
};
