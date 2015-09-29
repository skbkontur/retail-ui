var React = require('react');
var Router = require('react-router');

import styles from './ShowcaseApp.less';

var ShowcaseApp = React.createClass({
  render() {
    return (
      <div>
        <div className={styles.head}>
          <div className={styles.headIn}>
            <div className={styles.title}>UI LIB</div>
            <div className={styles.links}>
              <Router.Link to="gettingStarted" className={styles.link}>
                Getting Started
              </Router.Link>
              <Router.Link to="components" className={styles.link}>
                Components
              </Router.Link>
              <Router.Link to="demo" className={styles.link}>Demo</Router.Link>
            </div>
            <div style={{clear: 'both'}} />
          </div>
        </div>
        <div className={styles.content}>
          <Router.RouteHandler />
        </div>
      </div>
    );
  },
});

module.exports = ShowcaseApp;
