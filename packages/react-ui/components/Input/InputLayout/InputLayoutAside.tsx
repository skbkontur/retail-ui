import React, { useContext } from 'react';

import { InputProps } from '../Input';
import { EmotionContext } from '../../../lib/theming/Emotion';

import { getStylesLayout } from './InputLayout.styles';
import { InputLayoutAsideIcon } from './InputLayoutAsideIcon';
import { InputLayoutAsideText } from './InputLayoutAsideText';

export interface InputLayoutAsideProps {
  icon: InputProps['leftIcon'] | InputProps['rightIcon'];
  text: InputProps['prefix'] | InputProps['suffix'];
  side: 'left' | 'right';
}

export const InputLayoutAside: React.FunctionComponent<InputLayoutAsideProps> = ({ icon, text, side }) => {
  const emotion = useContext(EmotionContext);
  const asideClassName = getStylesLayout(emotion).aside();

  const _icon = <InputLayoutAsideIcon key="icon" icon={icon} side={side} />;
  const _text = <InputLayoutAsideText key="text" text={text} />;

  const child = side === 'left' ? [_icon, _text] : [_text, _icon];

  return <span className={asideClassName}>{child}</span>;
};
