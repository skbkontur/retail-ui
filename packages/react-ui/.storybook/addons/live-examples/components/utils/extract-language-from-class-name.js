export var extractLanguageFromClassName = function extractLanguageFromClassName() {
  var classNameString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return classNameString.split(/\s+/).reduce(function (acc, className) {
    if (className.startsWith('language-')) {
      acc = className.replace('language-', '');
    }
    return acc;
  }, 'tsx');
};