import React, { useContext } from 'react';
import cn from 'classnames';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps } from '../../typings/common';

import { jsStyles } from './TopBar.styles';

export type TopBarDividerProps = CommonProps;

/**
 * Разделитель в топбаре
 *
 * @visibleName TopBar.Divider
 */
export function TopBarDivider({ className, ...rest }: TopBarDividerProps) {
  const theme = useContext(ThemeContext);
  return <span className={cn(className, jsStyles.divider(theme))} {...rest} />;
}
TopBarDivider.__KONTUR_REACT_UI__ = 'TopBarDivider';
