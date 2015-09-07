import React, {PropTypes} from 'react';

import styles from './Center.less';

/**
 * Контейнер для вертикального центрирования. В компонент можно передавать
 * свойства как в любой div.
 */
var Center = React.createClass({
  propTypes: {
    /**
     * Горизонтальное выравнивание контента.
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),
  },

  getDefaultProps() {
    return {
      align: 'center',
    };
  },

  render() {
    var style = Object.assign({
      textAlign: this.props.align,
    }, this.props.style);

    return (
      <div className={styles.root} {...this.props} style={style}>
        <span className={styles.spring} />
        <span className={styles.container}>{this.props.children}</span>
      </div>
    );
  },
});

module.exports = Center;
