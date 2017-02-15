/* global gemini */
var pathTo = require('./utils').pathTo;

gemini.suite('Tooltip', (suite) => {
  suite
    .setUrl(pathTo('Tooltip', 'static tooltip'))
    .setCaptureElements(['[class^="Box-root"]'])
    .capture('simple');
});
