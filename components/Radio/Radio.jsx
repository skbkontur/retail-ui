var React = require('react');

var PropTypes = React.PropTypes;

require('./Radio.less');
var cx = require('../cx')('RTRadio');

/**
 * Индикатор для радио-кнопок. Используется в RadioGroup. Может быть
 * использована для кастомных радио-кнопок.
 */
var Radio = React.createClass({
  propTypes: {
    checked: PropTypes.bool,

    focused: PropTypes.bool,
  },

  render() {
    var rootClass = cx({
      '': true,
      'checked': this.props.checked,
      'focused': this.props.focused,
    });

    return (
      <span className={rootClass}><div className={cx('inbox')}/></span>
    );
  },

  getDefaultProps() {
    return {
      checked: false,
      focused: false,
    };
  },
});

module.exports = Radio;
