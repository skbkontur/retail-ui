import * as React from 'react';
import styles from './TopBar.module.less';

export const TopBarEnd: React.SFC = ({ children }) => <div className={styles.endItems}>{children}</div>;
