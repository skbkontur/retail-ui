import React from 'react';

import { getJsStyles } from '../../lib/theming/ThemeCache';

import { TopBar } from './TopBar';
import { Styles } from './TopBar.styles';

/**
 * Контейнер для смещения к концу
 *
 * @visibleName TopBar.End
 */

export const TopBarEnd: React.SFC = ({ children }) => {
  const jsStyles = getJsStyles(TopBar, Styles);

  return <div className={jsStyles.endItems()}>{children}</div>;
};
(TopBarEnd as any).__KONTUR_REACT_UI__ = 'TopBarEnd';
