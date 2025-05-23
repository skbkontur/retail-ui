import React from 'react';

import { InputProps } from '../Input';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { InputLayoutContext } from './InputLayoutContext';
import { stylesLayout } from './InputLayout.styles';

export interface InputLayoutAsideTextProps {
  text: InputProps['prefix'] | InputProps['suffix'];
}

export const InputLayoutAsideText: React.FunctionComponent<InputLayoutAsideTextProps> = ({ text = null }) => {
  const theme = React.useContext(ThemeContext);
  const { disabled } = React.useContext(InputLayoutContext);

  const asideClassName = stylesLayout.aside();

  return text ? (
    <span className={cx(asideClassName, stylesLayout.text(theme), disabled && stylesLayout.textDisabled(theme))}>
      {text}
    </span>
  ) : null;
};
