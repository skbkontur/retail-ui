var React = require('react');

require('./Input.less');
var cx = require('../cx')('RTInput');

var Input = React.createClass({
  render() {
    var props = {
      className: cx({
        '': true,
        'hasIcon': this.props.hasIcon
      }),
      style: {},
    };
    if (this.props.width) {
      props.style.width = this.props.width;
    }

    return (
      <input {...this.props} {...props} />
    );
  },

  getDefaultProps() {
    return {};
  }
});

module.exports = Input;
