import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';

import { jsStyles } from './TopBar.styles';

/**
 * Разделитель в топбаре
 *
 * @visibleName TopBar.Divider
 */
function TopBarDivider() {
  const theme = useContext(ThemeContext);

  return <span className={jsStyles.divider(theme)} />;
}
TopBarDivider.__KONTUR_REACT_UI__ = 'TopBarDivider';

export { TopBarDivider };
