var React = require('react');

require('./Input.less');
var cx = require('../cx')('RTInput');

var Input = React.createClass({
  render() {
    var inputClass = cx({
      '': true,
      'hasIcon': this.props.hasIcon
    });

    return (
      <input {...this.props} className={inputClass} />
    );
  },

  getDefaultProps() {
    return {};
  }
});

module.exports = Input;
