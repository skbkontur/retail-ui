import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { jsStyles } from './TopBar.styles';

export type TopBarDividerProps = CommonProps;

/**
 * Разделитель в топбаре
 *
 * @visibleName TopBar.Divider
 */
export function TopBarDivider(props: TopBarDividerProps) {
  const theme = useContext(ThemeContext);
  return (
    <CommonWrapper {...props}>
      <span className={jsStyles.divider(theme)} />
    </CommonWrapper>
  );
}
TopBarDivider.__KONTUR_REACT_UI__ = 'TopBarDivider';
