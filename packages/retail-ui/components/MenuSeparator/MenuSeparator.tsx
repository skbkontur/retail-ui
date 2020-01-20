import * as React from 'react';
import styles from './MenuSeparator.module.less';

/**
 * Разделитель в меню.
 */
export default class MenuSeparator extends React.Component<{}> {
  public static __KONTUR_REACT_UI__ = 'MenuSeparator';

  public render() {
    return <div className={styles.root} />;
  }
}
