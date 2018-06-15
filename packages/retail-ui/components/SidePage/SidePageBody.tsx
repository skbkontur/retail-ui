import * as React from 'react';

import styles = require('./SidePage.less');

export default class SidePageBody extends React.Component {
  public render() {
    return (
      <tr className={styles.body}>
        <td className={styles.layoutItem}>{this.props.children}</td>
      </tr>
    );
  }
}
