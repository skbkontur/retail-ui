import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';
import { RadioGroupContext } from '../RadioGroup/RadioGroupContext';

import { RadioProps } from './Radio';
import { styles } from './Radio.styles';

type RadioTextInterface = {
  children: React.ReactNode;
};

export type RadioTextProps = RadioTextInterface & Pick<RadioProps, 'disabled'>;

export const RadioText = ({ disabled, children }: RadioTextProps) => {
  const radioGroupContext = useContext(RadioGroupContext);
  const theme = useContext(ThemeContext);

  return (
    <div
      className={cx({
        [styles.label(theme)]: true,
        [styles.labelDisabled()]: !!(disabled || radioGroupContext.disabled),
      })}
    >
      {children}
    </div>
  );
};
