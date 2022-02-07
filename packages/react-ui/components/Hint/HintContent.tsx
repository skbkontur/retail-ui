import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { HintProps } from './Hint';
import { styles } from './Hint.styles';

export type HintContentProps = Pick<HintProps, 'text' | 'pos' | 'maxWidth'>;

export const HintContent = ({ text, pos, maxWidth }: HintContentProps) => {
  const theme = useContext(ThemeContext);

  if (!text) {
    return null;
  }

  return (
    <div
      className={cx({
        [styles.content(theme)]: true,
        [styles.contentCenter(theme)]: pos === 'top' || pos === 'bottom',
      })}
      style={{ maxWidth }}
    >
      {text}
    </div>
  );
};
