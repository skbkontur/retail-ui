import * as React from 'react';

import styles from './MenuSeparator.less';

/**
 * Разделитель в меню.
 */
export default class MenuSeparator extends React.Component<{}> {
  public render() {
    return <div className={styles.root} />;
  }
}
