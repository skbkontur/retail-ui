var React = require('react');

require('./Icon.less');
var cx = require('../cx')('RTIcon');

var MAP = {
  error: '\ue004',
  warning: '\ue005',
  ok: '\ue006',
  star: '\ue007',
  fired: '\ue008',
  cert: '\ue00a',
  smile: '\ue00b',
  sad: '\ue00c',
  thumbUp: '\ue073',
  thumbDown: '\ue074',
  wait: '\ue021',
  opened: '\ue02d',
  closed: '\ue02e',
  bell: '\ue06c',

  magnifier: '\ue009'
};

var Icon = React.createClass({
  statics: {
    getAllNames() {
      return Object.keys(MAP);
    }
  },

  propTypes: {
    /**
     * Icon id.
     */
    name: React.PropTypes.string.isRequired,
  },

  render() {
    return (
      <span className={cx('')}>{MAP[this.props.name]}</span>
    );
  }
});

module.exports = Icon;
