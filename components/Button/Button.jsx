var React = require('react');

require('./Button.less');
var cx = require('../cx')('RTButton');

var Button = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,

    /**
     * Click handler.
     */
    onClick: React.PropTypes.func,
  },

  render() {
    var rootProps = {
      className: cx({
        '': true,
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
    return {};
  }
});

module.exports = Button;
