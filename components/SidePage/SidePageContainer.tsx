import * as React from 'react';

import styles = require('./SidePage.less');

export default class SidePageContainer extends React.Component {
  render() {
    return <div className={styles.bodyContainer}>{this.props.children}</div>;
  }
}
