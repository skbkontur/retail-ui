import React, { useContext } from 'react';

import { cx } from '../../../lib/theming/Emotion';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

import { InputViewType } from '../Input';
import { styles } from '../Input.styles';
import { InputContext } from '../InputContext';

export const SuffixView: InputViewType = () => {
  const { suffix, disabled } = useContext(InputContext);

  if (!suffix) {
    return null;
  }

  const theme = useContext(ThemeContext);

  const className = cx({
    [styles.suffix(theme)]: true,
    [styles.prefixDisabled(theme)]: disabled,
  });

  return React.createElement('span', { className, children: suffix });
};
