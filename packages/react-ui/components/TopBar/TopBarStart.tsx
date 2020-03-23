import React from 'react';

import { getJsStyles } from '../../lib/theming/ThemeCache';

import { TopBar } from './TopBar';
import { Styles } from './TopBar.styles';

/**
 * Контейнер для сдвига к началу
 *
 * @visibleName TopBar.Start
 */

export const TopBarStart: React.SFC = ({ children }) => {
  const jsStyles = getJsStyles(TopBar, Styles);
  return <div className={jsStyles.startItems()}>{children}</div>;
};
(TopBarStart as any).__KONTUR_REACT_UI__ = 'TopBarStart';
