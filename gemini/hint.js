/* global gemini */
var pathTo = require('./utils').pathTo;

gemini.suite('Hint', suite => {
  suite
    .setUrl(pathTo('Hint', 'default'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint left', suite => {
  suite
    .setUrl(pathTo('Hint', 'left'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint right', suite => {
  suite
    .setUrl(pathTo('Hint', 'right'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint bottom', suite => {
  suite
    .setUrl(pathTo('Hint', 'bottom'))
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});
