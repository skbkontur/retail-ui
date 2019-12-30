import * as React from 'react';
import styles from './TopBar.module.less';

/**
 * Контейнер для сдвига к началу
 *
 * @visibleName TopBar.Start
 */

export const TopBarStart: React.SFC = ({ children }) => <div className={styles.startItems}>{children}</div>;
