import classNames from 'classnames';
import React from 'react';

import styles from './PropsDoc.less';

var PropsDoc = React.createClass({
  render() {
    var info = this.props.component.info;

    var methods = info.methods.filter(
      method => method.docblock && method.docblock.includes('@api')
    );

    var descClassName = classNames({
      [styles.desc]: true,
      [styles.md]: true
    });
    var propDescClassName = classNames({
      [styles.propDesc]: true,
      [styles.md]: true
    });

    return (
      <div>
        {info.description.description &&
          <div
            className={descClassName}
            dangerouslySetInnerHTML={{ __html: info.description.description }}
          />}

        {info.props &&
          <div>
            <div className={styles.title}>Properties</div>
            <div>
              {Object.keys(info.props).map((name, i) => {
                var prop = info.props[name];
                var required = prop.required && !prop.defaultValue
                  ? <span className={styles.propRequired}>required</span>
                  : null;
                var defaultValue = prop.defaultValue
                  ? <span className={styles.propDefaultValue}>
                      = {prop.defaultValue.value}
                    </span>
                  : null;

                const className = classNames({
                  [styles.prop]: true,
                  [styles.propOdd]: i % 2
                });
                return (
                  <div key={name} className={className}>
                    <div className={styles.propTitle}>
                      <span className={styles.propName}>{name}</span>
                      <span className={styles.propTypeColon}>:</span>
                      <span className={styles.propType}>
                        {formatType(prop)}
                      </span>
                      {required}
                      {defaultValue}
                    </div>
                    {prop.description &&
                      prop.description.description &&
                      <div
                        className={propDescClassName}
                        dangerouslySetInnerHTML={{
                          __html: prop.description.description
                        }}
                      />}
                  </div>
                );
              })}
            </div>
          </div>}

        {methods.length > 0 &&
          <div>
            <div className={styles.title}>Methods</div>
            <div>
              {methods.map((method, i) => (
                <div
                  key={i}
                  className={classNames(styles.prop, i % 2 && styles.propOdd)}
                >
                  {this._renderMethod(method)}
                </div>
              ))}
            </div>
          </div>}

        {info.adapterProps &&
          <div>
            <div className={styles.title}>Adapter</div>
            <div>
              {info.adapterProps.map((prop, i) => (
                <div
                  key={i}
                  className={classNames(styles.prop, i % 2 && styles.propOdd)}
                >
                  <div className={styles.propTitle}>
                    <span className={styles.propName}>
                      {prop.name}
                    </span>
                    <span className={styles.propTypeColon}>:</span>
                    <span className={styles.propType}>
                      {prop.args.join(', ')}
                    </span>
                  </div>
                  {prop.desc &&
                    <div className={styles.propDesc}>{prop.desc}</div>}
                </div>
              ))}
            </div>
          </div>}
      </div>
    );
  },

  _renderMethod(method) {
    return (
      <div>
        <div className={styles.propTitle}>
          <div className={styles.propName}>
            {method.name}
            ({method.params.map(param => param.name).join(', ')})
          </div>
        </div>
        {method.description &&
          <div className={styles.propDesc}>{method.description}</div>}
      </div>
    );
  }
});

function formatType(prop) {
  if (prop.type) {
    return formatLegacyType(prop.type);
  } else if (prop.flowType) {
    return formatFlowType(prop.flowType);
  }
  return '?';
}

function formatLegacyType(type) {
  if (!type) {
    return '?';
  }

  if (type.name === 'union') {
    return type.value.map(formatLegacyType).join(' | ');
  }

  if (type.name === 'shape') {
    return '{' +
      Object.keys(type.value)
        .map(key => {
          return `${key}: ${formatLegacyType(type.value[key])}`;
        })
        .join(', ') +
      '}';
  }

  var str = type.name;

  if (type.name === 'enum') {
    if (Array.isArray(type.value)) {
      const value = type.value.map(value => value.value).join(', ');
      str += ` (${value})`;
    }
  }

  if (type.name === 'instanceOf') {
    str += ` <${type.value}>`;
  }

  if (type.name === 'arrayOf') {
    str += `<${formatLegacyType(type.value)}>`;
  }

  return str;
}

function formatFlowType(type) {
  switch (type.name) {
    case 'signature':
    case 'union':
      return type.raw;

    default:
      return type.name;
  }
}

export default PropsDoc;
