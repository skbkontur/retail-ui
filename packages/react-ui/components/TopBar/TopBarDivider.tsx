import React, { useContext } from 'react';

import { getJsStyles } from '../../lib/theming/ThemeCache';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { TopBar } from './TopBar';
import { Styles } from './TopBar.styles';

/**
 * Разделитель в топбаре
 *
 * @visibleName TopBar.Divider
 */
function TopBarDivider() {
  const theme = useContext(ThemeContext);
  const jsStyles = getJsStyles(TopBar, Styles, theme);

  return <span className={jsStyles.divider(theme)} />;
}
TopBarDivider.__KONTUR_REACT_UI__ = 'TopBarDivider';

export { TopBarDivider };
