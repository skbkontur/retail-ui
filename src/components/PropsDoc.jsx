var React = require('react');

require('./PropsDoc.less');
var cx = require('ui/cx')('rt-sc-PropsDoc');

var PropsDoc = React.createClass({
  render() {
    var info = this.props.component.info;

    return (
      <div>
        <div className={cx('desc')}>{info.description}</div>
        <div className={cx('props')}>
          {Object.keys(info.props).map((name) => {
            var prop = info.props[name];
            var required = prop.required ?
                <span className={cx('prop-required')}>required</span> : null;
            var desc = prop.description ?
                <span className={cx('prop-desc')}>— {prop.description}</span> :
                null;
            return (
              <div key={name} className={cx('prop')}>
                <span className={cx('prop-name')}>{name}</span>
                <span className={cx('prop-typeColon')}>:</span>
                <span className={cx('prop-type')}>{prop.type.name}</span>
                {required}
                {desc}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});

module.exports = PropsDoc;
