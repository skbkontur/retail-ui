import React, { useContext } from 'react';
import cn from 'classnames';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps } from '../../typings/common';

import { jsStyles } from './MenuSeparator.styles';

export type MenuSeparatorProps = CommonProps;
/**
 * Разделитель в меню.
 */
function MenuSeparator({ className, ...rest }: MenuSeparatorProps) {
  const theme = useContext(ThemeContext);

  return <div {...rest} className={cn(className, jsStyles.root(theme))} />;
}

MenuSeparator.__KONTUR_REACT_UI__ = 'MenuSeparator';

export { MenuSeparator };
