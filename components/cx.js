if (global.console && console.error) {
  console.error(
    'The cx function is deprecated. Use webpack css-loader local scope.'
  );
}

export default function(prefix) {
  return function(classNames) {
    if (typeof classNames === 'string' && arguments.length === 1) {
      return doPrefix(classNames);
    }

    if (typeof classNames === 'object') {
      return Object.keys(classNames)
        .filter(function(className) {
          return classNames[className];
        })
        .map(doPrefix)
        .join(' ');
    } else {
      return Array.prototype.map.call(classNames, doPrefix).join(' ');
    }
  };

  function doPrefix(className) {
    return className ? prefix + '-' + className : prefix;
  }
}
