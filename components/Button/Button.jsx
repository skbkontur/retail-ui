var React = require('react');

require('./Button.less');
var cx = require('../cx')('RTButton');

var Button = React.createClass({
  render() {
    var rootProps = {
      className: cx({
        '': true,
        'disabled': this.props.disabled
      }),
      disabled: this.props.disabled,
      onClick: this.props.onClick
    };

    return (
      <button {...rootProps}>{this.props.children}</button>
    );
  },

  getDefaultProps() {
    return {};
  }
});

module.exports = Button;
