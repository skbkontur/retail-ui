import React from 'react';

import styles from './DocText.less';

export default class DocText extends React.Component {
  render() {
    var html = this.props.content;
    return (
      <div className={styles.root} dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
}
