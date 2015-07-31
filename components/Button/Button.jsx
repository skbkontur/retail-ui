var React = require('react');

var PropTypes = React.PropTypes;

require('./Button.less');
require('./Button.css');
var cx = require('../cx')('RTButton');

var Button = React.createClass({
  propTypes: {
    /**
     * Визуально нажатое состояние.
     */
    active: PropTypes.bool,

    disabled: PropTypes.bool,

    use: PropTypes.oneOf([
      'default',
      'primary',
    ]),

    narrow: PropTypes.bool,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Click handler.
     */
    onClick: PropTypes.func,
  },

  render() {
    var rootProps = {
      // Be default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: 'button',
      className: cx({
        '': true,
        ['use-' + this.props.use]: true,
        'active': this.props.active,
        'disabled': this.props.disabled,
        'narrow': this.props.narrow,
      }),
      style: {},
      disabled: this.props.disabled,
      onClick: this.props.onClick,
    };
    if (this.props.width) {
      rootProps.style.width = this.props.width;
    }

    return (
      <button {...rootProps}>{this.props.children}</button>
    );
  },

  getDefaultProps() {
    return {
      use: 'default',
    };
  }
});

module.exports = Button;
