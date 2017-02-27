import React from 'react';

import GitHubHeaderLink from './GitHubHeaderLink';

import styles from './DocsApp.less';

var DocsApp = React.createClass({
  render() {
    return (
      <div>
        <div className={styles.head}>
          <div className={styles.headIn}>
            <div className={styles.title}>ReactUI</div>
            <div className={styles.links}>
              <GitHubHeaderLink href="https://github.com/skbkontur/retail-ui" />
            </div>
            <div style={{ clear: 'both' }} />
          </div>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default DocsApp;
