import React from 'react';
import {Link, Router} from 'react-router';

import styles from './ShowcaseApp.less';

var ShowcaseApp = React.createClass({
  render() {
    return (
      <div>
        <div className={styles.head}>
          <div className={styles.headIn}>
            <div className={styles.title}>ReactUI</div>
            <div className={styles.links}>
              <Link to="/gettingStarted" className={styles.link}
                  activeClassName={styles.linkActive}>
                Getting Started
              </Link>
              <Link to="/components" className={styles.link}
                  activeClassName={styles.linkActive}>
                Components
              </Link>
              <Link to="/demo" className={styles.link}
                  activeClassName={styles.linkActive}>
                Demo
              </Link>
            </div>
            <div style={{clear: 'both'}} />
          </div>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = ShowcaseApp;
