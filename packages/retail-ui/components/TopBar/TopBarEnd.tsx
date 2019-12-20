import * as React from 'react';
import styles from './TopBar.module.less';

/**
 * контейнер для смещения к концу
 * @visibleName TopBar.End
 */

export const End: React.SFC = ({ children }) => <div className={styles.endItems}>{children}</div>;
