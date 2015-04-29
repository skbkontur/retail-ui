var React = require('react/addons');

var components = require('../components');

var Component = require('./Component');

require('./ComponentList.less');
var cx = require('ui/cx')('rt-sc-ComponentList');

var ComponentList = React.createClass({
  render() {
    return (
      <div className={cx('')}>
        {components.map((item, i) => {
          return <Component key={i} component={item} />;
        })}
      </div>
    );
  }
});

module.exports = ComponentList;
