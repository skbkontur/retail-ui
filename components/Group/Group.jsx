var React = require('react');

var PropTypes = React.PropTypes;

require('./Group.less');
require('./Group-noflex.css');
var cx = require('../cx')('RTGroup');

/**
 * Главный *Input*, который должен занимать всю доступную ширину, должен быть
 * помечен свойством *mainInGroup*.
 */
var Group = React.createClass({
  propTypes: {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  },

  render() {
    var style = {};
    if (this.props.width) {
      style.width = this.props.width;
    }

    var first = null;
    var last = null;
    React.Children.forEach(this.props.children, child => {
      if (child) {
        first = first || child;
        last = child;
      }
    });

    return (
      <span className={cx('')} style={style}>
        {React.Children.map(this.props.children, child => {
          if (!child) {
            return null;
          }

          var wrapCss = cx({
            wrap: true,
            fixed: !child.props.mainInGroup,
            stretch: child.props.mainInGroup,
          });
          var itemCss = cx({
            item: true,
            'item-first': child === first,
          });
          if (child !== first) {
            itemCss += ' RTSpec-hNotFirst';
          }
          if (child !== last) {
            itemCss += ' RTSpec-hNotLast';
          }

          if (child.props.mainInGroup) {
            child = React.cloneElement(child, {width: '100%'});
          }

          return (
            <div className={wrapCss}>
              <div className={itemCss}>{child}</div>
            </div>
          );
        })}
      </span>
    );
  }
});

module.exports = Group;
