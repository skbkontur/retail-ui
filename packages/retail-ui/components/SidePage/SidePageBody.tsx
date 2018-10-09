import * as React from 'react';

import styles = require('./SidePage.less');

export default class SidePageBody extends React.Component {
  public render(): JSX.Element {
    return <div className={styles.body}>{this.props.children}</div>;
  }
}
