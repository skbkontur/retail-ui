/* global gemini */
var pathTo = require('./utils').pathTo;

gemini.suite('Simple ToastView', suite => {
  suite
    .setUrl(pathTo('ToastView', 'simple toast'))
    .setCaptureElements(['[class^="Toast-root"]'])
    .capture('simple');
});

gemini.suite('ToastView With Action', suite => {
  suite
    .setUrl(pathTo('ToastView', 'with action'))
    .setCaptureElements(['[class^="Toast-root"]'])
    .capture('with action');
});
