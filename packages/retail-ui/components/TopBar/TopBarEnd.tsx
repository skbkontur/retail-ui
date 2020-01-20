import * as React from 'react';
import styles from './TopBar.module.less';

const End: React.SFC = ({ children }) => <div className={styles.endItems}>{children}</div>;

(End as any).__KONTUR_REACT_UI__ = 'TopBarEnd';

export default End;
