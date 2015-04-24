var React = require('react');

require('./PropsDoc.less');
var cx = require('ui/cx')('rt-sc-PropsDoc');

var PropsDoc = React.createClass({
  render() {
    var info = this.props.component.info;

    return (
      <div>
        <div className={cx({'desc': true, 'md': true})}
            dangerouslySetInnerHTML={{__html: info.description}} />
        <div className={cx('props')}>
          {Object.keys(info.props).map((name) => {
            var prop = info.props[name];
            var required = prop.required ?
                <span className={cx('prop-required')}>required</span> : null;
            return (
              <div key={name} className={cx('prop')}>
                <span className={cx('prop-name')}>{name}</span>
                <span className={cx('prop-typeColon')}>:</span>
                <span className={cx('prop-type')}>{formatType(prop.type)}</span>
                {required}
                <div className={cx({'prop-desc': true, 'md': true})}
                    dangerouslySetInnerHTML={{__html: prop.description}} />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});

function formatType(type) {
  if (type.name === 'union') {
    return type.value.map(formatType).join(' | ');
  }

  if (type.name === 'shape') {
    return '{' + Object.keys(type.value).map(key => {
      return `${key}: ${formatType(type.value[key])}`;
    }).join(', ') + '}';
  }

  var str = type.name;

  if (type.name === 'enum') {
    if (Array.isArray(type.value)) {
      let value = type.value.map(value => value.value).join(', ');
      str += ` (${value})`;
    }
  }

  if (type.name === 'instanceOf') {
    str += ` <${type.value}>`;
  }

  if (type.name === 'arrayOf') {
    str += `<${formatType(type.value)}>`;
  }

  return str;
}

module.exports = PropsDoc;
