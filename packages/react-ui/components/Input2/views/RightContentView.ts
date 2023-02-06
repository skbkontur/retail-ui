import React from 'react';

import { cx } from '../../../lib/theming/Emotion';

import { InputViewType } from '../Input';
import { styles } from '../Input.styles';

export const RightContentView: InputViewType = ({ children }) => {
  const className = cx({
    [styles.sideContainer()]: true,
    [styles.rightContainer()]: true,
  });

  return React.createElement('span', {
    className,
    children,
  });
};
