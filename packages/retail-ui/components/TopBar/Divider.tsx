import * as React from 'react';

import styles from './TopBar.module.less';

class Divider extends React.Component<{}> {
  public static __KONTUR_REACT_UI__ = 'TopBarDivider';

  public render() {
    return <span className={styles.divider} />;
  }
}

export default Divider;
