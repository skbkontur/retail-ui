import * as React from 'react';
import styles from './TopBar.module.less';

const Start: React.SFC = ({ children }) => <div className={styles.startItems}>{children}</div>;

(Start as any).__KONTUR_REACT_UI__ = 'TopBarStart';

export default Start;
