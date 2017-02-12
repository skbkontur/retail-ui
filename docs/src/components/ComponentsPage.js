import React from 'react';

import components from '../components';

import ComponentList from './ComponentList';

import styles from './ComponentsPage.less';

var Components = React.createClass({
  render() {
    const componentName = this.props.params.component;

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
  }
});

export default Components;
