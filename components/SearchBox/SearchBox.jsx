var React = require('react');

var Icon = require('../Icon');
var Input = require('../Input');

require('./SearchBox.less');
var cx = require('../cx')('RTSearchBox');

var SearchBox = React.createClass({
  render() {
    return (
      <label className={cx('')}>
        <div className={cx('icon')}><Icon name="magnifier" /></div>
        <Input {...this.props} hasIcon={true} />
      </label>
    );
  }
});

module.exports = SearchBox;
