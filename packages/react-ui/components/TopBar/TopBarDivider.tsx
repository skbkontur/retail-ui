import React, { useContext } from 'react';

import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import styles from './TopBar.module.less';
import { jsStyles } from './TopBar.styles';

/**
 * Разделитель в топбаре
 *
 * @visibleName TopBar.Divider
 */
function TopBarDivider() {
  const theme = useContext(ThemeContext);
  return <span className={cx(styles.divider, jsStyles.divider(theme))} />;
}
TopBarDivider.__KONTUR_REACT_UI__ = 'TopBarDivider';

export { TopBarDivider };
