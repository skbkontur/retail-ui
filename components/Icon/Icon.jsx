var React = require('react');

require('./Icon.less');
var cx = require('ui/cx')('RTIcon');

var MAP = {
  ok: '\ue006'
};

var Icon = React.createClass({
  render() {
    return (
      <span className={cx('')}>{MAP[this.props.name]}</span>
    );
  }
});

module.exports = Icon;
