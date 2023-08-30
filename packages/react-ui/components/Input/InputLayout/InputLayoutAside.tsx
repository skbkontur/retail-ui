import React from 'react';

import { InputProps } from '../Input';
import { ZERO_WIDTH_SPACE } from '../../../lib/chars';

import { stylesLayout } from './InputLayout.styles';
import { InputLayoutAsideIcon } from './InputLayoutAsideIcon';
import { InputLayoutAsideText } from './InputLayoutAsideText';

export interface InputLayoutAsideProps {
  icon: InputProps['leftIcon'] | InputProps['rightIcon'];
  text: InputProps['prefix'] | InputProps['suffix'];
  side: 'left' | 'right';
}

export const InputLayoutAside: React.FunctionComponent<InputLayoutAsideProps> = ({ icon, text, side }) => {
  const asideClassName = stylesLayout.aside();

  const _icon = <InputLayoutAsideIcon key="icon" icon={icon} side={side} />;
  const _text = <InputLayoutAsideText key="text" text={text} />;

  const child = side === 'left' ? [_icon, _text] : [_text, _icon];

  return (
    <span className={asideClassName}>
      {ZERO_WIDTH_SPACE}
      {child}
    </span>
  );
};
