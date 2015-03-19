var reactDocs = require('react-docgen');

module.exports = function(src) {
  var info = reactDocs.parse(src);
  return 'module.exports = ' + JSON.stringify(info) + ';';
};
