var React = require('react/addons');

var components = require('../components');

var ComponentList = require('./ComponentList');

import styles from './Components.less';

var Components = React.createClass({
  render() {
    const componentName = this.props.params.component;
    const component = components.find((c) => c.name === componentName) || null;

    return (
      <div className={styles.root}>
        <div className={styles.menu}>
          <ComponentList components={components} current={componentName} />
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = Components;
