/* global gemini */
var pathTo = require('./utils').pathTo;

gemini.suite('Hint', (suite) => {
  suite.setUrl(pathTo('Hint', 'default')) // eslint-disable-line max-len
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint left', (suite) => {
  suite.setUrl(pathTo('Hint', 'left')) // eslint-disable-line max-len
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint right', (suite) => {
  suite.setUrl(pathTo('Hint', 'right')) // eslint-disable-line max-len
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});

gemini.suite('Hint bottom', (suite) => {
  suite.setUrl(pathTo('Hint', 'bottom')) // eslint-disable-line max-len
    .setCaptureElements('#test-element')
    .capture('mouseOver');
});
