import classNames from 'classnames';
import React from 'react';
import {Link} 'react-router';

import styles from './ComponentList.less';

var ComponentList = React.createClass({
  contextTypes: {
    history: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      searchString: '',
    };
  },

  render() {
    return (
      <div className={styles.root}>
        {this.props.components.map((component) => {
          const className = classNames({
            [styles.link]: true,
            [styles.linkActive]: component.name === this.props.current,
          });
          return (
            <Link key={component.name} to={`/components/${component.name}`}
              className={className}
            >
              {component.name}
            </Link>
          );
        })}
      </div>
    );
  },
});

module.exports = ComponentList;
