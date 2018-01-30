/* global gemini */
var pathTo = require('./utils').pathTo;

gemini.suite('Small button Baseline', suite => {
  suite
    .setUrl(pathTo('Baseline', 'Button and text'))
    .setCaptureElements('#test-element')
    .capture('simple');
});

gemini.suite('Medium button Baseline', suite => {
  suite
    .setUrl(pathTo('Baseline', 'Medium Button and text'))
    .setCaptureElements('#test-element')
    .capture('simple');
});

gemini.suite('Large button Baseline', suite => {
  suite
    .setUrl(pathTo('Baseline', 'Large Button and text'))
    .setCaptureElements('#test-element')
    .capture('simple');
});

gemini.suite('Link and button Baseline', suite => {
  suite
    .setUrl(pathTo('Baseline', 'Button and link'))
    .setCaptureElements('#test-element')
    .capture('simple');
});

gemini.suite('Input and text Baseline', suite => {
  suite
    .setUrl(pathTo('Baseline', 'Input and text'))
    .setCaptureElements('#test-element')
    .capture('simple');
});
