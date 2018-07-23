/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('TopBar Old', suite => {
  suite
    .setUrl(pathTo('TopBar', 'TopBar Old'))
    .setCaptureElements('#test-element')
    .capture('TopBar Old');
});

gemini.suite('TopBar New', suite => {
  suite
    .setUrl(pathTo('TopBar', 'TopBar New'))
    .setCaptureElements('#test-element')
    .capture('TopBar New');
});
