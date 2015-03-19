var React = require('react');

var ComponentList = require('./ComponentList');

require('./ShowcaseApp.less');
var cx = require('ui/cx')('rt-sc-ShowcaseApp');

var ShowcaseApp = React.createClass({
  render() {
    return (
      <div className={cx('')}>
        <div className={cx('head')}>UI LIB</div>
        <div className={cx('content')}>
          <ComponentList items={this.props.components} />
        </div>
      </div>
    );
  }
});

module.exports = ShowcaseApp;
