import React, { useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';

import { jsStyles } from './MenuSeparator.styles';

/**
 * Разделитель в меню.
 */
function MenuSeparator() {
  const theme = useContext(ThemeContext);

  return <div className={jsStyles.root(theme)} />;
}

MenuSeparator.__KONTUR_REACT_UI__ = 'MenuSeparator';

export { MenuSeparator };
