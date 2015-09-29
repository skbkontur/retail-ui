import classNames from 'classnames';
import React, {PropTypes} from 'react';

import '../ensureOldIEClassName';
import styles from './Group.less';

/**
 * Главный *Input*, который должен занимать всю доступную ширину, должен быть
 * помечен свойством *mainInGroup*.
 */
var Group = React.createClass({
  propTypes: {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  },

  render() {
    var style = {};
    if (this.props.width) {
      style.width = this.props.width;
    }

    var first = null;
    var last = null;
    React.Children.forEach(this.props.children, (child) => {
      if (child) {
        first = first || child;
        last = child;
      }
    });

    return (
      <span className={styles.root} style={style}>
        {React.Children.map(this.props.children, (child) => {
          if (!child) {
            return null;
          }

          var wrapCss = classNames({
            [styles.wrap]: true,
            [styles.fixed]: !child.props.mainInGroup,
            [styles.stretch]: child.props.mainInGroup,
          });
          var itemCss = classNames({
            [styles.item]: true,
            [styles.itemFirst]: child === first,
          });
          if (child !== first) {
            itemCss += ' RTSpec-hNotFirst';
          }
          if (child !== last) {
            itemCss += ' RTSpec-hNotLast';
          }

          if (child.props.mainInGroup) {
            child = React.cloneElement(child, {width: '100%'});
          }

          return (
            <div className={wrapCss}>
              <div className={itemCss}>{child}</div>
            </div>
          );
        })}
      </span>
    );
  },
});

module.exports = Group;
