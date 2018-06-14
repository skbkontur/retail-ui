/* global gemini */

var pathTo = require('./utils').pathTo;

gemini.suite('Radio', suite => {
  suite
    .setUrl(pathTo('Radio', 'Radio with different states'))
    .setCaptureElements('#test-element')
    .capture('different states');
});
