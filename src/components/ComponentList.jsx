var React = require('react/addons');

var Component = require('./Component');

require('./ComponentList.less');
var cx = require('ui/cx')('rt-sc-ComponentList');

var ComponentList = React.createClass({
  render() {
    return (
      <div className={cx('')}>
        {this.props.items.map((item, i) => {
          return <Component key={i} component={item} />;
        })}
      </div>
    );
  }
});

module.exports = ComponentList;
