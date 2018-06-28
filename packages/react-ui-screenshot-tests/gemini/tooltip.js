/* global gemini */
var pathTo = require('./utils').pathTo;

gemini.suite('Tooltip', suite => {
  suite
    .setUrl(pathTo('Tooltip', 'static tooltip'))
    .setCaptureElements('#test-element')
    .capture('simple');
});

gemini.suite('Tooltip left', suite => {
  suite
    .setUrl(pathTo('Tooltip', 'tooltip left'))
    .setCaptureElements('#test-element')
    .capture('plain');
});

gemini.suite('Tooltip right', suite => {
  suite
    .setUrl(pathTo('Tooltip', 'tooltip right'))
    .setCaptureElements('#test-element')
    .capture('plain');
});

gemini.suite('Tooltip bottom', suite => {
  suite
    .setUrl(pathTo('Tooltip', 'tooltip bottom'))
    .setCaptureElements('#test-element')
    .capture('plain');
});
