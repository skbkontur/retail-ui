import React from 'react';

import { InputProps } from '../Input';
import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { InputLayoutContext } from './InputLayoutContext';
import { stylesLayout } from './InputLayout.styles';
import { InputLayoutAsideIcon } from './InputLayoutAsideIcon';
import { InputLayoutAsideText } from './InputLayoutAsideText';

export interface InputLayoutAsideProps {
  icon: InputProps['leftIcon'] | InputProps['rightIcon'];
  text: InputProps['prefix'] | InputProps['suffix'];
  side: 'left' | 'right';
}

export const InputLayoutAside: React.FunctionComponent<InputLayoutAsideProps> = ({ icon, text, side }) => {
  const theme = React.useContext(ThemeContext);
  const { size } = React.useContext(InputLayoutContext);
  const gapClassName = cx(
    size === 'small' && stylesLayout.iconGapSmall(theme),
    size === 'medium' && stylesLayout.iconGapMedium(theme),
    size === 'large' && stylesLayout.iconGapLarge(theme),
  );

  const asideClassName = stylesLayout.aside();

  const gap = icon && <span key="gap" className={gapClassName} />;
  const _icon = <InputLayoutAsideIcon icon={icon} />;
  const _text = <InputLayoutAsideText text={text} />;

  const child = side === 'left' ? [_icon, gap, _text] : [_text, gap, _icon];

  return (
    <span className={asideClassName}>
      &#8203;
      {child}
    </span>
  );
};
