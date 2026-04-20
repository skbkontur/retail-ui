import React from 'react';

import { useStyles } from '../../../lib/renderEnvironment/index.js';
import type { InputProps } from '../Input.js';
import { getStylesLayout } from './InputLayout.styles.js';
import { InputLayoutAsideIcon } from './InputLayoutAsideIcon.js';
import { InputLayoutAsideText } from './InputLayoutAsideText.js';

export interface InputLayoutAsideProps {
  icon: InputProps['leftIcon'] | InputProps['rightIcon'];
  text: InputProps['prefix'] | InputProps['suffix'];
  side: 'left' | 'right';
}

export const InputLayoutAside: React.FunctionComponent<InputLayoutAsideProps> = ({ icon, text, side }) => {
  const stylesLayout = useStyles(getStylesLayout);
  const asideClassName = stylesLayout.aside();

  const _icon = <InputLayoutAsideIcon key="icon" icon={icon} side={side} />;
  const _text = <InputLayoutAsideText key="text" text={text} />;

  const child = side === 'left' ? [_icon, _text] : [_text, _icon];

  return <span className={asideClassName}>{child}</span>;
};
