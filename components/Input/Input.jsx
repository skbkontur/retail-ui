var React = require('react');

var PropTypes = React.PropTypes;

require('./Input.less');
var cx = require('../cx')('RTInput');

var Input = React.createClass({
  propTypes: {
    /**
     * Иконка слева инпута.
     */
    leftIcon: PropTypes.element,

    /**
     * Иконка справа инпута.
     */
    rightIcon: PropTypes.element,
  },

  render() {
    var labelProps = {
      className: cx({
        '': true,
        'padLeft': this.props.leftIcon,
        'padRight': this.props.rightIcon,
      }),
      style: {},
    };
    if (this.props.width) {
      labelProps.style.width = this.props.width;
    }

    var leftIcon = null;
    if (this.props.leftIcon) {
      leftIcon = <div className={cx('leftIcon')}>{this.props.leftIcon}</div>;
    }
    var rightIcon = null;
    if (this.props.rightIcon) {
      rightIcon = (
        <div className={cx('rightIcon')}>{this.props.rightIcon}</div>
      );
    }

    return (
      <label {...labelProps}>
        <input className={cx('input')} {...this.props} />
        {leftIcon}
        {rightIcon}
      </label>
    );
  },

  getDefaultProps() {
    return {};
  }
});

module.exports = Input;
