import React from 'react';

import { InputProps } from '../Input';
import { useEmotion } from '../../../lib/theming/Emotion';
import { useTheme } from '../../../lib/theming/useTheme';

import { InputLayoutContext } from './InputLayoutContext';
import { getStylesLayout } from './InputLayout.styles';

export interface InputLayoutAsideTextProps {
  text: InputProps['prefix'] | InputProps['suffix'];
}

export const InputLayoutAsideText: React.FunctionComponent<InputLayoutAsideTextProps> = ({ text = null }) => {
  const emotion = useEmotion();
  const theme = useTheme();
  const { disabled } = React.useContext(InputLayoutContext);

  const stylesLayout = getStylesLayout(emotion);
  const asideClassName = stylesLayout.aside();

  return (
    text && (
      <span
        className={emotion.cx(asideClassName, stylesLayout.text(theme), disabled && stylesLayout.textDisabled(theme))}
      >
        {text}
      </span>
    )
  );
};
