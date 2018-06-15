import React from 'react';

import PropTypes from 'prop-types';

import styles from './Icon.less';

var MAP = {
  circle: '\ue001',
  baseline: '\ue003',
  warning: '\ue005',
  ok: '\ue006',
  gear: '\ue018',
  user: '\ue020',
  wait: '\ue021',
  clear: '\ue030',
  grid: '\ue03e',
  money: '\ue046',
  'help-circle': '\ue055',
  kebab: '\ue0c9'
};

class Icon extends React.Component {
  static propTypes = {
    color: PropTypes.string,

    /**
     * Icon id.
     */
    name: PropTypes.oneOf(Object.keys(MAP))
  };

  static getAllNames() {
    return Object.keys(MAP);
  }

  render() {
    var style = {
      color: this.props.color
    };
    return (
      <span className={styles.root} style={style}>
        {MAP[this.props.name]}
      </span>
    );
  }
}

export default Icon;
