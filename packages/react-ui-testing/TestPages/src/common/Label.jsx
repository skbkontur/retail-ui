import React from 'react';

import styles from './Label.less';

export default class Label extends React.Component {
  render() {
    return <span className={styles.root}>{this.props.children}</span>;
  }
}
