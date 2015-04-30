var marked = require('marked');
var reactDocs = require('react-docgen');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: true,
});

module.exports = function(src) {
  var info = reactDocs.parse(src);

  info.description = marked(info.description || '');
  for (var prop in info.props) {
    info.props[prop].description = marked(info.props[prop].description || '');
  }

  return 'module.exports = ' + JSON.stringify(info) + ';';
};
