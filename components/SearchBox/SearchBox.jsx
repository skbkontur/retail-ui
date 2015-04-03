var React = require('react');

var Icon = require('../Icon');
var Input = require('../Input');

require('./SearchBox.less');
var cx = require('../cx')('RTSearchBox');

var SearchBox = React.createClass({
  render() {
    return (
      <label className={cx('')}>
        <Input {...this.props} hasIcon={true} />
        <div className={cx('icon')}><Icon name="search" /></div>
      </label>
    );
  }
});

module.exports = SearchBox;
