import * as React from 'react';
import styles from './TopBar.less';

const End: React.SFC = ({ children }) => (
  <div className={styles.endItems}>{children}</div>
);

export default End;
