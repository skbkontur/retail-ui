import React from 'react';

import { useEmotion, useStyles } from '../../../lib/renderEnvironment';
import type { InputProps } from '../Input';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { InputLayoutContext } from './InputLayoutContext';
import { getStylesLayout } from './InputLayout.styles';

export interface InputLayoutAsideTextProps {
  text: InputProps['prefix'] | InputProps['suffix'];
}

export const InputLayoutAsideText: React.FunctionComponent<InputLayoutAsideTextProps> = ({ text = null }) => {
  const theme = React.useContext(ThemeContext);
  const { cx } = useEmotion();
  const stylesLayout = useStyles(getStylesLayout);
  const { disabled } = React.useContext(InputLayoutContext);

  const asideClassName = stylesLayout.aside();

  return text ? (
    <span className={cx(asideClassName, stylesLayout.text(theme), disabled && stylesLayout.textDisabled(theme))}>
      {text}
    </span>
  ) : null;
};
