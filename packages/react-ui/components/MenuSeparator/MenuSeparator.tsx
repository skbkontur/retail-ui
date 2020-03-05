import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { jsStyles } from './MenuSeparator.styles';
import styles from './MenuSeparator.module.less';

/**
 * Разделитель в меню.
 */
function MenuSeparator() {
  const theme = useContext(ThemeContext);

  return <div className={cx(styles.root, jsStyles.root(theme))} />;
}

MenuSeparator.__KONTUR_REACT_UI__ = 'MenuSeparator';

export { MenuSeparator };
