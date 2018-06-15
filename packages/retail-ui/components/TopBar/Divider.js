
import * as React from 'react';

import styles from './TopBar.less';

class Divider extends React.Component<{}> {
  render() {
    return <span className={styles.divider} />;
  }
}

export default Divider;
