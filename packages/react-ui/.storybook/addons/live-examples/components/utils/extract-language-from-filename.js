export var extractLanguageFromFilename = function extractLanguageFromFilename() {
  var filename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return filename.split('.').slice(-1)[0];
};