var marked = require('marked');

module.exports = function(src) {
  var html = marked(src);

  return 'module.exports = ' + JSON.stringify(html) + ';';
};
