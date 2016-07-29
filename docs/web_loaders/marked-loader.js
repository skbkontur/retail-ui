var marked = require('marked');

module.exports = function(src) {
  this.cacheable();

  var html = marked(src);

  return 'module.exports = ' + JSON.stringify(html) + ';';
};
