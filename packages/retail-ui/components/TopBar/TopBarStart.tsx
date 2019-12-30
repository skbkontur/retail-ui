import * as React from 'react';
import styles from './TopBar.module.less';

export const TopBarStart: React.SFC = ({ children }) => <div className={styles.startItems}>{children}</div>;
