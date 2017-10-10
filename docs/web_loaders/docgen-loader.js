var doctrine = require('doctrine');
var marked = require('marked');
var reactDocs = require('react-docgen');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: true
});

module.exports = function(src) {
  this.cacheable();

  var info = reactDocs.parse(src);

  info.description = processDescription(info.description);
  for (var prop in info.props) {
    info.props[prop].description = processDescription(
      info.props[prop].description
    );
  }

  return 'module.exports = ' + JSON.stringify(info) + ';';
};

function processDescription(description) {
  const doctrineAST = doctrine.parse(description || '');
  doctrineAST.description = marked(doctrineAST.description);
  return doctrineAST;
}
