import React, { useContext } from 'react';

import { InputProps } from '../Input';
import { EmotionContext } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { InputLayoutContext } from './InputLayoutContext';
import { getStylesLayout } from './InputLayout.styles';

export interface InputLayoutAsideTextProps {
  text: InputProps['prefix'] | InputProps['suffix'];
}

export const InputLayoutAsideText: React.FunctionComponent<InputLayoutAsideTextProps> = ({ text = null }) => {
  const emotion = useContext(EmotionContext);
  const theme = useContext(ThemeContext);
  const { disabled } = React.useContext(InputLayoutContext);

  const stylesLayout = getStylesLayout(emotion);
  const asideClassName = stylesLayout.aside();

  return text ? (
    <span
      className={emotion.cx(asideClassName, stylesLayout.text(theme), disabled && stylesLayout.textDisabled(theme))}
    >
      {text}
    </span>
  ) : null;
};
