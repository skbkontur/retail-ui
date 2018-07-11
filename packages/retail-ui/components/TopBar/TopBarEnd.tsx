import * as React from 'react';
import styles from './TopBar.less';

class End extends React.Component<{}> {
  public render(): JSX.Element {
    return <div className={styles.endItems}>{this.props.children}</div>;
  }
}

export default End;
