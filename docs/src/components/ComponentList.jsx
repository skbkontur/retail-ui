var React = require('react/addons');

var components = require('../components');

var Component = require('./Component');

import styles from './ComponentList.less';

var ComponentList = React.createClass({
  render() {
    return (
      <div className={styles.root}>
        {components.map((item, i) => {
          return <Component key={i} component={item} />;
        })}
      </div>
    );
  },
});

module.exports = ComponentList;
