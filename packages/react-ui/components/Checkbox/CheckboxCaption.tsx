import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isEdge, isIE11 } from '../../lib/client';
import { cx } from '../../lib/theming/Emotion';

import { CheckboxProps } from './Checkbox';
import { styles } from './Checkbox.styles';

export type CheckboxCaptionProps = Pick<CheckboxProps, 'disabled' | 'children'>;

export const CheckboxCaption = ({ disabled, children }: CheckboxCaptionProps) => {
  const theme = useContext(ThemeContext);

  return (
    <span
      className={cx({
        [styles.caption(theme)]: true,
        [styles.captionIE11()]: isIE11 || isEdge,
        [styles.disabled(theme)]: disabled,
      })}
    >
      {children}
    </span>
  );
};
