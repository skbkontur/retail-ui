var assign = require('object-assign');
var React = require('react');

require('./Input.less');
var cx = require('../cx')('RTInput');

var Input = React.createClass({
  render() {
    var props = assign({
      className: cx({
        '': true,
        'hasIcon': this.props.hasIcon
      })
    }, this.props);

    return (
      <input {...props} />
    );
  },

  getDefaultProps() {
    return {};
  }
});

module.exports = Input;
