var classNames = require('classnames');
var React = require('react');

import styles from './PropsDoc.less';

var PropsDoc = React.createClass({
  render() {
    var info = this.props.component.info;

    var descClassName = classNames({
      [styles.desc]: true,
      [styles.md]: true,
    });
    var propDescClassName = classNames({
      [styles.propDesc]: true,
      [styles.md]: true,
    });

    return (
      <div>
        <div className={descClassName}
          dangerouslySetInnerHTML={{__html: info.description}}
        />
        <div>
          {Object.keys(info.props).map((name) => {
            var prop = info.props[name];
            var required = prop.required ?
                <span className={styles.propRequired}>required</span> : null;
            return (
              <div key={name} className={styles.prop}>
                <span className={styles.propName}>{name}</span>
                <span className={styles.propTypeColon}>:</span>
                <span className={styles.propType}>{formatType(prop.type)}</span>
                {required}
                <div className={propDescClassName}
                  dangerouslySetInnerHTML={{__html: prop.description}}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});

function formatType(type) {
  if (!type) {
    return '?';
  }

  if (type.name === 'union') {
    return type.value.map(formatType).join(' | ');
  }

  if (type.name === 'shape') {
    return '{' + Object.keys(type.value).map((key) => {
      return `${key}: ${formatType(type.value[key])}`;
    }).join(', ') + '}';
  }

  var str = type.name;

  if (type.name === 'enum') {
    if (Array.isArray(type.value)) {
      const value = type.value.map((value) => value.value).join(', ');
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
