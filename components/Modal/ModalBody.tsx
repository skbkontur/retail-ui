import * as React from 'react';
import styles = require('./Modal.less');

export class Body extends React.Component {
  render() {
    return <div className={styles.body}>{this.props.children}</div>;
  }
}
