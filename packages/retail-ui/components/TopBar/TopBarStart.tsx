import * as React from 'react';
import styles from './TopBar.module.less';

/**
 * контейнер для сдвига к началу
 * @visibleName TopBar.Start
 */

export const Start: React.SFC = ({ children }) => <div className={styles.startItems}>{children}</div>;
