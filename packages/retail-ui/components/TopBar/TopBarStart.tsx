import * as React from 'react';
import styles from './TopBar.less';

class Start extends React.Component<{}> {
  public render(): JSX.Element {
    return <div className={styles.startItems}>{this.props.children}</div>;
  }
}

export default Start;
