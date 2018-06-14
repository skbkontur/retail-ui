import classNames from 'classnames';
import React from 'react';

import PropTypes from 'prop-types';

import Corners from '../Button/Corners';

import '../ensureOldIEClassName';
import styles from './Group.less';

/**
 * Главный *Input*, который должен занимать всю доступную ширину, должен быть
 * помечен свойством *mainInGroup*.
 */
class Group extends React.Component {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  render() {
    var style = {};
    if (this.props.width) {
      style.width = this.props.width;
    }

    var first = null;
    var last = null;
    React.Children.forEach(this.props.children, child => {
      if (child) {
        first = first || child;
        last = child;
      }
    });

    return (
      <span className={styles.root} style={style}>
        {React.Children.map(this.props.children, child => {
          if (!child) {
            return null;
          }

          var wrapCss = classNames({
            [styles.wrap]: true,
            [styles.fixed]: !child.props.mainInGroup,
            [styles.stretch]: child.props.mainInGroup
          });
          var itemCss = classNames({
            [styles.item]: true,
            [styles.itemFirst]: child === first
          });

          let corners = 0;
          if (child !== first) {
            corners |= Corners.TOP_LEFT | Corners.BOTTOM_LEFT;
          }
          if (child !== last) {
            corners |= Corners.TOP_RIGHT | Corners.BOTTOM_RIGHT;
          }

          const childProps = { corners };
          if (child.props.mainInGroup) {
            childProps.width = '100%';
          }

          child = React.cloneElement(child, childProps);

          return (
            <div className={wrapCss}>
              <div className={itemCss}>{child}</div>
            </div>
          );
        })}
      </span>
    );
  }
}

export default Group;
