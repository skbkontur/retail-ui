import * as React from 'react';
import styles from './TopBar.module.less';

/**
 * Контейнер для смещения к концу
 *
 * @visibleName TopBar.End
 */
export const TopBarEnd: React.SFC = ({ children }) => <div className={styles.endItems}>{children}</div>;
