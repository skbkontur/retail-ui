var React = require('react');

require('./Button.less');
require('./Button.css');
var cx = require('../cx')('RTButton');

var Button = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,

    use: React.PropTypes.oneOf([
      'default',
      'primary',
    ]),

    /**
     * Click handler.
     */
    onClick: React.PropTypes.func,
  },

  render() {
    var rootProps = {
      type: 'button', // On IE8 it's 'submit' by default.
      className: cx({
        '': true,
        ['use-' + this.props.use]: true,
        'disabled': this.props.disabled
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
